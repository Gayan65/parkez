import React from "react";
import { Link } from "react-router-dom";

const BuildingView = ({ name, number, image, address, link }) => {
  return (
    <div className="card mb-3 container" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          {/* add this img tag later <img src="..." className="img-fluid rounded-start" alt="..." /> */}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              {" "}
              {name} {number}{" "}
            </h5>
            <p className="card-text">{address}</p>
            <Link to={link}> View </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingView;