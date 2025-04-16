import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const DRUPAL_API_URL = process.env.NEXT_PUBLIC_DRUPAL_API_URL;

export default function Profile() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      router.push('/login');
    } else {
      setToken(accessToken);
      fetchUser(accessToken);
    }
  }, [router]);

  const fetchUser = async (accessToken) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_API_URL}/api/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user data');

      const data = await response.json();

      const userData = data[0]; // your API returns an array with 1 object

      if (userData && userData.name) {
        setUser(userData);
      } else {
        throw new Error('Invalid user data');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    router.push('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <p><strong>Welcome</strong> {user.name}</p>
            <button onClick={logout} style={styles.button}>Logout</button>
          </>
        ) : (
          <p>Failed to load user data.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f0f4f8',
  },
  card: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px',
    fontFamily: 'sans-serif',
  },
  heading: {
    marginBottom: '1rem',
    textAlign: 'center',
  },
  button: {
    marginTop: '1.5rem',
    padding: '0.75rem',
    background: '#e00',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
