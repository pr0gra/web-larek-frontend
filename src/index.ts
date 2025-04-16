import './scss/styles.scss';

import { ApiService } from "./components/Model/ApiService";
import { CartManager } from "./components/Model/CartManager";
import { HomePresenter } from "./components/Presenter/HomePresenter";
import { HomePageView } from "./components/View/HomePageView";
import { CartPresenter } from './components/Presenter/CartPresenter';

document.addEventListener('DOMContentLoaded', () => {
  // Создаем экземпляры моделей и сервисов
  const apiService = new ApiService();
  const cartManager = new CartManager();

  
  // Инициализируем представление главной страницы (view)
  const homePageView = new HomePageView();
  homePageView.init();
  const cartPresenter = new CartPresenter(cartManager, apiService);
  
  // Например, добавляем view в контейнер с классом "gallery" из index.html
  const galleryContainer = document.querySelector('.page__section');
  if (galleryContainer) {
    galleryContainer.innerHTML = '';
    galleryContainer.appendChild(homePageView.render());
  } else {
    console.error('Элемент с классом .gallery не найден');
  }

  // Инициализируем презентер главной страницы, который подгружает товары и подписывается на события
  const homePresenter = new HomePresenter();
  homePresenter.init(homePageView, apiService, cartManager);

  
  // cartPresenter.init(homePageView, cartManager, apiService);
});
