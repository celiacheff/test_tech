import {Product} from "./product";

export interface ProductsRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  update(id: string, product: Product): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
  findAllWithPaginationAndFilter(name: string, category: string, price: number, page: number, limit: number): Promise<Product[]>;
}
