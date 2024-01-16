import { clientCredentials } from '../utils/client';

const getOrders = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPaymentTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/paymenttypes`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getOrderTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ordertypes`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createOrder = (order) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateOrder = (order) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${order.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderTypes,
  getPaymentTypes,
};
