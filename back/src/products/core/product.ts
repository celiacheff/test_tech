export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  quantity?: number;
}
