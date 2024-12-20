import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CompanyForm = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase.from("companies").insert([{
        name: String(formData.get("name")),
        role: String(formData.get("role")),
        bio: formData.get("bio")?.toString() || null,
        contact_person: formData.get("contact_person")?.toString() || null,
        email: formData.get("email")?.toString() || null,
        telephone: formData.get("telephone")?.toString() || null,
        address: formData.get("address")?.toString() || null,
        country: formData.get("country")?.toString() || null,
        user_id: session.user.id,
      }]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your company has been registered.",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error registering company:", error);
      toast({
        title: "Error",
        description: "Failed to register company. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div>
        <Label htmlFor="name">Company Name *</Label>
        <Input id="name" name="name" required />
      </div>

      <div>
        <Label htmlFor="role">Company Role *</Label>
        <Input id="role" name="role" placeholder="e.g., Freight Forwarder" required />
      </div>

      <div>
        <Label htmlFor="bio">Company Description</Label>
        <Textarea id="bio" name="bio" />
      </div>

      <div>
        <Label htmlFor="contact_person">Contact Person *</Label>
        <Input id="contact_person" name="contact_person" required />
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input type="email" id="email" name="email" required />
      </div>

      <div>
        <Label htmlFor="telephone">Telephone</Label>
        <Input id="telephone" name="telephone" />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" />
      </div>

      <div>
        <Label htmlFor="country">Country *</Label>
        <Input id="country" name="country" required />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register Company"}
      </Button>
    </form>
  );
};

export default CompanyForm;