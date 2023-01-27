const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const userSession = await getSession({ req });
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        customer_email: userSession ? userSession.user.email : undefined,
        payment_method_types: ["card", "klarna"],
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries: ["SE", "DK", "NO"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "sek",
              },
              display_name: "Free shipping (Postnord)",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 4900,
                currency: "sek",
              },
              display_name: "Budbee",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 2,
                },
                maximum: {
                  unit: "business_day",
                  value: 3,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 5900,
                currency: "sek",
              },
              display_name: "DHL Express",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 2,
                },
              },
            },
          },
        ],
        line_items: req.body.cartItems.map((product) => {
          let imgArray = [];
          imgArray.push(product.img1);
          return {
            price_data: {
              currency: "sek",
              unit_amount: product.price * 100,
              product_data: {
                name: product.name,
                images: imgArray,
                metadata: {
                  selectedSwitch: product.selectedSwitch,
                  id: product._id,
                },
              },
            },
            quantity: product.quantity,
          };
        }),
        mode: "payment",
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.json({ id: session.id });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
