import { IProduct } from '../../types/IProduct';
import { CDN_URL } from '../../utils/constants';
import { ICartManager } from '../Model/CartManager';
import { Modal } from './abstracts/Modal';

export class ProductDetailModal extends Modal {
	private product: IProduct;
	private cartManager: ICartManager

	constructor(product: IProduct, cartManager: ICartManager) {
		super();
		this.product = product;
		this.cartManager = cartManager
	}

	init(): void {
		const template = document.getElementById(
			'card-preview'
		) as HTMLTemplateElement;
		const content = template.content.cloneNode(true) as DocumentFragment;
		const imageEl = content.querySelector('.card__image') as HTMLImageElement;
		const categoryEl = content.querySelector('.card__category') as HTMLElement;
		const titleEl = content.querySelector('.card__title') as HTMLElement;
		const descriptionEl = content.querySelector('.card__text') as HTMLElement;
		const priceEl = content.querySelector('.card__price') as HTMLElement;
		const addToCartBtn = content.querySelector('.card__button') as HTMLElement;
		const closeBtn = content.querySelector('.modal__close') as HTMLElement;

		imageEl.src = `${CDN_URL}${this.product.image}`;
		imageEl.alt = this.product.title;

		categoryEl.textContent = this.product.category;
		titleEl.textContent = this.product.title;
		descriptionEl.textContent = this.product.description;
		priceEl.textContent = `${this.product.price} синапсов`;


		addToCartBtn.addEventListener('click', () => {
			const productsInCart = this.cartManager.getProducts()
			if(productsInCart.find(pr => this.product.id === pr.id)){
				return
			}
			this.element.dispatchEvent(
				new CustomEvent('addToCart', {
					detail: this.product,
					bubbles: true,
				})
			);
			this.close();
		});
		closeBtn.addEventListener('click', () => this.close());
		this.setContent(content as any);
	}
}
