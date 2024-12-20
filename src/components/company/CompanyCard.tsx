import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building2, Mail, Phone, MapPin } from "lucide-react";
import { Company } from "@/types/company";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-4">
        {company.logo_url ? (
          <img
            src={company.logo_url}
            alt={`${company.name} logo`}
            className="h-12 w-12 object-contain"
          />
        ) : (
          <Building2 className="h-12 w-12 text-muted-foreground" />
        )}
        <div>
          <h3 className="text-lg font-semibold">{company.name}</h3>
          <p className="text-sm text-muted-foreground">{company.role}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {company.bio && <p className="text-sm">{company.bio}</p>}
        <div className="space-y-1">
          {company.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4" />
              <span>{company.email}</span>
            </div>
          )}
          {company.telephone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>{company.telephone}</span>
            </div>
          )}
          {company.address && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{company.address}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}