import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ProductServiceService } from '../../services/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResponse } from '../../common/paginated-response';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-lists.component.css'
})
export class ProductListsComponent {
  currentCatgoryId: number = 1;
  products: Product[] = [];
  totalElements: number = 0;

  totalPages: number = 0;
  currentPage: number = 0;

  constructor(private productService: ProductServiceService,

    private route: ActivatedRoute
  ) {

  }
  ngOnInit() { // similar to @PostConstruct
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })

  }

  listProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    //check if "id" param is available


    if (hasCategoryId) {
      //get the id and make into number
      this.currentCatgoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // 
      this.currentCatgoryId = 1;
    }

    // now get the products by id

    //   this.productService.getProductListByCategoryId(this.currentCatgoryId).subscribe(
    //     data => {
    //       console.log(data);
    //       this.products = data;
    //     }
    //   )
    // }
    this.productService.getProductListByCategoryId(this.currentCatgoryId).subscribe({
      next: (data: PaginatedResponse<Product>) => {
        this.products = data.content; // Extract the content array
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.products = [];
        this.totalElements = 0;
        this.totalPages = 0;
      }
    });
  }

}
