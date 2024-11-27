import React, { useEffect, useState } from "react";

import { useUsersContext } from "../../hooks/useUsersContext";

//translation
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader";
import UserSelectRow from "../../components/UserSelectRow";
import UserEditDeleteForm from "../../components/UserEditDeleteForm";

const UserManagement = () => {
    //translation
    const { t } = useTranslation("usermanagement");

    const { users, dispatch } = useUsersContext();

    //states
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [loader, setLoader] = useState(false);
    const [clickedRow, setClickedRow] = useState(null); // Central state for clicked row

    useEffect(() => {
        //api call
        const fetchAllUsers = async () => {
            setLoader(true);
            try {
                const response = await fetch("/api/user/all");

                // Check if the response is JSON or handle error safely
                let json;
                try {
                    json = await response.json();
                } catch (err) {
                    throw new Error("Invalid JSON response from the server.");
                }

                if (!response.ok) {
                    // Handle error from the server
                    throw new Error(json.error || "Failed to fetch users.");
                }

                // Success: Dispatch users to context
                dispatch({ type: "SET_USERS", payload: json });
                console.log(json);
            } catch (err) {
                // Catch and set error in state
                setError(err.message || "An unexpected error occurred.");
            } finally {
                // Always stop the loader
                setLoader(false);
            }
        };

        fetchAllUsers();
    }, [dispatch]);
    return (
        <div className="container mt-3">
            <h3 className="header mb-2"> {t("header")}</h3>
            <p className="paragraph text-justify">{t("para")}</p>
            <p className="paragraph text-justify fw-light fst-italic">
                {t("note")}
            </p>
            <div className="row">
                <div className="col-md-4">
                    {" "}
                    <form className="other-form">
                        <div className="mb-3">
                            <label className="form-label label">
                                {t("search_label")}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                placeholder={t("search_palce")}
                            />
                        </div>
                    </form>
                    {clickedRow && (
                        <UserEditDeleteForm
                            email={clickedRow.email}
                            status={clickedRow.admin}
                            id={clickedRow._id}
                        />
                    )}
                </div>
                <div className="col-md-8 custom-user-container">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">{t("table.email")}</th>
                                <th scope="col">{t("table.status")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&
                                users
                                    .filter((item) => {
                                        return search.toLocaleLowerCase() === ""
                                            ? item
                                            : item.email
                                                  .toLocaleLowerCase()
                                                  .includes(search);
                                    })
                                    .map((user, i) => (
                                        <UserSelectRow
                                            key={i}
                                            i={i + 1}
                                            email={user.email}
                                            status={user.admin}
                                            clickedRow={clickedRow}
                                            onRowClick={() =>
                                                setClickedRow(user)
                                            }
                                        />
                                    ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {error && <p className="error-forms">{error}</p>}
            {loader && <Loader />}
        </div>
    );
};

export default UserManagement;
