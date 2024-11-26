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
        </div>
    );
};

export default UserManagement;
