// const account = await stripe.accounts.create({
//     type: "express", // or "standard" or "custom"
//     country: "US",
//     email: sellerEmail,
//     capabilities: {
//       card_payments: { requested: true },
//       transfers: { requested: true },
//     },
//   });
  
//   // Save the seller's Stripe account ID in your database
//   await db.sellers.update({ stripeAccountId: account.id }, { where: { id: sellerId } });


// CREATE TABLE sellers (
//     id SERIAL PRIMARY KEY,
//     name TEXT NOT NULL,
//     email TEXT NOT NULL,
//     stripeAccountId TEXT NOT NULL, -- Stripe account ID
//     createdAt TIMESTAMP DEFAULT NOW(),
//     updatedAt TIMESTAMP DEFAULT NOW()
//   );


// const response = await fetch(`/api/seller/${sellerId}`);
// const seller = await response.json();
// const sellerStripeAccountId = seller.stripeAccountId;

// // Pass sellerStripeAccountId to the backend when creating a payment
// const paymentResponse = await fetch("/api/payment", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ paymentMethodId, sellerStripeAccountId, ...formData }),
// });