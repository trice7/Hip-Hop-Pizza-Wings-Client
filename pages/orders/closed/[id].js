import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleOrder } from '../../../api/orderData';
import ClosedOrder from '../../../components/orders/ClosedOrder';

const ViewOrder = () => {
  const router = useRouter();
  const [order, setOrder] = useState({});

  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setOrder);
  }, [id]);

  return (
    <ClosedOrder order={order} />
  );
};

export default ViewOrder;
