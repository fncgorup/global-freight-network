import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const MembershipPlans = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-lg text-muted-foreground">
            Select the perfect plan for your freight forwarding needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Free Plan</CardTitle>
              <CardDescription>Get started with basic features</CardDescription>
              <div className="mt-4 flex items-center justify-center text-3xl font-bold">
                <DollarSign className="h-6 w-6" />
                <span>0</span>
                <span className="text-lg text-muted-foreground ml-2">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg py-6" variant="outline" asChild>
                <Link to="/join-free">Join Free Plan</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="relative overflow-hidden border-2 border-primary hover:border-primary/70 transition-colors bg-primary/5">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm rounded-bl-lg">
              Popular
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Premium Plan</CardTitle>
              <CardDescription>
                Advanced features for growing businesses
              </CardDescription>
              <div className="mt-4 flex items-center justify-center text-3xl font-bold">
                <DollarSign className="h-6 w-6" />
                <span>49.99</span>
                <span className="text-lg text-muted-foreground ml-2">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {[
                  "Everything in Free Plan",
                  "Unlimited quotes",
                  "Priority listing in directory",
                  "Advanced analytics dashboard",
                  "AI-powered route optimization",
                  "24/7 priority support",
                  "Custom company branding",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg py-6">Join Premium Plan</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlans;