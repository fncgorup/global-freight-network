import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const resendApiKey = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { requestDetails, quoteDetails, recipientEmail } = await req.json()

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Freight Network <notifications@your-domain.com>',
        to: [recipientEmail],
        subject: 'New Freight Quote Available',
        html: `
          <h2>New Quote for Your Freight Request</h2>
          <p>A new quote has been submitted for your freight request:</p>
          <ul>
            <li>Origin: ${requestDetails.origin_country}</li>
            <li>Destination: ${requestDetails.destination_country}</li>
            <li>Quote Amount: ${quoteDetails.price} ${quoteDetails.currency}</li>
            <li>Valid for: ${quoteDetails.validity_days} days</li>
          </ul>
          <p>Log in to your account to view the full details and respond to this quote.</p>
        `
      })
    })

    const emailData = await emailResponse.json()

    return new Response(JSON.stringify(emailData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in send-quote-notification function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})