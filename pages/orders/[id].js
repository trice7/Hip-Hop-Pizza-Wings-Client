import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OpenOrder from '../../components/orders/OpenOrder';
import { getSingleOrder } from '../../api/orderData';

const ViewOrder = () => {
  const router = useRouter();
  const [order, setOrder] = useState({});
  const [change, setChange] = useState(true);

  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setOrder);
  }, [id, change]);

  return (
    <OpenOrder orderObj={order} setChange={setChange} />
  );
};

export default ViewOrder;
