import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListsComponent } from './components/product-lists/product-lists.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  {
    path: 'category/:id/:name', component: ProductListsComponent
  }, {
    path: 'category', component: ProductListsComponent
  },
  {
    path: 'products', component: ProductListsComponent
  },
  {
    path: 'search/:keyword', component: ProductListsComponent
  }, {
    path: 'category', component: ProductListsComponent
  },
  {
    path: '', redirectTo: '/products', pathMatch: 'full'
  }, {
    path: '**', redirectTo: '/products', pathMatch: 'full'
  },{
    path:'products/:id',component:ProductDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
