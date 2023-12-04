import { Router } from 'express';
import {ValidationMiddleware} from "../../core/middlewares/validation.middleware";
import {CreateProductDto, UpdateProductDto} from "./products.dto";
import {productController} from "../../config/dependencies";

export const productRoute = Router()
  .get(`/`, productController.getProductsWithPaginationAndFilter)
  .get(`/:id`, productController.getProductById)
  .post(`/`, ValidationMiddleware(CreateProductDto), productController.createProduct)
  .put(`/:id`, ValidationMiddleware(UpdateProductDto, true), productController.updateProduct)
  .delete(`/:id`, productController.deleteProduct);
