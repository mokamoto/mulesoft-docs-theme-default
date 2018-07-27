(function () {
  'use strict';

  const navLists = document.querySelectorAll('.js-nav-list');
  let navListsHeights = [];
  let navListItems;
  let navListItemHeight;
  let anchor;

  for (let i = 0; i < navLists.length; i++) {
    // get all list items and reset height
    navListItems = navLists[i].querySelectorAll('li');
    navListItemHeight = 0;

    // get height of list based on number of list items
    for (let x = 0; x < navListItems.length; x++) {
      navListItemHeight += navListItems[x].offsetHeight;
      navListsHeights[i] = navListItemHeight;
    }

    // set initial active list height
    if (navLists[i].classList.contains('active')) {
      navLists[i].style.transition = 'none';
      navLists[i].style.maxHeight = `${navListsHeights[i]}px`;
    }
  }
})();
