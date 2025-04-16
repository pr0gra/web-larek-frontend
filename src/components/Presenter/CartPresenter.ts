import { IApiService } from '../Model/ApiService';
import { ICartManager } from '../Model/CartManager';
import { CartModalView, ICartModalView } from '../View/CartModalView';
import {  FormPresenter, IFormPresenter } from './FormPresenter';

export interface ICartPresenter {
	cartManager: ICartManager;
	apiService: IApiService;
	cartModalView: ICartModalView;
	handleUpdateCart(): void;
}

export class CartPresenter implements ICartPresenter {
	cartManager: ICartManager;
	apiService: IApiService;
	cartModalView: ICartModalView;
	formPrecenter: IFormPresenter;

	constructor(cartManager: ICartManager, apiService: IApiService) {
		this.cartManager = cartManager;
		this.apiService = apiService;
		this.formPrecenter = new FormPresenter(cartManager, apiService);
		this.cartModalView = new CartModalView(cartManager, this.formPrecenter);
		this.cartModalView.init();
		this.initBasketButton();
		this.cartModalView.element.addEventListener(
			'removeFromCart',
			(e: Event) => {
				const customEvent = e as CustomEvent<number>;
				this.cartManager.removeItem(String(customEvent.detail));
				this.handleUpdateCart();
			}
		);
	}

	initBasketButton(): void {
		const basketButton = document.querySelector('.header__basket');
		console.log(basketButton);
		basketButton.addEventListener('click', () => {
			this.handleUpdateCart();
			this.cartModalView.open(); 
		});
	}

	handleUpdateCart(): void {
		const products = this.cartManager.getProducts();
		const total = this.cartManager.calculateTotalPrice();
		console.log(products);
		this.cartModalView.updateCart(products, total);
	}
}
