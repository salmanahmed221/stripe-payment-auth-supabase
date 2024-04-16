import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
  apiVersion: "2024-04-10",
});

export async function POST(request: NextRequest) {
  console.log("calling post method");
  const body = await request.json();
  console.log(body.title);
  try {
    if (Object.keys(body).length > 0) {
      console.log("body: ", Object.keys(body).length);
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1NP0dtGJGYeKStG3vBRlli1o" },
          { shipping_rate: "shr_1NP0cxGJGYeKStG3e9hbREBP" },
        ],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: body.title,
                images: [body.image],
                description: `${body.description}`,
              },
              unit_amount: body.price * 100,
            },
            quantity: body.quantity,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
          },
        ],

        phone_number_collection: {
          enabled: true,
        },
        success_url: `${request.headers.get("origin")}/success`,
        cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      });
      console.log("session", session);
      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ message: "No Data found" });
    }
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}
