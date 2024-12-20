import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Company {
  id: string;
  name: string;
  role: string;
  country: string;
  contact_person: string;
  email: string;
  telephone: string;
}

const CompanyDirectory = () => {
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

    // Subscribe to real-time changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'companies'
        },
        async (payload) => {
          console.log('Real-time update received:', payload);
          await fetchCompanies(); // Refresh the companies list when any change occurs
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      console.log("Cleaning up subscription");
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <div>Loading companies...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telephone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell className="font-medium">{company.name}</TableCell>
              <TableCell>{company.role}</TableCell>
              <TableCell>{company.country}</TableCell>
              <TableCell>{company.contact_person}</TableCell>
              <TableCell>{company.email}</TableCell>
              <TableCell>{company.telephone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyDirectory;