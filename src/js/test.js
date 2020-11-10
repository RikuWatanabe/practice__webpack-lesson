const title = document.getElementsByTagName('h1')[0];
title.addEventListener('click', (event) => {
  const target = event.target;
  const text = document.createElement('p');
  text.innerText = 'Welcome to webpack lesson!!';
  target.parentNode.insertBefore(text, target.nextSibling)
});
