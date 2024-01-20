import { useEffect, useState } from 'react';
import { getOrders } from '../../api/orderData';
import OrderCard from '../../components/orders/OrderCard';

const OrdersPage = () => {
  const [openOrders, setOpenOrders] = useState([]);
  const [closedOrders, setClosedOrders] = useState([]);

  const retrieveOrders = () => {
    getOrders().then((data) => {
      const closed = data.filter((order) => !order.is_open);
      const open = data.filter((order) => order.is_open);
      setClosedOrders(closed);
      setOpenOrders(open);
    });
  };

  useEffect(() => {
    retrieveOrders();
  }, []);

  return (
    <article>
      <h2 className="order-page-titles">Pending Orders</h2>
      <div className="order-cards">
        {openOrders.map((order) => (
          <section key={order.id}>
            <OrderCard orderObj={order} onUpdate={retrieveOrders} />
          </section>
        ))}
      </div>

      <h2 className="order-page-titles">Closed Orders</h2>
      <div className="order-cards">
        {closedOrders.map((order) => (
          <section key={order.id}>
            <OrderCard orderObj={order} />
          </section>
        ))}
      </div>
    </article>
  );
};

export default OrdersPage;
