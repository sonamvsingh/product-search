function showError(elementSelector, message) {
  var element = document.getElementById(elementSelector);

  if (element === null) {
    return;
  }

  element.innerHTML = message;
  element.classList.add('alert-danger');
  element.classList.add('alert');
}

function removeError(elementSelector) {
  var element = document.getElementById(elementSelector);

  if (element === null) {
    return;
  }

  element.innerHTML = '';
  element.classList.remove('alert-danger');
  element.classList.remove('alert');
}

export {
  showError,
  removeError
};