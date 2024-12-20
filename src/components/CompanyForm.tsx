import { Button } from "@/components/ui/button";
import CompanyFormFields from "./company/CompanyFormFields";
import { useCompanySubmit } from "./company/useCompanySubmit";

const CompanyForm = () => {
  const { handleSubmit, loading } = useCompanySubmit();

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <CompanyFormFields />
      <Button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register Company"}
      </Button>
    </form>
  );
};

export default CompanyForm;