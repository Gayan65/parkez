import React, { useEffect, useState } from "react";

//components
import CreateBuildingForm from "../../components/CreateBuildingForm";
import BuildingView from "../../components/BuildingView";

//custom hooks
import { useBuildingsContext } from "../../hooks/useBuildingsContext";
import Loader from "../../components/Loader";

//translation
import { useTranslation } from "react-i18next";

const CreateBuildingPage = () => {
    //set state
    const [loader, setLoader] = useState(false);
    const { buildings, dispatch } = useBuildingsContext();

    //translation
    const { t } = useTranslation("createbuildingpage");

    useEffect(() => {
        //api call to get all buildings
        const fetchBuildings = async () => {
            setLoader(true);
            const response = await fetch("/api/building/");
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_BUILDINGS", payload: json });
            }
            setLoader(false);
        };

        fetchBuildings();
    }, [dispatch]);

    return (
        <div className="container mt-3">
            <h3 className="header mb-2">{t("header")}</h3>
            <p className="paragraph text-justify mb-5">{t("para")}</p>
            <div className="row">
                <div className="col-md-6">
                    <CreateBuildingForm />
                </div>
                <div className="col-md-6 custom-building-view-container">
                    {buildings &&
                        buildings.map((building) => (
                            <BuildingView
                                key={building._id}
                                _id={building._id}
                                name={building.name}
                                number={building.number}
                                address={building.address}
                                image={building.image}
                                link={`/building/${building._id}`}
                            />
                        ))}
                </div>
            </div>
            {loader && <Loader />}
        </div>
    );
};

export default CreateBuildingPage;
