import React from "react";

const UserEditDeleteForm = ({ email, status }) => {
    return (
        <div>
            <form className="other-form">
                <div className="col-md-4 mb-3">
                    <label className="form-label label"> {email} </label>
                </div>
            </form>
        </div>
    );
};

export default UserEditDeleteForm;
