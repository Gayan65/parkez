import React, { useEffect, useState } from "react";

//translation
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader";

const UserManagement = () => {
    //translation
    const { t } = useTranslation("usermanagement");

    //states
    const [allUsers, setAllUsers] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        //api call
        const fetchAllUsers = async () => {
            setLoader(true);
            const response = await fetch("/api/user/all");
            const json = await response.json();

            if (!response.ok) {
                setLoader(false);
                setError(json.error);
            }

            if (response.ok) {
                setLoader(false);
                setAllUsers(json);
                console.log(json);
            }
        };

        fetchAllUsers();
    }, []);
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
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </div>
            </form>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">User status</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers &&
                        allUsers
                            .filter((item) => {
                                return search.toLocaleLowerCase() === ""
                                    ? item
                                    : item.email
                                          .toLocaleLowerCase()
                                          .includes(search);
                            })
                            .map((user, i) => (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.admin
                                            ? "Administrator"
                                            : "Normal User"}
                                    </td>
                                </tr>
                            ))}
                </tbody>
            </table>
            {error && <p className="error-forms">{error}</p>}
            {loader && <Loader />}
        </div>
    );
};

export default UserManagement;
