import {dbConnection} from "../core/database";
import request from "supertest";
import app from "../app";
import {CreateProductDto, UpdateProductDto} from "../products/web/products.dto";
import {ProductModel} from "../products/infra/product.model";
import {Product} from "../products/core/product";

describe('Products HTTP tests', () => {
  let conn: typeof import("mongoose");

  beforeAll(async () => {
    conn = await dbConnection();
  })

  afterEach(async () => {
    await ProductModel.deleteMany({})
  })

  afterAll(async () => {
    await conn.disconnect()
  })

  it('should create a new product', async () => {
    const dto = new CreateProductDto()
    dto.name = 'Clothes'
    dto.price = 10
    dto.quantity = 10
    dto.description = 'Test'
    dto.category = 'Test Category'

    await request(app).post('/products').send(dto).expect(201)
    await ProductModel.findOne({name: dto.name}).then(product => {
      expectProductToBe(product, dto);
    })
  })

  it('should not create a new product if it already exists', async () => {
    const product = await AddProductToDB({name: "Clothes"})

    const dto = new CreateProductDto()
    dto.name = product.name
    dto.price = 10
    dto.quantity = 10
    dto.description = 'Test'
    dto.category = 'Test Category'

    await request(app).post('/products').send(dto).expect(409)
  })

  it('should update a product', async () => {
    const product = await AddProductToDB({name: "Clothes"});

    const updateDto = new UpdateProductDto()
    updateDto.name = 'Clothes 2'
    updateDto.price = 20
    updateDto.quantity = 20
    updateDto.description = 'Test 2'
    updateDto.category = 'Test Category 2'

    await request(app).put(`/products/${product._id}`).send(updateDto).expect(200)
    await ProductModel.findOne({name: updateDto.name}).then(product => {
      expectProductToBe(product, updateDto);
    })
  })

  it('should delete a product', async () => {
    const product = await AddProductToDB({name: "Clothes"})

    await request(app).delete(`/products/${product._id}`).expect(200)
    await ProductModel.findOne({name: product.name}).then(product => {
      expect(product).toBeFalsy()
    })
  })

  it('should get all products', async () => {
    await AddProductToDB({name: "Clothes 1"})
    await AddProductToDB({name: "Clothes 2"})

    await request(app).get(`/products`).expect(200).then(res => {
      expect(res.body.data.length).toBe(2)
    })
  })

  it('should get a product by id', async () => {
    const product = await AddProductToDB({name: "Clothes"})

    await request(app).get(`/products/${product._id}`).expect(200).then(res => {
      expect(res.body.data.name).toBe(product.name)
    })
  })

  it('should get all products with pagination and filter', async () => {
    await AddProductToDB({name: "Clothes 1", category: "Test Category 1", price: 10})
    await AddProductToDB({name: "Clothes 2", category: "Test Category 2", price: 20})

    await request(app).get(`/products?name=Clothes 1&category=Test Category 1&price=10`).expect(200).then(res => {
      expect(res.body.data.length).toBe(1)
    })
  })
})

function expectProductToBe(product: Product, dto: CreateProductDto) {
  expect(product).toBeTruthy()
  expect(product.name).toBe(dto.name)
  expect(product.price).toBe(dto.price)
  expect(product.quantity).toBe(dto.quantity)
  expect(product.description).toBe(dto.description)
  expect(product.category).toBe(dto.category)
}

async function AddProductToDB(data: {
  name: string,
  price?: number,
  quantity?: number,
  description?: string,
  category?: string
}) {

  const dto = new CreateProductDto()
  dto.name = data.name
  dto.price = data.price || 10
  dto.quantity = data.quantity || 10
  dto.description = data.description || 'Test description'
  dto.category = data.category || 'Test category'

  return await ProductModel.create(dto);
}
