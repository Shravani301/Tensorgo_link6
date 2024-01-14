// controllers/organizationController.js
const Organization = require('../models/org');

// Create a new organization
const createOrganization = async (req, res) => {
  const { orgName, adminId } = req.body;

  try {
    const newOrganization = new Organization({
      orgName,
      adminId,
    });

    await newOrganization.save();

    res.status(201).json(newOrganization);
  } catch (error) {
    console.error('Error creating organization:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all organizations
const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();

    res.status(200).json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createOrganization,
  getAllOrganizations,
};
