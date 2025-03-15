import { ProductCategory } from './ProductCategory';

export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	category: ProductCategory;
	price: number | null;
}
