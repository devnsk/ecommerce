import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ProductServiceService } from '../../services/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product!: Product;
  //product:Product = new Product();
  constructor(private productService: ProductServiceService, private route: ActivatedRoute,private cartService:CartService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });

  }
  handleProductDetails() {
    //g et id and convert it to number
    const theProductId: number = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.productService.getProduct(theProductId).subscribe(
      data => {
        console.log(data);
        this.product = data;
      }
    )
  }
   addToCart(theProduct:Product){
      console.log(`Adding to cart: ${theProduct.name},${theProduct.unitPrice}`);
      const theCartItem = new CartItem(theProduct);
      this.cartService.addToCart(theCartItem);
      
    }
 
}
