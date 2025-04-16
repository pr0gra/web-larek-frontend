import { EPaymentMethod } from '../../types/EPaymentMethod';
import { IOrderRequest } from '../../types/IOrderRequest';
import { IOrderResponse } from '../../types/IOrderResponse';
import { ICartManager } from '../Model/CartManager';
import { IModal, Modal } from './abstracts/Modal';

export interface IOrderFormModalView extends IModal {
	form: HTMLFormElement;
	init(): void;
	onChange(e: Event): void;
	validate(): boolean;
	openContactsModal(data: IOrderForm): void;
}

export interface IOrderForm {
	payment?: EPaymentMethod;
	address?: string;
	[key: string]: any;
}

export interface IContactsForm {
	email?: string;
	phone?: string;
	[key: string]: any;
}

export class OrderFormModalView extends Modal implements IOrderFormModalView {
	form: HTMLFormElement;
	cartManager: ICartManager;
	private selectedPayment: EPaymentMethod | null = null;
	private contactsModal: Modal;
	private formData: IOrderForm & IContactsForm;

	constructor(cartManager: ICartManager) {
		super();
		this.contactsModal = new Modal(); // Создаем экземпляр модального окна для контактов
		this.cartManager = cartManager;
	}

	init(): void {
		this.initOrderForm();
		this.initContactsModal();
	}

	private initOrderForm(): void {
		const template = document.getElementById('order') as HTMLTemplateElement;
		const content = template.content.cloneNode(true) as DocumentFragment;
		this.setContent(content);
		this.form = this.element.querySelector('.form') as HTMLFormElement;

		// Инициализация кнопок оплаты
		const paymentButtons = this.element.querySelectorAll(
			'.button_alt'
		) as NodeListOf<HTMLButtonElement>;

		paymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				paymentButtons.forEach((btn) => btn.classList.remove('button_active'));
				button.classList.add('button_active');
				this.selectedPayment = button.name as EPaymentMethod;

				let paymentInput = this.form.querySelector(
					'input[name="payment"]'
				) as HTMLInputElement;
				if (!paymentInput) {
					paymentInput = document.createElement('input');
					paymentInput.type = 'hidden';
					paymentInput.name = 'payment';
					this.form.appendChild(paymentInput);
				}
				paymentInput.value = this.selectedPayment;
				this.onChange(new Event('change'));
			});
		});

		// Обработчик отправки формы заказа
		this.form.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			if (this.validate()) {
				const formData = new FormData(this.form);
				const data: IOrderForm = {
					payment: this.selectedPayment,
					address: formData.get('address') as string,
				};
				this.formData = data;
				this.openContactsModal();
			}
		});

		this.form.addEventListener('change', (e: Event) => this.onChange(e));
	}

	private initContactsModal(): void {
		const template = document.getElementById('contacts') as HTMLTemplateElement;
		const content = template.content.cloneNode(true) as DocumentFragment;
		this.contactsModal.setContent(content);

		const contactsForm = this.contactsModal.element.querySelector(
			'.form'
		) as HTMLFormElement;

		// Валидация формы контактов
		contactsForm.addEventListener('change', () => {
			const submitButton = contactsForm.querySelector(
				'button[type="submit"]'
			) as HTMLButtonElement;
			if (submitButton) {
				const emailInput = contactsForm.querySelector(
					'input[name="email"]'
				) as HTMLInputElement;
				const phoneInput = contactsForm.querySelector(
					'input[name="phone"]'
				) as HTMLInputElement;

				submitButton.disabled = !(
					emailInput.value.trim() && phoneInput.value.trim()
				);
			}
		});

		contactsForm.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			const formData = new FormData(contactsForm);
			const data: IContactsForm = {
				email: formData.get('email') as string,
				phone: formData.get('phone') as string,
			};
			// document.addEventListener('addToCart', (e: Event) => {
			// 	const customEvent = e as CustomEvent<IOrderRequest>;
			// 	this.cartManager.addItem(customEvent.detail);
			// });

			// Диспатчим событие с полными данными заказа
			this.element.dispatchEvent(
				new CustomEvent('orderSubmit', {
					detail: {
						...this.formData,
						...data,
					},
				})
			);
		
			this.contactsModal.close();
		});
	}

	openContactsModal(): void {
		this.close();
		this.contactsModal.open();
	}

	onChange(e: Event): void {
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
		return this.selectedPayment !== null && addressInput.value.trim() !== '';
	}
}
