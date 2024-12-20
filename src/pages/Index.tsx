import { useSession } from "@supabase/auth-helpers-react";
import CompanyForm from "@/components/CompanyForm";
import CompanyDirectory from "@/components/CompanyDirectory";
import RouteOptimizer from "@/components/RouteOptimizer";

const Index = () => {
  const session = useSession();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Global Freight Network</h1>
      
      {session?.user && (
        <div className="mb-8">
          <CompanyForm />
        </div>
      )}

      <div className="mb-8">
        <RouteOptimizer />
      </div>

      <div>
        <CompanyDirectory />
      </div>
    </div>
  );
};

export default Index;