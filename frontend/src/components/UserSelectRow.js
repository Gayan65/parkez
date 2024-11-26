import React from "react";
import { useTranslation } from "react-i18next";

const UserSelectRow = ({ i, email, status }) => {
    //translation
    const { t } = useTranslation("usermanagement");

    return (
        <>
            <tr key={i}>
                <th scope="row">{i}</th>
                <td>{email}</td>
                <td>{status ? t("table.admin") : t("table.user")}</td>
            </tr>
        </>
    );
};

export default UserSelectRow;
