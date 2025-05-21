import { Product } from './product';

export interface ProductCategory {
  id: number;
  categoryName: string;
  products: Product[];
}
export class ProductCategory {
  constructor(public id: number, public categoryName: string) {

  }
}