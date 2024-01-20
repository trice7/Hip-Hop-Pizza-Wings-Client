import { Button } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import Logo from '../components/assets/OIG.jpg';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Image
        src={Logo}
        alt="Hip Hop, Pizza, & Wings Logo"
      />
      <h1>Hello {user.first_name}! </h1>
      <p>Click the button below to logout!</p>
      {/* <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button> */}
      <Link passHref href="/orders">
        <Button className="app-button">View Orders</Button>
      </Link>
      <Link passHref href="/orders/new">
        <Button className="app-button">New Order</Button>
      </Link>
      <Link passHref href="/revenue">
        <Button className="app-button">View Revenue</Button>
      </Link>
    </div>
  );
}

export default Home;
