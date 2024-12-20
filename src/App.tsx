import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import JoinFree from "@/pages/JoinFree";
import Membership from "@/pages/Membership";
import UserProfile from "@/components/UserProfile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/join-free" element={<JoinFree />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/edit-profile" element={<UserProfile />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;