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
  previousCategoryId: number = 1;
  currentCategoryName: string = "";
  products: Product[] = [];
  totalElements: number = 0;
  searchMode: boolean = false;
  totalPages: number = 0;
  currentPage: number = 0;
  //properties for pagination
  pageSize: number = 10;
  thePageNumber: number = 1;
  previousKeyword: string = "";




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
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;
    console.log(`${theKeyword} + ${this.thePageNumber}`);
    this.productService.searchProducts(theKeyword).subscribe(
      {
        next: (data: PaginatedResponse<Product>) => {
          this.products = data.content;
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
      }
    )
  }
  //
  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    //check if "id" param is available


    if (hasCategoryId) {
      //get the id and make into number
      this.currentCatgoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    } else {
      // 
      this.currentCatgoryId = 1;
      this.currentCategoryName = 'Books';
    }

    if (this.previousCategoryId != this.currentCatgoryId) {
      this.thePageNumber = 1;

    }
    this.previousCategoryId = this.currentCatgoryId;
    console.log(`current cat id=${this.currentCatgoryId},pageNumber=${this.thePageNumber}`);
    this.productService.getProductListPaginate(this.thePageNumber - 1, this.pageSize, this.currentCatgoryId).subscribe(this.processResult());
    // this.productService.getProductListPaginate(this.thePageNumber - 1, this.pageSize, this.currentCatgoryId).subscribe({
    //   next: (data: PaginatedResponse<Product>) => {
    //     this.products = data.content; // Extract the content array
    //     this.thePageNumber = data.number + 1;
    //     this.pageSize = data.size;
    //     this.totalElements = data.totalElements;
    //     // this.totalPages = data.totalPages;
    //     // this.currentPage = data.number;
    //   }, error: (err) => {
    //     console.error('Error fetching products:', err);
    //     this.products = [];
    //     this.totalElements = 0;
    //     this.totalPages = 0;
    //   }
    // })

    // now get the products by id

    // this.productService.getProductListByCategoryId(this.currentCatgoryId).subscribe({
    //   next: (data: PaginatedResponse<Product>) => {
    //     this.products = data.content; // Extract the content array
    //     this.totalElements = data.totalElements;
    //     this.totalPages = data.totalPages;
    //     this.currentPage = data.number;
    //   },
    //   error: (err) => {
    //     console.error('Error fetching products:', err);
    //     this.products = [];
    //     this.totalElements = 0;
    //     this.totalPages = 0;
    //   }
    // });
  }
  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }
  processResult() {
    return (data: any) => {
      this.products = data.content;
      this.thePageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
    };
  }
}
