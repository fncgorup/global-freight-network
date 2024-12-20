import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Freight Directory</h1>
          <p className="text-xl text-muted-foreground">
            Connect with freight forwarders worldwide
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;