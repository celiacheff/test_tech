import {Product} from "../core/product";
import {ProductsRepository} from "../core/products.repository";

export class FakeProductsRepository implements ProductsRepository {
  products: Product[] = [];

  public async findAll(): Promise<Product[]> {
    return this.products;
  }

  public async findById(id: string): Promise<Product | null> {
    return this.products.find(product => product._id === id);
  }

  public async create(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }

  public async update(id: string, product: Product): Promise<Product | null> {
    this.products = this.products.map(product => {
      if (product._id === id) {
        return product;
      }
      return product;
    })
    return product;
  }

  public async delete(id: string): Promise<boolean> {
    this.products = this.products.filter(product => product._id !== id);
    return true;
  }
}
