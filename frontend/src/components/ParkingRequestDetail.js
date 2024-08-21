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
  //Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(requestId);

    const action = e.nativeEvent.submitter.value;

    //handle approve button
    if (action === "approve") {
      console.log("approve");
    }

    //handle not approve button
    if (action === "notApprove") {
      console.log("not approve");
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
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
          <button type="submit" className="btn btn-primary" value={"approve"}>
            Approve
          </button>
          <button
            type="submit"
            className="btn btn-secondary"
            value={"notApprove"}
          >
            Not Approve
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParkingRequestDetail;
