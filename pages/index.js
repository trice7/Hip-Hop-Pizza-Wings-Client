import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import Logo from '../components/assets/OIG.jpg';

function Home() {
  const { user } = useAuth();
  console.warn(user);
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
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
