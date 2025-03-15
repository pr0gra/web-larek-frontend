import { IProduct } from '../../types/IProduct';
import { IModal, Modal } from './abstracts/Modal';
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
	constructor() {
		super('div', 'cart-modal');
		// Запасные элементы на случай, если шаблон не загрузится
		this.listElement = this.createElement('ul', 'basket__list');
		this.totalElement = this.createElement('span', 'basket__price');
	}
	init(): void {
		const template = document.getElementById('basket') as HTMLTemplateElement;
		if (template) {
			const content = template.content.cloneNode(true) as DocumentFragment;
			this.element = content.firstElementChild as HTMLElement;
			this.listElement = this.element.querySelector(
				'.basket__list'
			) as HTMLElement;
			this.totalElement = this.element.querySelector(
				'.basket__price'
			) as HTMLElement;

			const checkoutButton = this.element.querySelector(
				'.basket__button'
			) as HTMLElement;
			if (checkoutButton) {
				checkoutButton.addEventListener('click', () => {
					this.element.dispatchEvent(new Event('checkout'));
				});
			}
		}
	}
	updateCart(items: IProduct[], total: number): void {
		if (this.listElement) {
			this.listElement.innerHTML = '';
			items.forEach((item, index) => {
				const cartProduct = new CartProductView(item, index + 1);
				cartProduct.init();
				this.listElement.appendChild(cartProduct.render());
			});
		}
		if (this.totalElement) {
			this.totalElement.textContent = `${total} синапсов`;
		}
	}
}
