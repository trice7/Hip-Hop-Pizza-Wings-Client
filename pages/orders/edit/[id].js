import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OrderForm from '../../../components/orders/OrderForm';
import { getSingleOrder } from '../../../api/orderData';

const EditOrderDetails = () => {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setOrder);
  }, [id]);

  return (
    <OrderForm orderObj={order} />
  );
};

export default EditOrderDetails;
