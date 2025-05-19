import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListsComponent } from './components/product-lists/product-lists.component';

const routes: Routes = [
  {
    path: 'category/:id', component: ProductListsComponent
  }, {
    path: 'category', component: ProductListsComponent
  },
  {
    path: 'products', component: ProductListsComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
