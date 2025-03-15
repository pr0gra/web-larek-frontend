import { IView, View } from './View';

export interface IModal extends IView {
	setContent(content: string | HTMLElement): void;
	open(): void;
	close(): void;
}

export class Modal extends View implements IModal {
	modalElement: HTMLElement;
	constructor(tagName = 'div', className = 'modal') {
		super(tagName, className);
		this.modalElement = this.createElement('div', 'modal-overlay');
	}
	setContent(content: string | HTMLElement): void {
		if (typeof content === 'string') {
			this.element.innerHTML = content;
		} else {
			this.element.innerHTML = '';
			this.element.appendChild(content);
		}
	}
	open(): void {
		document.body.appendChild(this.modalElement);
		document.body.appendChild(this.element);
	}
	close(): void {
		if (this.modalElement.parentNode)
			this.modalElement.parentNode.removeChild(this.modalElement);
		if (this.element.parentNode)
			this.element.parentNode.removeChild(this.element);
	}
}
