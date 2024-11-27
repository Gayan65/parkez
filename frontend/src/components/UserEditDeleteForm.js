import React from "react";

//translation
import { useTranslation } from "react-i18next";

const UserEditDeleteForm = ({ email, status }) => {
    //translation
    const { t } = useTranslation("usermanagement");
    return (
        <div>
            <form className="other-form">
                <table className="table">
                    <tbody>
                        <tr>
                            <th scope="row">{t("table.email")}</th>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <th scope="row">{t("table.status")}</th>
                            <td>
                                {status ? t("table.admin") : t("table.user")}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default UserEditDeleteForm;
