import Navbar from "@/components/Navbar";
import MembershipPlans from "@/components/MembershipPlans";

const Membership = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <MembershipPlans />
      </main>
    </div>
  );
};

export default Membership;