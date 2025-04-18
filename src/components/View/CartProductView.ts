import { IProduct } from '../../types/IProduct';
import { IView, View } from './abstracts/View';

export interface ICartProductView extends IView {
	product: IProduct;
	index: number;
	init(): void;
}

export class CartProductView extends View implements ICartProductView {
	product: IProduct;
	index: number;

	constructor(product: IProduct, index: number) {
		super('li', 'basket__item card card_compact');
		this.product = product;
		this.index = index;
	}

	init(): void {
		const template = document.getElementById(
			'card-basket'
		) as HTMLTemplateElement;
		const content = template.content.cloneNode(true) as DocumentFragment;
		this.element = content.firstElementChild as HTMLElement;

		const indexEl = this.element.querySelector(
			'.basket__item-index'
		) as HTMLElement;
		const titleEl = this.element.querySelector('.card__title') as HTMLElement;
		const priceEl = this.element.querySelector('.card__price') as HTMLElement;
		const deleteButton = this.element.querySelector(
			'.basket__item-delete'
		) as HTMLElement;

		indexEl.textContent = this.index.toString();
		titleEl.textContent = this.product.title;
		priceEl.textContent = `${this.product.price} синапсов`;

		deleteButton.addEventListener('click', () => {
			this.element.dispatchEvent(
				new CustomEvent('removeFromCart', {
					detail: this.product.id,
					bubbles: true,
				})
			);
		});
	}
}
