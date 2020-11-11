'use strict';

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
  document.body.style.overflow = '';
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
    document.body.style.overflow = 'hidden';

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
    if (!writeName.value || !writeTel.value) {
      evt.preventDefault();
      writePopup.classList.remove('modal--error');
      writePopup.style.width = writePopup.offsetWidth;
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

// Плавная прокрутка
var anchors = document.querySelectorAll('a.scroll-to');

anchors.forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    var blockID = anchor.getAttribute('href');

    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});


// Поле ввода телефона
var inputTels = document.querySelectorAll('input[type="tel"]');

inputTels.forEach(function (input) {
  input.onfocus = function () {
    if (this.value === '') {
      this.value = '+7(';
    }
  };

  input.onblur = function () {
    if (this.value === '+7(') {
      this.value = '';
    }
  };

  input.oninput = function () {
    if (this.value.length === 6 && !this.value.includes(')')) {
      this.value += ')';
    }
  };
});
