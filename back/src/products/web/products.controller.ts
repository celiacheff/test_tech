import {NextFunction, Request, Response} from 'express';
import {Product} from "../core/product";
import {ProductService} from "../core/products.service";
import {HttpException} from "../../core/exceptions/HttpException";
import {ItemAlreadyExistError, ItemDoesNotExistError} from "../core/errors";

export class ProductController {
  constructor(private productService: ProductService) {
  }

  // public getProducts = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const findAllProductsData: Product[] = await this.productService.findAllProducts();
  //
  //     res.status(200).json({data: findAllProductsData, message: 'findAll'});
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  public getProductsWithPaginationAndFilter = async (req: Request, res: Response, next: NextFunction) => {
    const {page, limit, name, category, price} = req.query;
    const findAllProductsData: Product[] = await this.productService.findProductsWithPaginationAndFilter(
      parseInt(page as string),
      parseInt(limit as string),
      name as string,
      category as string,
      parseInt(price as string)
    );

    res.status(200).json({data: findAllProductsData, message: 'findAll'});
  }

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const productId: string = req.params.id;
    const productsOrError = await this.productService.findProductById(productId);
    if (productsOrError instanceof ItemDoesNotExistError) {
      next(new HttpException(
        409,
        `The product does not exists`
      ));
      return
    }

    res.status(200).json({data: productsOrError, message: 'findOne'});
  }

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productData: Product = req.body;
    const successOrError = await this.productService.createProduct(productData);
    if (successOrError instanceof ItemAlreadyExistError) {
      next(new HttpException(
        409,
        `The product already exists`
      ));
      return
    }

    res.status(201).json({data: {}, message: 'created'});
  }

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId: string = req.params.id;
    const productData: Product = req.body;
    const successOrError = await this.productService.updateProduct(productId, productData);
    if (successOrError instanceof ItemAlreadyExistError) {
      next(new HttpException(
        409,
        `The product already exists`
      ))
      return
    }

    res.status(200).json({data: {}, message: 'updated'});
  }

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId: string = req.params.id;
    const successOrError = await this.productService.deleteProduct(productId);
    if (successOrError instanceof ItemDoesNotExistError) {
      next(new HttpException(
        409,
        `The product does not exists`
      ))
      return
    }

    res.status(200).json({data: {}, message: 'deleted'});
  }
}
