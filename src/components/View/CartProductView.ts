import { IProduct } from "../../types/IProduct";
import { IView, View } from "./abstracts/View";

interface ICartProductView extends IView {
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
		if (template) {
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

			if (indexEl) indexEl.textContent = this.index.toString();
			if (titleEl) titleEl.textContent = this.product.title;
			if (priceEl) priceEl.textContent = `${this.product.price} синапсов`;

			if (deleteButton) {
				deleteButton.addEventListener('click', () => {
					this.element.dispatchEvent(
						new CustomEvent('removeFromCart', {
							detail: this.product.id,
							bubbles: true,
						})
					);
				});
			}
		} else {
			this.element.textContent = this.product.title;
		}
	}
}
