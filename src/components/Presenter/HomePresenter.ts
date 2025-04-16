import { IProduct } from '../../types/IProduct';
import { IApiService } from '../Model/ApiService';
import { ICartManager } from '../Model/CartManager';
import { IHomePageView } from '../View/HomePageView';

export interface IHomePresenter {
  loadProducts(view: IHomePageView, apiService: IApiService): void;
  init(view: IHomePageView, apiService: IApiService, cartManager: ICartManager): void;
}

export class HomePresenter implements IHomePresenter {
  private view: IHomePageView;
  private cartManager: ICartManager;

  init(view: IHomePageView, apiService: IApiService, cartManager: ICartManager): void {
    this.view = view;
    this.cartManager = cartManager;

    this.view.init(); 

    document.addEventListener('addToCart', (e: Event) => {
      const customEvent = e as CustomEvent<IProduct>;
      this.cartManager.addItem(customEvent.detail);
    });

    this.loadProducts(view, apiService);
  }

  loadProducts(view: IHomePageView, apiService: IApiService): void {
    apiService
      .getProducts()
      .then((products: IProduct[]) => {
        view.renderProducts(products);
      })
      .catch((err: any) => console.error('Ошибка загрузки продуктов:', err));
  }
}
