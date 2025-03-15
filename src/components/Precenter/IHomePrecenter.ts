import { IProduct } from '../../types/IProduct';
import { IApiService } from '../Model/ApiService';
import { IHomePageView } from '../View/HomePageView';

export interface IHomePresenter {
	loadProducts(view: IHomePageView, apiService: IApiService): void;
}

export class HomePresenter implements IHomePresenter {
	loadProducts(view: IHomePageView, apiService: IApiService): void {
		apiService
			.getProducts()
			.then((products: IProduct[]) => {
				view.renderProducts(products);
			})
			.catch((err: any) => console.error('Ошибка загрузки продуктов:', err));
	}
}
