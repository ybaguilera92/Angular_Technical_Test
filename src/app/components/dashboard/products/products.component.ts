import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";
import { Category } from 'src/app/models/category';
import { ProductService } from 'src/app/services/product.service';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-categories',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  listCategory: any = [];
  filters = ['asc', 'desc'];
  inputValue: string = '';
  next: Boolean;
  before: Boolean;
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  // Private
  /**
    * Constructor
    */
  constructor(private _productService: ProductService,
    private _snackBar: MatSnackBar,

    public Dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Category>();
    this.next = false;
    this.before = false;
  }

  ngOnInit(): void {
    this.chargeproducts();
  }
  ngOnDestroy(): void {

  }
  async chargeproducts() {
    try {
      const res = await firstValueFrom(this._productService.getProducts(10))
      this.dataSource.data = res;
    } catch (err) {
      console.log(err);
    }
  }
  async Next() {
  }
  async Before() {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filter = filterValue.trim().toLowerCase();
    this._productService.getAll()
      .subscribe({
        next: res => {
          this.dataSource.data = res;
          const filteredData = this.dataSource.data.filter(item => {
            return item.title.toLowerCase().includes(filter);
          });
          this.dataSource.data = filteredData;
        },
        error: err => console.error(err)
      });
  }
  isInvalid(filter: string): boolean {
    return /[^0-9]/.test(filter) || filter.includes('.');
  }

  limit(event: Event) {
    const filterValue = (event.target as HTMLInputElement);
    this.inputValue = filterValue.value.trim().toLowerCase();
    if (this.isInvalid(this.inputValue)) {
      filterValue.classList.add('error');
    } else {
      filterValue.classList.remove('error');
      this._productService.getProducts(parseInt(this.inputValue, 10))
        .subscribe({
          next: res => {
            this.dataSource.data = res;
          },
          error: err => console.error(err)
        });
    }

  }
  onSelectionChange(event: MatSelectChange): void {
    const selectedValue = event.value;
    this._productService.getOrder(selectedValue)
      .subscribe({
        next: res => {
          this.dataSource.data = res;
        },
        error: err => console.error(err)
      });
  }
}
