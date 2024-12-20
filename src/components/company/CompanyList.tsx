import { Company } from "@/types/company";
import { CompanyCard } from "./CompanyCard";

interface CompanyListProps {
  companies: Company[];
}

export function CompanyList({ companies }: CompanyListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}