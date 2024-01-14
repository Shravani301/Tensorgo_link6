// controllers/saasPlanController.js
const SaasPlan = require('../models/saasPlan');

const getAllPlans = async (req, res) => {
  try {
    const plans = await SaasPlan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the plan by ObjectId
    const plan = await SaasPlan.findById(id);

    // Check if the plan exists
    if (!plan) {
      console.log('Plan not found.');
      return res.status(404).json({ error: 'Plan not found.' });
    }

    res.status(200).json(plan);
  } catch (error) {
    console.error('Error retrieving plan by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/*const createPlan = async (req, res) => {
  const { planName,description,price,features,duration } = req.body;
    const newPlan = new SaasPlan({ planName,description,price,features,duration });
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};*/
const createPlan = async (req, res) => {
  try {
    const { planName, description, price, features, duration } = req.body;

    // Log the values for debugging
    console.log('planName:', planName);
    console.log('price:', price);
    console.log('price.amount:', price.amount);
    console.log('price.currency:', price.currency);

    // Check if required fields are present
    if (!planName) {
      console.log('planName is falsy');
    }
    if (!price) {
      console.log('price is falsy');
    }
    if (!price.amount) {
      console.log('price.amount is falsy');
    }
    if (!price.currency) {
      console.log('price.currency is falsy');
    }

    const newPlan = new SaasPlan({ planName, description, price, features, duration });
    const savedPlan = await newPlan.save();

    res.status(201).json(savedPlan);
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  


/*const updatePlan = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const updatedPlan = await SaasPlan.findByIdAndUpdate(
      id,
      { name, price },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
*/
const updatePlan = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you're passing the planId in the URL params
    
    const { planName, description, price, features, duration } = req.body;

    // Check if required fields are present
    if (!planName || !price || !price.amount || !price.currency) {
      console.log('Invalid request. Missing required fields.');
      return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
    }

    // Check if the plan with the specified ID exists
    const existingPlan = await SaasPlan.findById(id);
    
    if (!existingPlan) {
      console.log('Plan not found.');
      return res.status(404).json({ error: 'Plan not found.' });
    }

    // Update the plan properties
    existingPlan.planName = planName;
    existingPlan.description = description;
    existingPlan.price = price;
    existingPlan.features = features;
    existingPlan.duration = duration;

    // Save the updated plan
    const updatedPlan = await existingPlan.save();

    res.status(200).json(updatedPlan);
  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deletePlan = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlan = await SaasPlan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    res.json(deletedPlan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllPlans,getPlanById, createPlan, updatePlan, deletePlan };
