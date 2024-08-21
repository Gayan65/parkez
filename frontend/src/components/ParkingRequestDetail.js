import React, { useState } from "react";

const ParkingRequestDetail = ({
  email,
  building,
  apartment,
  room,
  parkingLot,
  requestId,
  onStatusChange, //This function links with PendingRequest.js file. which has two parameters (id, status)
}) => {
  //Approving or Not approving comments
  const [comment, setComment] = useState("");

  //Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(requestId);

    const action = e.nativeEvent.submitter.value;

    //handle approve button
    if (action === "approve") {
      console.log("approve", comment);
      onStatusChange(requestId, "approved", comment);
    }

    //handle not approve button
    if (action === "decline") {
      console.log("decline", comment);
      onStatusChange(requestId, "declined", comment);
    }
  };

  return (
    <div className="card">
      <div className="card-header"> {building} </div>
      <div className="card-body">
        <h5 className="card-title"> {email} </h5>
        <p className="card-text">Apartment number {apartment}</p>
        <p className="card-text">Room number {room}</p>
        <p className="card-text">Requested parking lot number {parkingLot}</p>
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control"
            rows="2"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button type="submit" className="btn btn-primary" value={"approve"}>
            Approve
          </button>
          <button type="submit" className="btn btn-secondary" value={"decline"}>
            Decline
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParkingRequestDetail;
