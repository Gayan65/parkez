import React from "react";
import { useTranslation } from "react-i18next";

const UserSelectRow = ({ i, email, status, clickedRow, setClickedRow }) => {
    //translation
    const { t } = useTranslation("usermanagement");

    const handleClick = () => {
        setClickedRow(i); // Update the clicked row index in the parent component
        console.log("clicked");
    };

    return (
        <>
            <tr
                key={i}
                onClick={handleClick}
                className={clickedRow === i ? "clicked" : ""}
            >
                <th scope="row">{i}</th>
                <td>{email}</td>
                <td>{status ? t("table.admin") : t("table.user")}</td>
            </tr>
        </>
    );
};

export default UserSelectRow;
