import React from 'react';

const Dashboard = ({ user }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.displayName}!</p>
    </div>
  );
};

export default Dashboard;
