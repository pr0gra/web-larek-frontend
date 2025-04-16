import { IApiService } from '../Model/ApiService';
import { ICartManager } from '../Model/CartManager';
import { IContactsForm, IOrderForm, IOrderFormModalView, OrderFormModalView } from '../View/OrderFormModalView';
import { IOrderRequest } from '../../types/IOrderRequest';
import { IOrderResponse } from '../../types/IOrderResponse';
import { SuccessModalView } from '../View/SuccessModalView';

export interface IFormPresenter {
    cartManager: ICartManager;
    apiService: IApiService;
    formModalView: IOrderFormModalView;
    open(): void;
    orderProducts(): Promise<IOrderResponse | null>;
}

export class FormPresenter implements IFormPresenter {
    cartManager: ICartManager;
    apiService: IApiService;
    formModalView: IOrderFormModalView;
    private orderData: Partial<IOrderRequest> = {};

    constructor(cartManager: ICartManager, apiService: IApiService) {
        this.cartManager = cartManager;
        this.apiService = apiService;
        this.formModalView = new OrderFormModalView(cartManager);
        this.formModalView.init();
        this.setupEventListeners();
    }

    open(): void {
        this.formModalView.open();
    }

    private setupEventListeners(): void {
        this.formModalView.element.addEventListener('orderSubmit', (e: Event) => {
            const customEvent = e as CustomEvent<IOrderForm>;
			console.log(customEvent.detail)
            this.handleOrderFormSubmit(customEvent.detail);
        });
    }

    private handleOrderFormSubmit(formData: IOrderForm & IContactsForm): void {
        this.orderData = {
            email: formData.email,
            phone: formData.phone,
            payment: formData.payment,
            address: formData.address
        };
        console.log(this.orderData)
        this.orderProducts()
    }

    async orderProducts(): Promise<IOrderResponse | null> {
        try {
            const request: IOrderRequest = {
                ...this.orderData as Required<Pick<IOrderRequest, 'payment' | 'address'>>,
                email: this.orderData.email || '',
                phone: this.orderData.phone || '',
                total: this.cartManager.calculateTotalPrice(),
                items: this.cartManager.getProducts().map(item => item.id)
            };

            console.log(request)

            const response = await this.apiService.submitOrder(request);
            
            this.cartManager.clear();
            this.showSuccessModal(request.total);
            
            return response;
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
            return null;
        }
    }

    private showSuccessModal(total: number): void {
        const successModal = new SuccessModalView(total);
        successModal.init();
        successModal.open();
    }
}