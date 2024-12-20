import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useCompanySubmit = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to register a company.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      console.log("Checking for existing company...");
      const { data: existingCompany, error: checkError } = await supabase
        .from("companies")
        .select("id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking for existing company:", checkError);
        throw checkError;
      }

      if (existingCompany) {
        toast({
          title: "Error",
          description: "You already have a registered company.",
          variant: "destructive",
        });
        return;
      }

      console.log("Inserting new company...");
      const { error: insertError } = await supabase.from("companies").insert([{
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

      if (insertError) throw insertError;

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

  return { handleSubmit, loading };
};