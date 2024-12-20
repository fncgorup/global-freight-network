import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const JoinFree = () => {
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
                <Button className="w-full text-lg py-6">
                  Continue with Free Plan
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