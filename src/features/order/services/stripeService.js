export const confirmStripePayment = async (stripe, elements, returnUrl) => {
  return await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: returnUrl,
    },
  });
};
