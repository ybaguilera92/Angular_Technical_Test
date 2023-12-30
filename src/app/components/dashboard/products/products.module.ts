import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProductsComponent } from './products.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'products', component: ProductsComponent },
    ]
  },

];
@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductsModule { }
