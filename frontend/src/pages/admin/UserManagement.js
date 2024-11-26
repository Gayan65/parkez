import React from "react";

//translation
import { useTranslation } from "react-i18next";

const UserManagement = () => {
    //translation
    const { t } = useTranslation("usermanagement");
    return (
        <div className="container mt-3">
            <h3 className="header mb-2"> {t("header")}</h3>
            <p className="paragraph text-justify">{t("para")}</p>
            <p className="paragraph text-justify fw-light fst-italic">
                {t("note")}
            </p>
            <form className="other-form">
                <div className="mb-3">
                    <label className="form-label label"> Search here.. </label>
                    <input type="text" className="form-control" />
                </div>
            </form>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">Admin status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
