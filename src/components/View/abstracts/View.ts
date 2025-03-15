export interface IView {
	element: HTMLElement;
	createElement(tagName: string, className?: string): HTMLElement;
	addChild(child: Node): void;
	render(): HTMLElement;
}

export class View implements IView {
	element: HTMLElement;
	constructor(tagName = 'div', className = '') {
		this.element = this.createElement(tagName, className);
	}
	createElement(tagName: string, className = ''): HTMLElement {
		const el = document.createElement(tagName);
		if (className) el.className = className;
		return el;
	}
	addChild(child: Node): void {
		if (child instanceof View) {
			this.element.appendChild(child.render());
		} else {
			this.element.appendChild(child);
		}
	}
	render(): HTMLElement {
		return this.element;
	}
}
