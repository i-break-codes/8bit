var App = function() {
  function init() {
    registerCacheWorker();
    readMore();
    toggleMenu();
    toggleTabs();
    toggleTheme();
    lazyLoadImages();
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
          .then(reg => {
            console.log('Service worker registered');
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
