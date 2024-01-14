// PlanList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlanList = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/saas-plans');
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
        setError('Error fetching plans. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Available Plans</h2>
      <ul>
        {plans.map((plan) => (
          <li key={plan._id}>
            {plan.name} - {plan.description} - ${plan.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanList;
