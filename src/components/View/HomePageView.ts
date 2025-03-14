import { IProduct } from "../../types/IProduct";
import { IView, View } from "./abstracts/View";
import { ProductCardView } from "./ProductCardView";

export interface IHomePageView extends IView {
	productsContainer: HTMLElement;
	renderProducts(products: IProduct[]): void;
    init: () => void
}

export class HomePageView extends View implements IHomePageView {
	productsContainer: HTMLElement;
	constructor() {
		super('div', 'home-page');
		this.productsContainer = this.createElement('div', 'products-container');
	}
	init(): void {
		this.addChild(this.productsContainer);
	}
	renderProducts(products: IProduct[]): void {
		this.productsContainer.innerHTML = '';
		products.forEach((product) => {
			const productCard = new ProductCardView(product);
			productCard.init();
			this.productsContainer.appendChild(productCard.render());
		});
	}
}
