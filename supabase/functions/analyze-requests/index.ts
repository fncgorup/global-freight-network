import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get analytics data
    const { data: requestsData, error: requestsError } = await supabaseClient
      .from('freight_requests')
      .select('origin_country, destination_country, cargo_type, created_at')
      .order('created_at', { ascending: false })
      .limit(100)

    if (requestsError) throw requestsError

    // Process the data for analytics
    const analytics = {
      topOrigins: {},
      topDestinations: {},
      cargoTypes: {},
      requestsOverTime: {}
    }

    requestsData.forEach(request => {
      // Count origins
      analytics.topOrigins[request.origin_country] = (analytics.topOrigins[request.origin_country] || 0) + 1
      
      // Count destinations
      analytics.topDestinations[request.destination_country] = (analytics.topDestinations[request.destination_country] || 0) + 1
      
      // Count cargo types
      analytics.cargoTypes[request.cargo_type] = (analytics.cargoTypes[request.cargo_type] || 0) + 1
      
      // Group by month
      const month = new Date(request.created_at).toISOString().slice(0, 7)
      analytics.requestsOverTime[month] = (analytics.requestsOverTime[month] || 0) + 1
    })

    return new Response(JSON.stringify(analytics), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in analyze-requests function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})