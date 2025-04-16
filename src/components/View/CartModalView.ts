import { IProduct } from '../../types/IProduct';
import { ICartManager } from '../Model/CartManager';
import { IFormPresenter } from '../Presenter/FormPresenter';
import { IModal, Modal } from './abstracts/Modal';
import { IView } from './abstracts/View';
import { CartProductView } from './CartProductView';

export interface ICartModalView extends IModal {
	listElement: HTMLElement;
	totalElement: HTMLElement;
	init(): void;
	updateCart(items: IProduct[], total: number): void;
}

export class CartModalView extends Modal implements ICartModalView {
	listElement: HTMLElement;
	totalElement: HTMLElement;
	cartManager: ICartManager;
	formPrecenterOpen: () => void

	constructor(cartManager: ICartManager, formPrecenter: IFormPresenter) {
		// Вызов базового конструктора – внутри него клонируется шаблон модального окна (modal-container)
		super();
		this.cartManager = cartManager;
		this.formPrecenterOpen = () => formPrecenter.open()
	}

	init(): void {
		const template = document.getElementById('basket') as HTMLTemplateElement;
		const content = template.content.cloneNode(true) as HTMLElement & IView;
		this.setContent(content as HTMLElement & IView);
		this.listElement = this.element.querySelector(
			'.basket__list'
		) as HTMLElement;
		this.totalElement = this.element.querySelector(
			'.basket__price'
		) as HTMLElement;
		const orderButton = this.element.querySelector(
			'.basket__button'
		) as HTMLElement;
		const closeBtn = this.element.querySelector('.modal__close') as HTMLElement;
		console.log(template)
		closeBtn.addEventListener('click', () => this.close());
		orderButton.addEventListener('click', () => {
			this.formPrecenterOpen()
		});
	}

	updateCart(items: IProduct[], total: number): void {
		if (this.listElement) {
			// Очищаем список товаров
			console.log(items);
			this.listElement.innerHTML = '';
			items.forEach((item, index) => {
				const cartProduct = new CartProductView(item, index + 1);
				cartProduct.init();
				console.log(cartProduct.render(), this.listElement);
				this.listElement.appendChild(cartProduct.render());
				console.log(this.listElement);
			});
		}
		if (this.totalElement) {
			this.totalElement.textContent = `${total} синапсов`;
		}
	}

	initProducts() {
		console.log();
		// this.listElement
	}
}
