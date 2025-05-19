import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private httpClient:HttpClient) { }
  private baseUrl=`${environment.apiUrl}/product-categories`;

  getProductCategoryList():Observable<ProductCategory[]>{
    return this.httpClient.get<ProductCategory[]>(this.baseUrl);
  }
  getProductCategoryById(id: number): Observable<ProductCategory> {
    return this.httpClient.get<ProductCategory>(`${this.baseUrl}/${id}`);
  }

  createProductCategory(category: ProductCategory): Observable<ProductCategory> {
    return this.httpClient.post<ProductCategory>(this.baseUrl, category);
  }

  updateProductCategory(id: number, category: ProductCategory): Observable<ProductCategory> {
    return this.httpClient.put<ProductCategory>(`${this.baseUrl}/${id}`, category);
  }

  deleteProductCategory(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
