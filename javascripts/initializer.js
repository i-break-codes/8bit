var Initializer = function() {
  function init() {
    applyTheme();
  }

  function applyTheme() {
    if(localStorage.theme) {
      // change button icon
      window.addEventListener('load', function() {
        document.getElementById('switch-theme').setAttribute('data-theme-enabled', 'light');
      });

      //append styles
      var addStyle = document.createElement('style');
      addStyle.appendChild(document.createTextNode(
        `
          :root {
            --brand-color: #121212;
            --bg-color: #eee;
            --text-color: #313131;
            --primary-color: #121212;
            --not-maintained: #f9171f;
            --primary-border-color: #ddd;
            --read-more-start: rgba(238,238,238,.3);
            --read-more-end: rgba(238,238,238,1);
            --white-05: rgba(0, 0, 0, .05);
            --code-bg-color: #f5f5f5;
            --error-color: #ff4757;
          }
        `
      ));
      addStyle.setAttribute('data-theme', true);
      document.head.appendChild(addStyle);
    }
  }

  return {
    init: init,
    applyTheme: applyTheme
  }
}();

Initializer.init();
