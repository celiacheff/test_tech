import {ProductsRepository} from "../core/products.repository";
import {Product} from "../core/product";
import {ProductModel} from "../product.model";

export class MongoProductsRepository implements ProductsRepository {
  public async findAll(): Promise<Product[]> {
    return ProductModel.find();
  }

  public async findById(id: string): Promise<Product | null> {
    return ProductModel.findOne({_id: id});
  }

  public async create(product: Product): Promise<Product> {
    return await ProductModel.create(product);
  }

  public async update(id: string, product: Product): Promise<Product | null> {
    const findProduct: Product = await ProductModel.findOne({
      _id: id,
    });
    if (!findProduct) return null

    return ProductModel.findByIdAndUpdate(id, product);
  }

  public async delete(id: string): Promise<boolean> {
    return ProductModel.findByIdAndDelete(
      id
    );
  }

  public findAllWithPaginationAndFilter(name: string, category: string, price: number, page: number, limit: number): Promise<Product[]> {
    let query = {}
    if (name) query = {...query, name}
    if (category) query = {...query, category}
    if (price) query = {...query, price}

    return ProductModel.find(query).sort(
      '-createdAt'
    ).skip(
      (page - 1) * limit
    ).limit(
      limit
    ).exec()
  }
}
