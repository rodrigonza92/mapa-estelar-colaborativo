import React from "react";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import WelcomeSection from "./pages/WelcomeSection";
import FeaturedObjects from "./pages/home/FeaturedObjects";
import RecentObservations from "./pages/home/RecentObservations";

function Home() {
  return (
    <div>
      <Header />
      <WelcomeSection />
      <FeaturedObjects />
      <RecentObservations />
      <Footer />
    </div>
  );
}

export default Home;
