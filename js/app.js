(function (app) {
  app.homepage = async function () {
    await loadPageData();
    loadFrontPageData();
  };

  app.focusPage = async function () {
    await loadPageData();
    loadFocusItem();
  };

  const smallMenu = document.querySelector('.small-menu')
  const menuButton = document.getElementById('small-btn');

  menuButton.addEventListener("click", openMenu);

  app.portfolioItems = [];

  async function loadPageData() {
    const cacheData = sessionStorage.getItem('site-data');

    if (cacheData !== null) {
      app.portfolioItems = JSON.parse(cacheData);
    } else {
      const rawData = await fetch('sitedata.json');
      const data = await rawData.json();
      app.portfolioItems = data;
      sessionStorage.setItem('site-data', JSON.stringify(data));
    }
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
    const puppyWrapper = document.getElementById('puppy-wrapper');

    for (let i = 0; i < app.portfolioItems.length; i++) {
      const el = app.portfolioItems[i];
      const pup = document.createElement('div');

      const bigPictureLink = document.createElement('a');
      bigPictureLink.href = `focus.html?item=${el.Id}`;

      //puppy name and age display
      const pupNameAge = document.createElement('h3');
      let Age = '';
      if (el.Age < 1) {
        const converted = el.Age * 12;
        Age = `${converted} months`;
      } else {
        Age = `${el.Age} years`;
      }
      pupNameAge.innerHTML = `${el.Name} ${Age}`;
      pup.appendChild(pupNameAge);

      //puppy image and alt
      const pupImg = document.createElement('img');
      pupImg.src = el.largeImage;
      pupImg.alt = el.largeImageAlt;
      pup.appendChild(pupImg);

      //puppy breed
      const pupBreed = document.createElement('h4');
      pupBreed.innerHTML = `<span class="breed">${el.Breed}</span>`;
      pup.appendChild(pupBreed);

      //puppy description
      const pupDesc = document.createElement('p');
      pupDesc.innerHTML = `${el.description}`;
      pup.appendChild(pupDesc);

      pup.classList.add('pup');
      bigPictureLink.appendChild(pup);
      puppyWrapper.appendChild(bigPictureLink);
    }
  }

  function loadFocusItem() {
    const focusDiv = document.createElement('div');
    const main = document.querySelector('main');

    //get item Id
    const params = new URLSearchParams(window.location.search);
    let item = Number.parseInt(params.get('item'));

    const el = app.portfolioItems[item - 1];

    //pup agename
    const pupNameAge = document.createElement('h1');
    let Age = '';
    if (el.Age < 1) {
      const converted = el.Age * 12;
      Age = `${converted} months`;
    } else {
      Age = `${el.Age} years`;
    }
    pupNameAge.innerHTML = `${el.Name} ${Age}`;
    focusDiv.appendChild(pupNameAge);

    //puppy image and alt
    const pupImg = document.createElement('img');
    pupImg.src = el.largeImage;
    pupImg.alt = el.largeImageAlt;
    focusDiv.appendChild(pupImg);

    //puppy breed
    const pupBreed = document.createElement('h2');
    pupBreed.innerHTML = `${el.Breed}`;
    focusDiv.appendChild(pupBreed);

    //puppy description
    const pupDesc = document.createElement('p');
    pupDesc.innerHTML = `${el.description}`;
    focusDiv.appendChild(pupDesc);

    main.appendChild(focusDiv);
  }

  //   function dynamicSearch(){
  //     const pupWrapper =
  //     var searchTerm = document.getElementById('puppy-search').value;

  //   }
})((window.app = window.app || {}));
