import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const RouteOptimizer = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleOptimize = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("optimize-route", {
        body: { origin, destination, cargoType },
      });

      if (error) throw error;

      setSuggestion(data.suggestion);
      toast({
        title: "Route Optimized",
        description: "Check out our suggested route below.",
      });
    } catch (error) {
      console.error("Error optimizing route:", error);
      toast({
        title: "Error",
        description: "Failed to optimize route. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Route Optimizer</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleOptimize} className="space-y-4">
          <div>
            <Input
              placeholder="Origin Country"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Destination Country"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Cargo Type"
              value={cargoType}
              onChange={(e) => setCargoType(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Optimizing..." : "Optimize Route"}
          </Button>

          {suggestion && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Suggested Route:</h3>
              <p className="whitespace-pre-wrap">{suggestion}</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default RouteOptimizer;