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
      console.warn(data);
    });
  };

  useEffect(() => {
    retrieveOrders();
  }, []);

  return (
    <article>
      <h2>Pending Orders</h2>
      <div className="order-cards">
        {openOrders.map((order) => (
          <section key={order.id}>
            <OrderCard orderObj={order} />
          </section>
        ))}
      </div>

      <h2>Closed Orders</h2>
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

// {/* <Card style={{ width: '18rem' }}>
//       <Card.Body>
//         <Card.Title></Card.Title>
//       </Card.Body>
//     </Card> */}
