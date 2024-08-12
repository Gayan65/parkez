import React from "react";

const CreateParkingForm = () => {
    return (
        <div>
            <form>
                <div className="mb-3">
                    <label className="form-label">Parking Lot Number</label>
                    <input type="number" className="form-control" />
                </div>

                <div className="mb-3">
                    <input type="submit" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default CreateParkingForm;
