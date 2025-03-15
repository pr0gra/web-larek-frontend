import { IOrderRequest } from '../../types/IOrderRequest';
import { IOrderResponse } from '../../types/IOrderResponse';
import { IProduct } from '../../types/IProduct';
import { API_URL } from '../../utils/constants';
import { Api, ApiListResponse } from '../base/api';

export interface IApiService {
	getProducts(): Promise<IProduct[]>;
	submitOrder(order: IOrderRequest): Promise<IOrderResponse>;
}

export class ApiService implements IApiService {
	private api = new Api(API_URL);

	async getProducts(): Promise<IProduct[]> {
		try {
			const response = await this.api.get<ApiListResponse<IProduct>>(
				'/product/'
			);
			return response.items;
		} catch (error) {
			console.error(error);
		}
	}

	async submitOrder(formData: IOrderRequest): Promise<IOrderResponse> {
		try {
			const response = await this.api.post<IOrderResponse>('/order/', formData);
			return response;
		} catch (error) {
			console.error('Ошибка:', error);
		}
	}
}
