import { clientCredentials } from '../utils/client';

const getMenu = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/menus`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getMenuItem = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/menus/${id}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getMenu,
  getMenuItem,
};
