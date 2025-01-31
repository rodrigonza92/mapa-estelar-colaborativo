import React from "react";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import WelcomeSection from "./pages/home/WelcomeSection";
import RecentObservations from "./pages/home/RecentObservations";

function Home() {
  return (
    <div>
      <Header />
      <WelcomeSection />
      <RecentObservations />
      <Footer />
    </div>
  );
}

export default Home;
