import { IProduct } from '../../types/IProduct';
import { CDN_URL } from '../../utils/constants';
import { IView, View } from './abstracts/View';
import { ProductDetailModal } from './ProductDetailModal';

export interface IProductCardView extends IView {
	product: IProduct;
	init(): void;
}

export class ProductCardView extends View implements IProductCardView {
	product: IProduct;
	private cardTitle: HTMLElement;
	private cardPrice: HTMLElement;
	private cardCategory: HTMLElement;
	private cardImage: HTMLImageElement;

	constructor(product: IProduct) {
		super('div', 'product-card');
		this.product = product;
	}

	init(): void {
		const template = document.getElementById('card-catalog') as HTMLTemplateElement;
			const content = template.content.cloneNode(true) as DocumentFragment;

			this.cardTitle = content.querySelector('.card__title');
			this.cardPrice = content.querySelector('.card__price');
			this.cardCategory = content.querySelector('.card__category');
			this.cardImage = content.querySelector('.card__image');

			this.cardTitle.textContent = this.product.title;
			this.cardCategory.textContent = this.product.category;
			this.cardPrice.textContent = `${this.product.price} синапсов`;
			this.cardImage.src = `${CDN_URL}${this.product.image}`;

			const getCatergoryClassname = () => {
				switch (this.product.category) {
					case 'софт-скил':
						return 'card__category_soft';
					case 'другое':
						return 'card__category_other';
					case 'дополнительное':
						return 'card__category_additional';
					case 'кнопка':
						return 'card__category_button';
					case 'хард-скил':
						return 'card__category_hard';
					default:
						return 'card__category_other';
				}
			};

			this.cardCategory.classList.add(getCatergoryClassname());

			this.element = content.firstElementChild as HTMLElement;

			this.element.addEventListener('click', (e: MouseEvent) => {
				if (!(e.target as HTMLElement).closest('.card__button')) {
					const detailModal = new ProductDetailModal(this.product);
					detailModal.init();
					detailModal.open();
				}
			});
	}
}
