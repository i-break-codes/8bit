var App = function() {
  function init() {
    registerCacheWorker();
    readMore();
    toggleMenu();
    toggleTabs();
    toggleTheme();
    lazyLoadImages();
    resizeHeaderOnScroll();
    checkConnection();
    appVersion();
  }

  function appVersion() {
    let template = `
      <span class="app-version">release v1.0</span>
    `;

    document.body.insertAdjacentHTML('beforeEnd', template);
  }

  function checkConnection() {
    //* xhr is recommended and I know that online is different than for what am trying to use this but yea, ignore for now.
    let template = `
      <div class="internet-connection-issue">
        <p>There seems to be some problem with your Internet Connection. Website entering into <strong>Offline Mode</strong>.</p>
      </div>
    `;

    window.addEventListener('offline', ()=> {
      document.body.insertAdjacentHTML('beforeEnd', template);
    });

    window.addEventListener('online', ()=> {
      document.querySelector('.internet-connection-issue').remove();
    });
  }

  function resizeHeaderOnScroll() {
    window.addEventListener('scroll', () => {
      console.log(window.scrollY);
      if(window.scrollY > 100) {
        document.getElementsByTagName('header')[0].classList.add('header-min');
      } else {
        document.getElementsByTagName('header')[0].classList.remove('header-min');
      }
    });
  }

  function lazyLoadImages() {
    const io = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let image = entry.target;
              image.src = image.dataset.src;

          io.unobserve(image);
        }
      })
    );

    document.querySelectorAll("img[data-src]").forEach((element) => io.observe(element));
  }

  function toggleTheme() {
    var switchTheme = document.getElementById('switch-theme');
    switchTheme.addEventListener('click', function() {
      if(localStorage.theme) {
        var checkStylesExists = document.querySelector('[data-theme]')
        if(checkStylesExists) {
          checkStylesExists.remove();
        }
        localStorage.removeItem('theme');
        switchTheme.setAttribute('data-theme-enabled', 'dark');
      } else {
        switchTheme.setAttribute('data-theme-enabled', 'light');
        localStorage.setItem('theme', true);
      }

      Initializer.applyTheme();
    });
  }

  function registerCacheWorker() {
    if('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/cache-worker.js', {
            scope: '/'
          })
          .catch(err => console.error(`Error in service worker: ${err}`));
      });
    }
  }

  function readMore() {
    var getReadMore = document.querySelectorAll('.read-more a');
    getReadMore.forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();

        var wrapper = el.closest('.project-info'),
            getClassList = wrapper.classList;

        getClassList.toggle('expanded');
        el.innerText = getClassList.contains('expanded') ? 'Read Less' : 'Read More';
      });
    });
  }

  function toggleMenu() {
    var getMenu = document.getElementById('menu'),
    getMenuCTA = document.getElementById('hamburger-btn');

    getMenuCTA.addEventListener('click', function(e) {
      e.preventDefault();

      getMenuCTA.classList.toggle('is-active');
      if(getMenuCTA.classList.contains('is-active')) {
        getMenu.classList.remove('hide');
        document.body.style.overflow = 'hidden';
      } else {
        getMenu.classList.add('hide');
        document.body.removeAttribute('style');
      }
    });
  }

  function toggleTabs() {
    var getTriggers = document.querySelectorAll('[data-trigger]');
    getTriggers.forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();

        var wrapper = el.closest('.resource-band'),
        allNavs = wrapper.querySelectorAll('[data-trigger]');

        allNavs.forEach(function(elm) {
          elm.classList.remove('active-sub-tab');
        });

        el.classList.add('active-sub-tab');

        var allScreens = wrapper.querySelectorAll('[data-target]');
        allScreens.forEach(function(elScreen) {
          elScreen.classList.add('hide');
        });

        wrapper.querySelector('[data-target="' + el.getAttribute('data-trigger') + '"]').classList.remove('hide');
      });
    });
  }

  return {
    init: init
  }
}();

App.init();
