import React, { useEffect, useState } from "react";
import CreateBuildingForm from "../../components/CreateBuildingForm";
import BuildingView from "../../components/BuildingView";

const CreateBuildingPage = () => {
  //set state
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    //api call to get all buildings
    const fetchBuildings = async () => {
      const response = await fetch("/api/building/");
      const json = await response.json();

      if (response.ok) {
        setBuildings(json);
      }
    };

    fetchBuildings();
  }, []);

  return (
    <div>
      CreateBuildingPage
      <div>
        <CreateBuildingForm />
      </div>
      <div>
        {buildings &&
          buildings.map((building) => (
            <BuildingView
              key={building._id}
              name={building.name}
              number={building.number}
              image={building.image}
            />
          ))}
      </div>
    </div>
  );
};

export default CreateBuildingPage;
