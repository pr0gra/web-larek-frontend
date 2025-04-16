import { IView, View } from './View';

export interface IModal extends IView {
	setContent(content: string | HTMLElement): void;
	open(): void;
	close(): void;
}

export class Modal extends View implements IModal {
	// В данном случае мы не создаём отдельный overlay, т.к. шаблон уже включает его
	constructor() {
		// Вызываем super с базовыми параметрами (будет перезаписано)
		super('div', 'modal');

		// Пытаемся найти шаблон модального окна по ID "modal-container"
		const template = document.getElementById('modal-container') as HTMLTemplateElement;
		if (template) {
			// Клонируем содержимое шаблона
			const content = template.content.cloneNode(true) as DocumentFragment;
			// Перезаписываем базовый элемент на склонированный
			this.element = content.firstElementChild as HTMLElement;
		} else {
			// Фолбэк: если шаблон не найден, создаём простую структуру модального окна
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

	/**
	 * Метод устанавливает содержимое модального окна.
	 * Содержимое добавляется внутрь элемента с классом "modal__content"
	 */
	setContent(content: any): void {
		const modalContent = this.element.querySelector('.modal__content');
		if (modalContent) {
			if (typeof content === 'string') {
				modalContent.innerHTML = content;
			} else {
				modalContent.innerHTML = '';
				modalContent.appendChild(content);
			}
		} else {
			// Фолбэк, если структура шаблона изменилась
			if (typeof content === 'string') {
				this.element.innerHTML = content;
			} else {
				this.element.innerHTML = '';
				this.element.appendChild(content);
			}
		}
	}

	/**
	 * Метод для открытия модального окна: добавляет его в DOM.
	 */
	open(): void {
		document.body.appendChild(this.element);
	}

	/**
	 * Метод для закрытия модального окна: удаляет его из DOM.
	 */
	close(): void {
		if (this.element.parentNode) {
			this.element.parentNode.removeChild(this.element);
		}
	}
}
