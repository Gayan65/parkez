import React from "react";
import { useTranslation } from "react-i18next";

const UserSelectRow = ({ i, email, status, clickedRow, onRowClick }) => {
    //translation
    const { t } = useTranslation("usermanagement");

    return (
        <>
            <tr
                key={i}
                onClick={onRowClick} // Call parent's handler
                className={clickedRow?.email === email ? "clicked" : ""}
            >
                <th scope="row">{i}</th>
                <td>{email}</td>
                <td>{status ? t("table.admin") : t("table.user")}</td>
            </tr>
        </>
    );
};

export default UserSelectRow;
