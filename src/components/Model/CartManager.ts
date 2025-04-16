import { IProduct } from '../../types/IProduct';

export interface ICartManager {
  products: IProduct[];
	clear(): void
  addItem(product: IProduct): void;
  removeItem(productId: string): void;
  calculateTotalPrice(): number;
  getProducts(): IProduct[];
}

export class CartManager implements ICartManager {
  products: IProduct[];

  constructor() {
    this.products = [];
  }

  addItem(product: IProduct): void {
    this.products.push(product);
    console.log(this.products)
  }

  removeItem(productId: string): void {
    this.products = this.products.filter(item => item.id !== productId);
  }

  calculateTotalPrice(): number {
    return this.products.reduce((sum, item) => sum + item.price, 0);
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  clear(): void {
    this.products = [];
  }
}
