import { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import { getOrders } from '../../api/orderData';

const RevenuePage = () => {
  const [orders, setOrders] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    getOrders().then((data) => {
      let revenueSum = 0;
      const closedOrders = data.filter((order) => !order.is_open);
      setOrders(closedOrders);

      closedOrders.forEach((item) => {
        revenueSum += Number(item.total);
      });
      setSum(revenueSum);
    });
  }, []);

  return (
    <div>
      <h2>Revenue</h2>
      <Table className="revenue-table" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Order Number</th>
            <th>Customer</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody className="table-row">
          {orders.map((order) => (
            <tr>
              <td>{order.date}</td>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
        <Card className="revenue-total">
          <Card.Body>Total Revenue for Period: {Math.round(sum * 100) / 100}</Card.Body>
        </Card>
      </Table>
    </div>
  );
};

export default RevenuePage;
