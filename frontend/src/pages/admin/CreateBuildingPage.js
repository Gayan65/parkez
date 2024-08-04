import React, { useEffect, useState } from "react";
import CreateBuildingForm from "../../components/CreateBuildingForm";

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
        {buildings && buildings.map((building) => <div> {building.name} </div>)}
      </div>
    </div>
  );
};

export default CreateBuildingPage;
