import { IProduct } from '../../types/IProduct';
import { IView, View } from './abstracts/View';

interface IProductCardView extends IView {
	product: IProduct;
	init(): void;
}

export class ProductCardView extends View implements IProductCardView {
	product: IProduct;
	constructor(product: IProduct) {
		super('div', 'product-card');
		this.product = product;
	}
	init(): void {
		const template = document.getElementById(
			'card-preview'
		) as HTMLTemplateElement;
		if (template) {
			const content = template.content.cloneNode(true) as DocumentFragment;
			const titleEl = content.querySelector('.card__title') as HTMLElement;
			const categoryEl = content.querySelector(
				'.card__category'
			) as HTMLElement;
			const priceEl = content.querySelector('.card__price') as HTMLElement;
			const imageEl = content.querySelector('.card__image') as HTMLImageElement;

			if (titleEl) titleEl.textContent = this.product.title;
			if (categoryEl) categoryEl.textContent = this.product.category;
			if (priceEl) priceEl.textContent = `${this.product.price} синапсов`;
			if (imageEl) imageEl.src = this.product.image;

			this.element = content.firstElementChild as HTMLElement;

			const button = this.element.querySelector('.card__button') as HTMLElement;
			if (button) {
				button.addEventListener('click', () => {
					this.element.dispatchEvent(
						new CustomEvent('addToCart', {
							detail: this.product,
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
