import { IProduct } from "../../types/IProduct";
import { ICartManager } from "../Model/CartManager";
import { IView, View } from "./abstracts/View";
import { ProductCardView } from "./ProductCardView";

export interface IHomePageView extends IView {
	productsContainer: HTMLElement;
	renderProducts(products: IProduct[]): void;
    init: () => void
}

export class HomePageView extends View implements IHomePageView {
	productsContainer: HTMLElement;
	cartManager: ICartManager

	constructor(cartManager: ICartManager) {
		super('div', 'page__wrapper');
		this.productsContainer = this.createElement('main', 'gallery');
		this.cartManager = cartManager
	}
	init(): void {
		this.addChild(this.productsContainer as HTMLElement & IView);
	}
	renderProducts(products: IProduct[]): void {
		this.productsContainer.innerHTML = '';
		products.forEach((product) => {
			const productCard = new ProductCardView(product, this.cartManager);
			productCard.init();
			this.productsContainer.appendChild(productCard.render());
		});
	}
	
}
