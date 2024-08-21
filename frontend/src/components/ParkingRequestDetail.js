import React from "react";

//comment field need to be added before approving
const ParkingRequestDetail = ({
  email,
  building,
  apartment,
  room,
  parkingLot,
  requestId,
}) => {
  //Approve button
  const handleApprove = () => {
    console.log(requestId);
  };

  return (
    <div className="card">
      <div className="card-header"> {building} </div>
      <div className="card-body">
        <h5 className="card-title"> {email} </h5>
        <p className="card-text">Apartment number {apartment}</p>
        <p className="card-text">Room number {room}</p>
        <p className="card-text">Requested parking lot number {parkingLot}</p>

        <button className="btn btn-primary" onClick={handleApprove}>
          Approve
        </button>
        <button className="btn btn-secondary">Not Approve</button>
      </div>
    </div>
  );
};

export default ParkingRequestDetail;
