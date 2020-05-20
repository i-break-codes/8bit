var Photography = function() {
  function init() {
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

    document.querySelectorAll(".photography-grid img").forEach((element) => io.observe(element));
  }

  return {
    init: init
  }
}();

Photography.init();
