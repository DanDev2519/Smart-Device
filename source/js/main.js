'use strict';

// var navMain = document.querySelector('.main-nav');
// var navToggle = document.querySelector('.main-nav__toggle');

// navMain.classList.remove('main-nav--nojs');
// navMain.classList.remove('main-nav--opened');
// navMain.classList.add('main-nav--closed');

// navToggle.addEventListener('click', function () {
//   if (navMain.classList.contains('main-nav--closed')) {
//     navMain.classList.remove('main-nav--closed');
//     navMain.classList.add('main-nav--opened');
//   } else {
//     navMain.classList.add('main-nav--closed');
//     navMain.classList.remove('main-nav--opened');
//   }
// });

// Аккордеон
var panel = document.querySelector('.panel');
var panelItems = panel.querySelectorAll('.panel__item');
var activePanel;

panelItems.forEach(function (item) {
  item.classList.remove('panel__item--opened');
  item.classList.add('panel__item--closed');

  item.querySelector('h3').addEventListener('click', function (evt) {
    evt.preventDefault();
    item.classList.add('panel__item--opened');
    item.classList.remove('panel__item--closed');
    if (activePanel) {
      activePanel.classList.add('panel__item--closed');
      activePanel.classList.remove('panel__item--opened');
    }
    activePanel = (activePanel === item) ? 0 : item;
  });
});

// Проверка поддержки хранилища
var isStorageSupport = true;
var storageName = '';
var storageTel = '';

try {
  storageName = localStorage.getItem('name');
  storageTel = localStorage.getItem('tel');
} catch (err) {
  isStorageSupport = false;
}
