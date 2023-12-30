import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { MatDialog } from "@angular/material/dialog";
import { ProductService } from 'src/app/services/product.service';
import { MatSelectChange } from '@angular/material/select';
import { Product } from 'src/app/models/products';
import { Subscription, catchError, of, take, tap } from 'rxjs';
@Component({
  selector: 'app-categories',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy, OnChanges {
  private _subscriptions: Subscription[] = [];
  filters = ['asc', 'desc'];
  inputValue: string = '';
  next: Boolean;
  before: Boolean;
  all = 0;
  init = 0;
  end = 10;
  page = 10;
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category'];
  dataSource!: MatTableDataSource<any>;
  dataAll!: MatTableDataSource<any>;
  // Private
  /**
    * Constructor
    */
  constructor(private _productService: ProductService,
    private _snackBar: MatSnackBar,

    public Dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Product>();
    this.dataAll = new MatTableDataSource<Product>();
    this.next = false;
    this.before = false;
  }

  ngOnInit(): void {
    this.chargeProducts();
  }

  ngOnChanges() {
    this.listProduct();
  }

  chargeProducts() {

    const subAll: Subscription = this._productService.getAll().pipe(
      take(1),
      tap((res) => {
        const { length } = res;
        this.all = length;
        this.dataAll.data = res;
        this.listProduct();
      }),
      catchError((err) => {
        console.error(err);
        return of(null);
      })
    ).subscribe();
    this._subscriptions.push(subAll);

  }

  listProduct() {
    const { dataAll, init, end } = this;
    this.dataSource.data = dataAll.data.slice(init, end);
    const remainingItems = this.all - end;
    this.next = this.all > end;
    this.before = remainingItems <= init;
  }

  Next() {
    const { page } = this;
    this.init += page;
    this.end += page;
    this.listProduct();
  }

  Before() {
    const { page } = this;
    this.init -= page;
    this.end -= page;
    this.listProduct();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const filteredData = this.dataAll.data.filter(item => item.title.toLowerCase().includes(filterValue));
    this.dataSource.data = [...filteredData];
  }

  isInvalid(filter: string): boolean {
    return /[^0-9]/.test(filter) || filter.includes('.');
  }

  limit(event: Event) {
    const filterValue = (event.target as HTMLInputElement);
    this.inputValue = filterValue.value.trim().toLowerCase();
    if (this.inputValue === '') {
      this.chargeProducts();
    } else {
      if (this.isInvalid(this.inputValue)) {
        filterValue.classList.add('error');
      } else {
        filterValue.classList.remove('error');
        const value = parseInt(this.inputValue, 10);
        const subLimit = this._productService.getProducts(value)
          .subscribe({
            next: res => {
              this.dataSource.data = res;
              this.next = false;
              this.before = false;
            },
            error: err => console.error(err)
          });
        this._subscriptions.push(subLimit);
      }
    }
  }

  onSelectionChange(event: MatSelectChange): void {
    const selectedValue = event.value;
    const subOrder = this._productService.getOrder(selectedValue)
      .subscribe({
        next: res => {
          this.dataAll.data = res;
          this.listProduct();
        },
        error: err => console.error(err)
      });
    this._subscriptions.push(subOrder);
  }
  ngOnDestroy() {
    this._subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
