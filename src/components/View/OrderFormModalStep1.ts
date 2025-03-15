import { EPaymentMethod } from '../../types/EPaymentMethod';
import { IModal, Modal } from './abstracts/Modal';

interface IOrderFormModalStep1 extends IModal {
	form: HTMLFormElement;
	init(): void;
	onChange(e: Event): void;
	validate(): boolean;
}

type IOrderFormStep1 = {
    payment?: EPaymentMethod;
    address?: string;
};

export class OrderFormModalStep1 extends Modal implements IOrderFormModalStep1 {
	form: HTMLFormElement;
	constructor() {
		super('div', 'order-form-step1');
		this.form = document.createElement('form');
	}
	init(): void {
		const template = document.getElementById('order') as HTMLTemplateElement;
		if (template) {
			const content = template.content.cloneNode(true) as DocumentFragment;
			this.element = content.firstElementChild as HTMLElement;
			this.form = this.element as HTMLFormElement;
			this.form.addEventListener('change', (e: Event) => this.onChange(e));
			this.form.addEventListener('submit', (e: Event) => {
				e.preventDefault();
				if (this.validate()) {
					const formData = new FormData(this.form);
					const data: IOrderFormStep1 = {};
					formData.forEach((value, key) => {
						data[key] = value;
					});
					this.element.dispatchEvent(
						new CustomEvent('orderStep1Submit', {
							detail: data,
						})
					);
				}
			});
		}
	}
	onChange(): void {
		const submitButton = this.element.querySelector(
			'button[type="submit"]'
		) as HTMLButtonElement;
		if (submitButton) {
			submitButton.disabled = !this.validate();
		}
	}
	validate(): boolean {
		const addressInput = this.element.querySelector(
			'input[name="address"]'
		) as HTMLInputElement;
		return addressInput ? addressInput.value.trim() !== '' : false;
	}
}
