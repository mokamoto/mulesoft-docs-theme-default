(function() {
  'use strict'

  const toggle = document.querySelector('.js-version')
  if (!toggle) return

  toggle.addEventListener('change', function(e) {
    window.location.href = e.target.value
  })
})();
