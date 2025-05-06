import React, { useEffect, useState } from 'react';
import api from './api';
import { GovBanner } from '@trussworks/react-uswds';

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<any | null>(null);
  const [expenses, setExpenses] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get('/api/expenses/user', { withCredentials: true })
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch expenses');
      });
  }, []);

  useEffect(() => {
    const token = import.meta.env.VITE_DEV_BEARER_TOKEN;

    if (!token) {
      api
        .get('/api/me', { withCredentials: true })
        .then((response) => {
          setAuthenticated(true);
          setProfile(response.data);
        })
        .catch((err) => {
          console.error(err);
          setAuthenticated(false);
        });
    } else {
      // if token is defined then we are "signed in"
      setAuthenticated(true);
      setProfile({
        "firstName": "test",
        "lastName": "tester",
        "userName": "test",
        "email": "test@example.com"
      })
    }
  }, []);

  const logout = () => {
    api
      .post('/logout', {}, { withCredentials: true })
      .then((response) => {
        const logoutUri = response.headers['location'];

        if (!logoutUri) {
          throw new Error('API Gateway responded with null logout URI');
        }

        window.location.href = logoutUri;
      })
      .catch((err) => {
        console.error(err);
        setError('Logout failed');
      });
  };

  return (
    <div>
      <GovBanner />
      <h1>Expense Service Response: /expenses/user</h1>
      {expenses ? (
        <pre>{JSON.stringify(expenses, null, 2)}</pre>
      ) : error ? (
        <p>Error :(</p>
      ) : (
        <p>Loading...</p>
      )}
      {/* Show and hide these depending on if the user is signed in or not */}
      <h1>User Profile Response: /expenses/user</h1>
      {authenticated ? (
        <div>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <a href='/login'>
          <button>Login</button>
        </a>
      )}      
    </div>
  );
};

export default App;