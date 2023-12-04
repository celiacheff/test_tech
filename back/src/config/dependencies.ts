import {ProductService} from "../products/core/products.service";
import {ProductController} from "../products/web/products.controller";
import {MongoProductsRepository} from "../products/infra/mongo-products.repository";
import {DateGenerator} from "../core/dateGenerator";
import {NODE_ENV} from "./index";
import {FakeProductsRepository} from "../products/infra/fake-products.repository";

// const productRepository = NODE_ENV === 'test' ? new FakeProductsRepository() : new MongoProductsRepository()
const productRepository = new MongoProductsRepository()
const productService = new ProductService(productRepository, DateGenerator())
const productController = new ProductController(productService)


export {productService, productController}
