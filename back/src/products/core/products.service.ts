import {Product} from "./product";
import {ProductsRepository} from "./products.repository";
import {ItemAlreadyExistError, ItemDoesNotExistError} from "./errors";
import {DateGenerator} from "../../core/dateGenerator";

export class ProductService {
  constructor(private readonly productsRepository: ProductsRepository, private readonly date: DateGenerator) {
  }

  public async findAllProducts(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  public async findProductById(productId: string): Promise<Product | Error> {
    const findProduct: Product = await this.productsRepository.findById(productId)
    if (!findProduct) return new ItemDoesNotExistError();

    return findProduct;
  }

  public async createProduct(productData: Product): Promise<void | Error> {
    const findProduct: Product = await this.productsRepository.findById(productData._id);
    if (findProduct) return new ItemAlreadyExistError();
    await this.productsRepository.create({
      ...productData,
      createdAt: this.date.now(),
    });
  }

  public async updateProduct(id: string, productData: Product): Promise<void | Error> {
    const findProduct: Product = await this.productsRepository.findById(id);
    if (!findProduct) return new ItemDoesNotExistError();
    await this.productsRepository.update(id, {
      ...productData,
      updatedAt: this.date.now(),
    });
  }

  public async deleteProduct(productId: string): Promise<void | Error> {
    const findProduct: Product = await this.productsRepository.findById(productId);
    if (!findProduct) return new ItemDoesNotExistError();
    await this.productsRepository.delete(productId);
  }

  async findProductsWithPaginationAndFilter(page: number, limit: number, name: string, category: string, price: number) {
    page = page || 1;
    limit = limit || 10;
    return await this.productsRepository.findAllWithPaginationAndFilter(name, category, price, page, limit);
  }
}
