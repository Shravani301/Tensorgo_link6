import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    username: '',
    email: '',
    // Add more fields as needed
  });

  // Fetch the list of users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Replace with your actual API endpoint
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch user details when a user is selected
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (selectedUserId) {
        try {
          const response = await axios.get(`/api/users/${selectedUserId}`); // Replace with your actual API endpoint
          setUserDetails(response.data.user);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, [selectedUserId]);

  // Handle user selection
  const handleUserSelection = (userId) => {
    setSelectedUserId(userId);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setUpdatedUserDetails({
      ...updatedUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update user details
  const handleUpdateUser = async () => {
    try {
      await axios.put(`/api/users/${selectedUserId}`, updatedUserDetails); // Replace with your actual API endpoint
      // Optionally, fetch updated user details after the update
      setUserDetails(updatedUserDetails);
      // Reset the form fields
      setUpdatedUserDetails({
        username: '',
        email: '',
        // Reset more fields as needed
      });
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Display list of users */}
      <ul>
        {users.map((user) => (
          <li key={user._id} onClick={() => handleUserSelection(user._id)}>
            {user.username}
          </li>
        ))}
      </ul>

      {/* Display user details for the selected user */}
      {userDetails && (
        <div>
          <h3>User Details</h3>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
          {/* Add more user details as needed */}

          {/* Form for updating user details */}
          <h3>Update User</h3>
          <form>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={updatedUserDetails.username}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={updatedUserDetails.email}
                onChange={handleInputChange}
              />
            </label>
            {/* Add more fields as needed */}
            <button type="button" onClick={handleUpdateUser}>
              Update User
            </button>
          </form>
        </div>
      )}

      {/* Include more features for managing users and plans */}
    </div>
  );
};

export default AdminDashboard;
