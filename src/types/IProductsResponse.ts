import { IProduct } from "./IProduct";

export interface IProductsResponse {
    total: number;
    items: IProduct[];
  }