import Loader from '../../components/common/loader';

let requestCount = 0;

export const addLoader = () => {
  const $loader = document.querySelector('#loader');
  new Loader($loader);

  window.addEventListener('request', () => {
    requestCount++;
    $loader.classList.add('show');
  });

  window.addEventListener('request-end', () => {
    requestCount--;
    if (requestCount === 0) $loader.classList.remove('show');
  });
};
