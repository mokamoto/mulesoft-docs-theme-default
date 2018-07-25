(function () {
  'use strict'

  var navWrapper = document.querySelector('.js-nav'),
    navPanels = document.querySelector('.navigation-panels'),
    panelNames = find('[data-panel]', navPanels).map(function (panel) {
      return panel.dataset.panel
    }),
    currentDomain = navWrapper.dataset.domain,
    currentVersion = navWrapper.dataset.version,
    isSiteAspect = (navWrapper.dataset.isSiteAspect === 'true'),
    isHome = (navWrapper.dataset.isHome === 'true'),
    state = getState() || {}

  if (isSiteAspect || isHome) {
    state.panel = 'aspect'
  }
  else if (state.panel === 'explore') {
    state.scroll = 0
    state.panel = 'domain'
  }
  else {
    state.panel = 'domain'
  }
  selectPanel(state.panel)
  find('.navigation-toolbar [data-panel]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectPanel(btn.dataset.panel)
    })
  })

  function selectPanel(panelName) {
    if (panelNames.indexOf(panelName) < 0) {
      panelName = 'domain'
    }
    find('.navigation [data-panel]').forEach(function (element) {
      element.classList.toggle('navigation--currentPanel', element.dataset.panel === panelName)
    })
    if (panelName !== state.panel) {
      navPanels.scrollTop = 0
    }
    state.panel = panelName
    saveState()
  }

  // navigation tree items
  find('.nav-tree').forEach(function (navTree) {
    var panel = navTree.parentElement.dataset.panel
    find('.nav-itm', navTree).forEach(function (item, idx) {
      item.setAttribute('data-id', [panel, item.dataset.depth, idx].join('-'))
    })
  })
  find('.nav-ctl').forEach(function (btn) {
    var li = btn.parentElement
    btn.addEventListener('click', function () {
      li.setAttribute('data-state', (li.dataset.state === 'collapsed' || !li.dataset.state) ? 'expanded' : 'collapsed')
      state.expandedItems = getExpandedItems()
      saveState()
    })
  })
  if (!state.expandedItems) {
    state.expandedItems = getExpandedItems()
    saveState()
  }
  if (state.domain !== currentDomain || state.version !== currentVersion) {
    state.expandedItems = state.expandedItems.filter(function (item) {
      // startsWith is ES6 :/
      return item.match(/^aspect-/)
    })
  }

  state.expandedItems.forEach(function (itemId) {
    var item = document.querySelector('.nav-itm[data-id="' + itemId + '"]')
    if (item) {
      item.setAttribute('data-state', 'expanded')
    }
  })
  saveState()

  function getExpandedItems() {
    return find('.nav-tree .nav-itm[data-state="expanded"]').map(function (item) {
      return item.dataset.id
    })
  }

  state.domain = currentDomain
  state.version = currentVersion
  saveState()

  // state management
  function getState(domain, version) {
    var data = sessionStorage.getItem('nav-state')
    if (data) {
      return JSON.parse(data)
    }
  }

  function saveState() {
    sessionStorage.setItem('nav-state', JSON.stringify(state))
  }

  function find(selector, from) {
    from = from || document
    return [].slice.call(from.querySelectorAll(selector))
  }
})();
