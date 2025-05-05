import React, { useEffect, useState } from 'react';
import api from './api';
import { GovBanner } from '@trussworks/react-uswds';

const App: React.FC = () => {
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
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default App;