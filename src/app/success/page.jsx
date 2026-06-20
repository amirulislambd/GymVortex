import TransactionSuccessUI from '@/components/classes/TransactionSuccessUI'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, customer_details, metadata, amount_total, id } = session;

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    try {
      await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          className: metadata?.className || "MOBILITY REPAIR", 
          priceAmount: amount_total / 100, 
          userEmail: customer_details?.email,
          classId: metadata?.classId || "", 
          stripeSessionId: id,
        }),
      });
      console.log("Booking successfully synced to Express Backend!");
    } catch (error) {
      console.error("Express API Call Error:", error);
    }

    return (
      <TransactionSuccessUI 
        securityHash={id}
        className={metadata?.className || "MOBILITY REPAIR"}
        priceAmount={amount_total / 100}
        userEmail={customer_details?.email}
        createdAt={new Date().toISOString()} 
      />
    )
  }
}