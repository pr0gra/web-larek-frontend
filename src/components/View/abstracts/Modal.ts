import { IView, View } from './View';

export interface IModal extends IView {
	setContent(content: string | HTMLElement): void;
	open(): void;
	close(): void;
}

export class Modal extends View implements IModal {
	constructor() {
		super('div', 'modal');

		const template = document.getElementById('modal-container') as HTMLTemplateElement;
		if (template) {
			const content = template.content.cloneNode(true) as DocumentFragment;
			this.element = content.firstElementChild as HTMLElement;
		} else {
			this.element = this.createElement('div', 'modal modal_active');
			const container = this.createElement('div', 'modal__container');
			const closeButton = this.createElement('button', 'modal__close');
			closeButton.setAttribute('aria-label', 'закрыть');
			const modalContent = this.createElement('div', 'modal__content');
			container.appendChild(closeButton);
			container.appendChild(modalContent);
			this.element.appendChild(container);
		}
	}

	setContent(content: HTMLElement & IView): void {
		const modalContent = this.element.querySelector('.modal__content');
		if (modalContent) {
			if (typeof content === 'string') {
				modalContent.innerHTML = content;
			} else {
				modalContent.innerHTML = '';
				modalContent.appendChild(content);
			}
		} else {
			if (typeof content === 'string') {
				this.element.innerHTML = content;
			} else {
				this.element.innerHTML = '';
				this.element.appendChild(content);
			}
		}
	}

	open(): void {
		document.body.style.overflow = 'hidden'
		document.body.appendChild(this.element);
	}

	close(): void {
		document.body.style.overflow = 'auto'
		if (this.element.parentNode) {
			this.element.parentNode.removeChild(this.element);
		}
	}
}
