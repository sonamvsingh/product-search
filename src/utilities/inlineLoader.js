function inlineLoader(elementSelector, state) {
  var element = document.querySelector(elementSelector);

  if (element === null) {
    return;
  }

  if (state === 'show') {
    element.classList.add('spinner-border');
    element.classList.add('spinner-border-sm');
  } else {
    element.classList.remove('spinner-border');
    element.classList.remove('spinner-border-sm');
  }
}

export {
  inlineLoader,
};