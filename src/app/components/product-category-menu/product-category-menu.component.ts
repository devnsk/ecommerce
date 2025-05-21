import { Component } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductServiceService } from '../../services/product-service.service';
import { ProductCategoryService } from '../../services/product-category.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent {
productCategories:ProductCategory[] = [];
constructor(private productCategoryService:ProductCategoryService){

}
ngOnInit(){
  this.listProductCategories();
}
listProductCategories(){
  this.productCategoryService.getProductCategoryList().subscribe(
    data => {
      console.log('Product categories= '+ JSON.stringify(data));
      this.productCategories = data;
    }
  )
}

}
