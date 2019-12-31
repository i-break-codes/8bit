var App = function() {
  function init() {
    readMore();
    toggleMenu();
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

  return {
    init: init
  }
}();

App.init();
