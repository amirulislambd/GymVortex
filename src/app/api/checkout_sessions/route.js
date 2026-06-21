import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';

export async function POST(req) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // 1. Receive the dynamic dynamic data from the request body
    const { className, classImage, PriceAmount, classId } = await req.json();

    // 2. Create Stripe Checkout Session dynamically
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: className,
              images: classImage ? [classImage] : [],
            },
            unit_amount: PriceAmount * 100, // Convert dollars to cents (Stripe requirement)
          },
          quantity: 1,
        },
      ],
      mode: "payment", // Set to 'payment' for one-time purchases
      metadata: {
        className: className,
        classId: classId || "", // Pass the MongoDB class ID to track in the webhook/success page
        classImage: classImage,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    // 3. Return the checkout URL to the frontend for redirection
    return NextResponse.json({ url: session.url })

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}