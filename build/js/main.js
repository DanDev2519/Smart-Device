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

var KeyCode = {
  ESC: 27,
};

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
var storageQuestion = '';

try {
  storageName = localStorage.getItem('name');
  storageTel = localStorage.getItem('tel');
  storageQuestion = localStorage.getItem('comment');
} catch (err) {
  isStorageSupport = false;
}

// Оживление попапа Задать вопрос
var writeLink = document.querySelector('.main-nav__button');
var closePopup = function () {
  writePopup.classList.remove('modal--show');
  writePopup.classList.remove('modal--error');
  overlay.style.display = 'none';
  // document.body.style.overflow = '';
  var scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.width = 'auto';
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
};

if (writeLink) {
  var overlay = document.querySelector('.overlay');
  var writePopup = document.querySelector('.modal');
  var writeClose = writePopup.querySelector('.modal__close');

  var writeForm = writePopup.querySelector('form');
  var writeName = writePopup.querySelector('[name=name]');
  var writeTel = writePopup.querySelector('[name=tel]');
  var writeLetter = writePopup.querySelector('[name=comment]');

  writeLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    writePopup.classList.add('modal--show');
    overlay.style.display = 'block';
    // document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;

    if (storageName) {
      writeName.value = storageName;
      writeTel.focus();
      if (storageTel) {
        writeTel.value = storageTel;
        writeLetter.focus();
      }
      if (storageQuestion) {
        writeLetter.value = storageQuestion;
        writeLetter.focus();
      }
    } else {
      writeName.focus();
    }
  });

  writeClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopup();
  });

  overlay.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopup();
  });

  writeForm.addEventListener('submit', function (evt) {
    if (!writeName.value || !writeTel.value || !writeLetter.value) {
      evt.preventDefault();
      writePopup.classList.remove('modal--error');
      writePopup.offsetWidth = writePopup.offsetWidth;
      writePopup.classList.add('modal--error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', writeName.value);
        localStorage.setItem('tel', writeTel.value);
        localStorage.setItem('comment', writeLetter.value);
      }
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
      evt.preventDefault();
      closePopup();
    }
  });
}
