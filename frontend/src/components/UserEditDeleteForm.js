import React, { useEffect, useState } from "react";

//translation
import { useTranslation } from "react-i18next";
import Loader from "./Loader";

const UserEditDeleteForm = ({ email, id, refreshUsers }) => {
    //translation
    const { t } = useTranslation("usermanagement");

    //state
    const [error, setError] = useState("");
    const [fetchedUser, setFetchedUser] = useState(null);
    const [loader, setLoader] = useState(false);

    //api call
    const updateUser = async (updatedUserObj) => {
        try {
            const response = await fetch(`/api/user/update_user_status/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUserObj),
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
                console.log(json);
            } else {
                setError("");
                setFetchedUser(json); // Update fetchedUser with the new data
                if (refreshUsers) refreshUsers(); // Trigger refresh
                // dispatch({ type: "SET_A_USER", payload: json });
            }
        } catch (error) {
            console.error("Update failed:", error);
            setError("Failed to update user.");
        }
    };

    const handleUserStatusClick = (e) => {
        e.preventDefault(); // Prevent form submission
        const updatedUserObj = {
            admin: !fetchedUser?.admin, // Toggle admin status
        };
        updateUser(updatedUserObj);
    };

    const handleDeleteClick = async (e) => {
        e.preventDefault(); // Prevent form submission
        setLoader(true);
        const response = await fetch(`/api/user/delete_user/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setLoader(false);
            setError(json.error);
        }

        if (response.ok) {
            setLoader(false);
            setError("");
            if (refreshUsers) refreshUsers(); // Trigger refresh
        }
    };

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    setLoader(true);
                    const response = await fetch(`/api/user/get_user/${id}`);
                    const json = await response.json();

                    if (!response.ok) {
                        setLoader(false);
                        setError(json.error);
                    } else {
                        setLoader(false);
                        setError("");
                        setFetchedUser(json[0]);
                    }
                } catch (error) {
                    console.error("Fetch user failed:", error);
                    setError("Failed to fetch user.");
                }
            };

            fetchUser();
        }
    }, [id]);

    useEffect(() => {
        if (fetchedUser) {
            console.log("Fetched user:", fetchedUser);
        }
    }, [fetchedUser]);

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
                                {fetchedUser?.admin
                                    ? t("table.admin")
                                    : t("table.user")}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-md-6 ">
                        <button
                            className="btn btn-primary"
                            onClick={handleUserStatusClick}
                        >
                            {fetchedUser?.admin
                                ? t("make_as_user")
                                : t("make_as_an_admin")}
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button
                            className="btn btn-danger"
                            onClick={handleDeleteClick}
                        >
                            {t("delete_user")}
                        </button>
                    </div>
                </div>
            </form>
            {error && <p className="error-message">{error}</p>}
            {loader && <Loader />}
        </div>
    );
};

export default UserEditDeleteForm;
