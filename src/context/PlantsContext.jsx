import { createContext, useContext, useState } from "react";

const PlantsContext = createContext(null);

export const PlantsProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  

 const addPlant = (plant) => {
  console.log("🧠 Context received plant:", plant);
  setPlants((prev) => [...prev, plant]);
};


  return (
    <PlantsContext.Provider
      value={{
        plants,
        selectedPlant,
        setSelectedPlant,
        addPlant,
      }}
    >
      {children}
    </PlantsContext.Provider>
  );
};

export const usePlants = () => {
  const context = useContext(PlantsContext);
  if (!context) {
    throw new Error("usePlants must be used inside PlantsProvider");
  }
  return context;
};
