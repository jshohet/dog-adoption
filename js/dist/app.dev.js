"use strict";

(function (app) {
  app.homepage = function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(loadPageData());

          case 2:
            loadFrontPageData();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  app.focusPage = function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(loadPageData());

          case 2:
            loadFocusItem();

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  var smallMenu = document.querySelector('.small-menu');
  var menuButton = document.getElementById('small-btn');
  menuButton.addEventListener("click", openMenu);
  app.portfolioItems = [];

  function loadPageData() {
    var cacheData, rawData, data;
    return regeneratorRuntime.async(function loadPageData$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            cacheData = sessionStorage.getItem('site-data');

            if (!(cacheData !== null)) {
              _context3.next = 5;
              break;
            }

            app.portfolioItems = JSON.parse(cacheData);
            _context3.next = 13;
            break;

          case 5:
            _context3.next = 7;
            return regeneratorRuntime.awrap(fetch('sitedata.json'));

          case 7:
            rawData = _context3.sent;
            _context3.next = 10;
            return regeneratorRuntime.awrap(rawData.json());

          case 10:
            data = _context3.sent;
            app.portfolioItems = data;
            sessionStorage.setItem('site-data', JSON.stringify(data));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    });
  }

  function openMenu(el) {
    el.preventDefault();

    if (window.getComputedStyle(smallMenu).display != 'none') {
      smallMenu.style.display = 'none';
    } else {
      smallMenu.style.display = 'block';
    }
  }

  function loadFrontPageData() {
    var puppyWrapper = document.getElementById('puppy-wrapper');

    for (var i = 0; i < app.portfolioItems.length; i++) {
      var el = app.portfolioItems[i];
      var pup = document.createElement('div');
      var bigPictureLink = document.createElement('a');
      bigPictureLink.href = "focus.html?item=".concat(el.Id); //puppy name and age display

      var pupNameAge = document.createElement('h3');
      var Age = '';

      if (el.Age < 1) {
        var converted = el.Age * 12;
        Age = "".concat(converted, " months");
      } else {
        Age = "".concat(el.Age, " years");
      }

      pupNameAge.innerHTML = "".concat(el.Name, " ").concat(Age);
      pup.appendChild(pupNameAge); //puppy image and alt

      var pupImg = document.createElement('img');
      pupImg.src = el.largeImage;
      pupImg.alt = el.largeImageAlt;
      pup.appendChild(pupImg); //puppy breed

      var pupBreed = document.createElement('h4');
      pupBreed.innerHTML = "<span class=\"breed\">".concat(el.Breed, "</span>");
      pup.appendChild(pupBreed); //puppy description

      var pupDesc = document.createElement('p');
      pupDesc.innerHTML = "".concat(el.description);
      pup.appendChild(pupDesc);
      pup.classList.add('pup');
      bigPictureLink.appendChild(pup);
      puppyWrapper.appendChild(bigPictureLink);
    }
  }

  function loadFocusItem() {
    var focusDiv = document.createElement('div');
    var main = document.querySelector('main'); //get item Id

    var params = new URLSearchParams(window.location.search);
    var item = Number.parseInt(params.get('item'));
    var el = app.portfolioItems[item - 1]; //pup agename

    var pupNameAge = document.createElement('h1');
    var Age = '';

    if (el.Age < 1) {
      var converted = el.Age * 12;
      Age = "".concat(converted, " months");
    } else {
      Age = "".concat(el.Age, " years");
    }

    pupNameAge.innerHTML = "".concat(el.Name, " ").concat(Age);
    focusDiv.appendChild(pupNameAge); //puppy image and alt

    var pupImg = document.createElement('img');
    pupImg.src = el.largeImage;
    pupImg.alt = el.largeImageAlt;
    focusDiv.appendChild(pupImg); //puppy breed

    var pupBreed = document.createElement('h2');
    pupBreed.innerHTML = "".concat(el.Breed);
    focusDiv.appendChild(pupBreed); //puppy description

    var pupDesc = document.createElement('p');
    pupDesc.innerHTML = "".concat(el.description);
    focusDiv.appendChild(pupDesc);
    main.appendChild(focusDiv);
  } //   function dynamicSearch(){
  //     const pupWrapper =
  //     var searchTerm = document.getElementById('puppy-search').value;
  //   }

})(window.app = window.app || {});