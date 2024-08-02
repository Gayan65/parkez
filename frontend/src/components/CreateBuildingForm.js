import React, { useState } from "react";

const CreateBuildingForm = () => {
  //set states

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState("");

  //form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, number, image);
  };
  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Number</label>
        <input
          type="number"
          className="form-control"
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Image</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input type="submit" className="btn btn-primary" />
      </div>
    </form>
  );
};

export default CreateBuildingForm;
