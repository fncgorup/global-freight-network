import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Company } from "@/types/company";
import { CompanyList } from "./company/CompanyList";

export default function CompanyDirectory() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      console.log("Fetching companies...");
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .order("name");

      if (error) {
        console.error("Error fetching companies:", error);
        throw error;
      }
      
      console.log("Companies fetched:", data);
      setCompanies(data || []);
    } catch (error) {
      console.error("Error in fetchCompanies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();

    const channel = supabase
      .channel("companies-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "companies",
        },
        async (payload) => {
          console.log('Real-time update received:', payload);
          await fetchCompanies();
        }
      )
      .subscribe();

    return () => {
      console.log("Cleaning up subscription");
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <div>Loading companies...</div>;
  }

  return (
    <div className="space-y-6">
      <CompanyList companies={companies} />
    </div>
  );
}