import React, { useState } from "react";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Upload } from "./pages/Upload";
import { FarmMap } from "./pages/FarmMap";
import { PlantInventory } from "./pages/PlantInventory";
import { Analytics } from "./pages/Analytics";
import { Profile } from "./pages/Profile";
import { ROUTES } from "./utils/constants";

function App() {
  const [currentPage, setCurrentPage] = useState(ROUTES.DASHBOARD);

  const renderPage = () => {
    switch (currentPage) {
      case ROUTES.DASHBOARD:
        return <Dashboard onNavigate={setCurrentPage} />;
      case ROUTES.UPLOAD:
        return <Upload />;
      case ROUTES.MAP:
        return <FarmMap onNavigate={setCurrentPage} />;
      case ROUTES.INVENTORY:
        return <PlantInventory />;
      case ROUTES.ANALYTICS:
        return <Analytics />;
      case ROUTES.PROFILE:
        return <Profile />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
