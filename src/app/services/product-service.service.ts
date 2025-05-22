import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { PaginatedResponse } from '../common/paginated-response';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }
  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${id}`)
  }
  getProductList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl);
  }
  getProductListByCategoryId(id: number): Observable<PaginatedResponse<Product>> {

    return this.httpClient.get<PaginatedResponse<Product>>(`${this.baseUrl}/category/${id}`);
  }
  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/category/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
  searchProducts(name: string): Observable<PaginatedResponse<Product>> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    return this.httpClient.get<PaginatedResponse<Product>>(`${this.baseUrl}/search`, { params });
  }
  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<PaginatedResponse<Product>> {
    const url = `${this.baseUrl}?page=${thePage}&size=${thePageSize}&categoryId=${theCategoryId}`;
    return this.httpClient.get<PaginatedResponse<Product>>(url);
  }
  searchProductsPaginate(thePage: number, thePageSize: number, theKeyword: string): Observable<PaginatedResponse<Product>> {
    const searchUrl = `{this.baseUrl}/search?name=${theKeyword}` + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<PaginatedResponse<Product>>(searchUrl);
  }

}

