import { IApiService } from "../Model/ApiService";
import { ICartManager } from "../Model/CartManager";
import { IView } from "../View/abstracts/View";
import { CartModalView, ICartModalView } from "../View/CartModalView";

export interface ICartPresenter {
    parentView: IView;
	cartManager: ICartManager;
	apiService: IApiService;
	cartModalView: ICartModalView;
	handleChangeCart(): void;
	handleChangeForm(): void;
}

export class CartPresenter implements ICartPresenter {
	parentView: IView;
	cartManager: ICartManager;
	apiService: IApiService;
	cartModalView: ICartModalView;

	constructor(
		parentView: IView,
		cartManager: ICartManager,
		apiService: IApiService
	) {
		this.parentView = parentView;
		this.cartManager = cartManager;
		this.apiService = apiService;
		this.cartModalView = new CartModalView();
		this.cartModalView.init();

		this.cartModalView.element.addEventListener(
			'removeFromCart',
			(e: Event) => {
				const customEvent = e as CustomEvent<number>;
				this.cartManager.removeItem(String(customEvent.detail));
				this.handleChangeCart();
			}
		);
	}

	handleChangeCart(): void {
		const products = this.cartManager.getProducts();
		const total = this.cartManager.calculateTotalPrice();
		this.cartModalView.updateCart(products, total);
	}

	handleChangeForm(): void {
		// Здесь можно реализовать изменение состояния формы заказа
	}
}
