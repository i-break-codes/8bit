var App = function() {
  function init() {
    readMore();
    toggleMenu();
    toggleTabs();
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
