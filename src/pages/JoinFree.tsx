import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const JoinFree = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleJoinFree = async () => {
    try {
      setIsLoading(true);
      
      // Get the current user's session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // If not logged in, redirect to auth page
        navigate("/auth");
        return;
      }

      // Check if user already has a company
      const { data: existingCompany } = await supabase
        .from('companies')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

      if (existingCompany) {
        toast({
          title: "Company already exists",
          description: "You already have a registered company.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      // Create new company with free plan
      const { error: insertError } = await supabase
        .from('companies')
        .insert({
          user_id: session.user.id,
          role: 'freight_forwarder',
          name: 'My Company', // This will be updated later in the company profile
        });

      if (insertError) throw insertError;

      toast({
        title: "Welcome aboard!",
        description: "Your free plan has been activated. Let's set up your company profile.",
      });

      // Redirect to company profile setup
      navigate("/");

    } catch (error) {
      console.error('Error joining free plan:', error);
      toast({
        title: "Error",
        description: "There was a problem joining the free plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl">Join Free Plan</CardTitle>
              <p className="text-muted-foreground">Get started with basic features</p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Plan Features:</h3>
                <ul className="space-y-3">
                  {[
                    "Basic company profile",
                    "View freight requests",
                    "Submit up to 5 quotes per month",
                    "Email notifications",
                    "Basic analytics",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="w-full text-lg py-6" 
                  onClick={handleJoinFree}
                  disabled={isLoading}
                >
                  {isLoading ? "Setting up your account..." : "Continue with Free Plan"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default JoinFree;