const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const saasPlanRoutes = require('./routes/saasPlanRoutes');
const userRoutes = require('./routes/userRoutes');
const orgRoutes = require('./routes/orgRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/carItemRoutes');
const productRoutes = require('./routes/productRoutes');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', saasPlanRoutes);
app.use('/api', userRoutes);
app.use('/api', orgRoutes);
app.use('/api', orderRoutes);
app.use('/api', cartRoutes);
app.use('/api', productRoutes);

// Stripe payment endpoint
app.post('/api/payment', async (req, res) => {
  try {
    const { amount, currency, paymentMethodId } = req.body;

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    // Send the client secret to confirm the payment on the client side
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
