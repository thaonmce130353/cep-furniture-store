import { Category } from "./Category";

export interface Product {
  id: number;
  name: string;
  price: number;
  material: string;
  color: string;
  dimention: string;
  description: string;
  status: number;
  quantity: number;
  categoryId: number;
  Category: Category;
}
