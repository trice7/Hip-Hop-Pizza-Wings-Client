import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleOrder } from '../../../api/orderData';
import CloseOrderForm from '../../../components/orders/CloseOrderForm';

const CloseOrder = () => {
  const router = useRouter();
  const [order, setOrder] = useState({});
  const [change, setChange] = useState(true);

  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setOrder);
  }, [id, change]);

  return (
    <CloseOrderForm order={order} setChange={setChange} />
  );
};

export default CloseOrder;
