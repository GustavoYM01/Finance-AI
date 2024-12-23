import { loadStripe } from "@stripe/stripe-js";
import { createStripeCheckout } from "../create-stripe-checkout";

export const handleAcquirePlanClick = async () => {
  const { sessionId } = await createStripeCheckout();
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("Stripe publishable key not found");
  }
  const stripe = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  );
  if (!stripe) {
    throw new Error("Stripe not found");
  }
  await stripe.redirectToCheckout({ sessionId });
};