(function() {
  'use strict'

  const toggle = document.querySelectorAll('.js-version');
  for (let i = 0; i < toggle.length; i++) {
    toggle[i].addEventListener('change', function(e) {
      window.location.href = e.target.value;
    });
  };
})();
