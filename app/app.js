import express from 'express';
import dbConnect from '../config/dbConnect.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import userRoutes from '../routes/usersRoute.js';
import { globalErrorHandler , notFound} from '../middlewares/globalErrorHandler.js';
import productRoutes from '../routes/productRoute.js';
import categoryRouter from '../routes/categoryRoute.js';
import brandRoute from '../routes/brandRoute.js';
import colorRouter from '../routes/colorRoute.js';
import reviewRoutes from '../routes/reviewRoute.js';
import orderRouter from '../routes/orderRouter.js';

//Have access to variable in env file
dotenv.config();

//Database connection
dbConnect();
const app = express();

//stripe webhook
//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_5439c3d4f1a1e705183c90a34d2a59b710033f8037af94d11ccc879a2674b74f";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    
  } catch (err) {
    console.log("error:", err.message)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

//pass incoming data
app.use(express.json());

//routes
//mounting entire route inside app, according to pattern will redirect
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products/', productRoutes);
app.use('/api/v1/category/', categoryRouter);
app.use('/api/v1/brand/', brandRoute);
app.use('/api/v1/color/', colorRouter);
app.use('/api/v1/reviews/', reviewRoutes);
app.use('/api/v1/order/', orderRouter);

//error middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;