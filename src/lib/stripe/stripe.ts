import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
const getStripePromise = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
  // if(!stripePromise && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY){

  // }
  if (!stripePromise && !!key) {
    console.log(stripePromise);
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};
export default getStripePromise;
