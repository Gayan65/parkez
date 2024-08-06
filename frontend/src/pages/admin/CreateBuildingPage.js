import React, { useEffect } from "react";
import CreateBuildingForm from "../../components/CreateBuildingForm";
import BuildingView from "../../components/BuildingView";
import { useBuildingsContext } from "../../hooks/useBuildingsContext";

const CreateBuildingPage = () => {
  //set state
  //const [buildings, setBuildings] = useState([]);
  const { buildings, dispatch } = useBuildingsContext();

  useEffect(() => {
    //api call to get all buildings
    const fetchBuildings = async () => {
      const response = await fetch("/api/building/");
      const json = await response.json();

      if (response.ok) {
        //setBuildings(json);
        dispatch({ type: "SET_BUILDINGS", payload: json });
      }
    };

    fetchBuildings();
  }, [dispatch]);

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
              address={building.address}
              image={building.image}
            />
          ))}
      </div>
    </div>
  );
};

export default CreateBuildingPage;
