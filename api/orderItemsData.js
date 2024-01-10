import { clientCredentials } from '../utils/client';

const getSingleOrderItem = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderitems/${id}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createOrderItem = (orderItem) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderitems`, {
    method: 'POST',
    boy: JSON.stringify(orderItem),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateOrderItem = (orderItem) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderitems/${orderItem.id}`, {
    method: 'PUT',
    body: JSON.stringify(orderItem),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteOrderItem = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderitems/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getSingleOrderItem,
  updateOrderItem,
  createOrderItem,
  deleteOrderItem,
};
