import { useSession } from "@supabase/auth-helpers-react";
import CompanyForm from "@/components/CompanyForm";
import CompanyDirectory from "@/components/CompanyDirectory";
import UserProfile from "@/components/UserProfile";

const Index = () => {
  const session = useSession();

  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Freight Directory
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect with freight forwarders worldwide
            </p>
          </div>

          {session && (
            <>
              <div className="mb-12">
                <UserProfile />
              </div>
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Register Your Company</h2>
                <CompanyForm />
              </div>
            </>
          )}

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Company Directory</h2>
            <CompanyDirectory />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;