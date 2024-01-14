import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuperAdminDashboard = () => {
  const [organizations, setOrganizations] = useState([]);
  const [plans, setPlans] = useState([]);
  const [usageData, setUsageData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch organizations, plans, and usage data when the component mounts
    const fetchData = async () => {
      try {
        // Fetch organizations
        const organizationsResponse = await axios.get('/api/organizations');
        setOrganizations(organizationsResponse.data);

        // Fetch plans
        const plansResponse = await axios.get('/api/plans');
        setPlans(plansResponse.data);

        // Fetch usage data
        const usageDataResponse = await axios.get('/api/usageData');
        setUsageData(usageDataResponse.data);
      } catch (error) {
        console.error('Error fetching data for SuperAdminDashboard:', error);
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Super Admin Dashboard</h2>

      <section>
        <h3>Organizations</h3>
        {/* Display a list of organizations */}
        <ul>
          {organizations.map((organization) => (
            <li key={organization.id}>{organization.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Plans</h3>
        {/* Display a list of plans */}
        <ul>
          {plans.map((plan) => (
            <li key={plan.id}>{plan.name} - {plan.price}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Usage Data</h3>
        {/* Display usage data */}
        <ul>
          {usageData.map((data) => (
            <li key={data.id}>{data.organization} - {data.usage}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SuperAdminDashboard;
