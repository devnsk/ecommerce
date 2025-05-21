import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ProductServiceService } from '../../services/product-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product!: Product;
  constructor(private productService: ProductServiceService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
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
}
