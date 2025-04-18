import './scss/styles.scss';

import { ApiService } from "./components/Model/ApiService";
import { CartManager } from "./components/Model/CartManager";
import { HomePresenter } from "./components/Presenter/HomePresenter";
import { HomePageView } from "./components/View/HomePageView";
import { CartPresenter } from './components/Presenter/CartPresenter';

document.addEventListener('DOMContentLoaded', () => {
  const apiService = new ApiService();
  const cartManager = new CartManager();

  
  const homePageView = new HomePageView(cartManager);
  homePageView.init();
  const cartPresenter = new CartPresenter(cartManager, apiService);
  
  const galleryContainer = document.querySelector('.page__section');
  if (galleryContainer) {
    galleryContainer.innerHTML = '';
    galleryContainer.appendChild(homePageView.render());
  } else {
    console.error('Элемент с классом .gallery не найден');
  }

  const homePresenter = new HomePresenter();
  homePresenter.init(homePageView, apiService, cartManager);
});
