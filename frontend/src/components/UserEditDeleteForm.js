import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import {
    FaEnvelope,
    FaUserTie,
    FaArrowDownShortWide,
    FaTrashCan,
} from "react-icons/fa6";
import { FaParking } from "react-icons/fa";

//translation
import { useTranslation } from "react-i18next";
import Loader from "./Loader";

//sweet alerts
import Swal from "sweetalert2";

const UserEditDeleteForm = ({ userEmail, id, refreshUsers }) => {
    //translation
    const { t } = useTranslation("usermanagement");

    //logged user
    const { user } = useAuthContext();

    //state
    const [error, setError] = useState("");
    const [fetchedUser, setFetchedUser] = useState(null);
    const [loader, setLoader] = useState(false);
    const [deactivate, setDeactivate] = useState(false);
    const [parking, setParking] = useState([]);

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
                setDeactivate(false);
                Swal.fire({
                    title: t("fire7.title"),
                    text: t("fire7.text"),
                    icon: "error",
                    confirmButtonText: t("fire7.btn"),
                });
            } else {
                setError("");
                setFetchedUser(json); // Update fetchedUser with the new data
                setDeactivate(false);
                if (refreshUsers) refreshUsers(); // Trigger refresh
                Swal.fire({
                    title: t("fire8.title"),
                    text: t("fire8.text"),
                    icon: "success",
                    confirmButtonText: t("fire8.btn"),
                });
                // dispatch({ type: "SET_A_USER", payload: json });
            }
        } catch (error) {
            console.error("Update failed:", error);
            setError("Failed to update user.");
        }
    };

    const handleUserStatusClick = (e) => {
        e.preventDefault(); // Prevent form submission

        Swal.fire({
            title: t("fire5.title"),
            text: t("fire5.text"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: t("fire5.btn1"),
            cancelButtonText: t("fire5.btn2"),
        }).then((result) => {
            if (result.isConfirmed) {
                // Prevent self-status-change
                if (userEmail === user.email) {
                    setError("You cannot make changes to your own account.");
                    Swal.fire({
                        title: t("fire6.title"),
                        text: t("fire6.text"),
                        icon: "error",
                        confirmButtonText: t("fire6.btn"),
                    });
                    return;
                }

                const updatedUserObj = {
                    admin: !fetchedUser?.admin, // Toggle admin status
                };
                updateUser(updatedUserObj);
            }
        });
    };

    const handleDeleteClick = async (e) => {
        e.preventDefault(); // Prevent form submission

        Swal.fire({
            title: t("fire1.title"),
            text: t("fire1.text"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: t("fire1.btn1"),
            cancelButtonText: t("fire1.btn2"),
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Prevent self-deletion
                if (userEmail === user.email) {
                    setError("You cannot delete your own account.");
                    Swal.fire({
                        title: t("fire2.title"),
                        text: t("fire2.text"),
                        confirmButtonText: t("fire2.btn"),
                        icon: "error",
                    });
                    return;
                }

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

                    Swal.fire({
                        title: t("fire3.title"),
                        text: t("fire2.text"),
                        confirmButtonText: t("fire3.btn"),
                        icon: "error",
                    });
                }

                if (response.ok) {
                    setLoader(false);
                    setError("");
                    if (refreshUsers) refreshUsers(); // Trigger refresh
                    setDeactivate(true);
                    Swal.fire({
                        title: t("fire4.title"),
                        text: t("fire4.text"),
                        confirmButtonText: t("fire4.btn"),
                        icon: "success",
                    });
                }
            }
        });
    };

    //api for get all parking lots belong to email
    const fetchAllParingSlots = async (email) => {
        const userData = {
            user: email,
        };
        try {
            setLoader(true);
            const response = await fetch("/api/park/parking_lots_by_email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            }
            if (response.ok) {
                setError("");
                setDeactivate(false);
                setParking(json);
                console.log("this is building ", json);
                console.log("this is parking", parking);
            }
        } catch (error) {
            console.error("Fetch user failed:", error);
            setError("Failed to fetch user.");
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await fetch(`/api/user/get_user/${id}`);
                    const json = await response.json();

                    if (!response.ok) {
                        setError(json.error);
                    } else {
                        setError("");
                        setDeactivate(false);
                        setFetchedUser(json[0]);
                    }
                } catch (error) {
                    console.error("Fetch user failed:", error);
                    setError("Failed to fetch user.");
                }
            };

            fetchUser();
        }

        if (userEmail) {
            fetchAllParingSlots(userEmail);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, userEmail]);

    useEffect(() => {
        if (fetchedUser) {
            console.log("Fetched user:", fetchedUser);
        }
    }, [fetchedUser]);

    return (
        <div className="mb-5">
            <form className="other-form">
                <table className="table">
                    <tbody>
                        <tr>
                            <th scope="row ">
                                <FaEnvelope className="me-2" />
                                {t("table.email")}
                            </th>
                            <td>{userEmail}</td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <FaUserTie className="me-2" />
                                {t("table.status")}
                            </th>
                            <td>
                                {fetchedUser?.admin
                                    ? t("table.admin")
                                    : t("table.user")}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <FaArrowDownShortWide className="me-2" />
                                {t("total_parking")}
                            </th>
                            <td> {parking && parking.length} </td>
                        </tr>

                        {parking &&
                            parking.length > 0 &&
                            parking.map((park, i) => (
                                <tr key={i}>
                                    <th scope="row">
                                        <FaParking className="me-2" />
                                        {t("parking")} {i + 1}
                                    </th>
                                    <td>
                                        {park.building_name}{" "}
                                        {park.building_number}, P -{" "}
                                        {park.parking_lot_number}{" "}
                                        <span className="btn-danger btn-danger-custom">
                                            <FaTrashCan />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-md-6 ">
                        <button
                            className="btn btn-primary"
                            onClick={handleUserStatusClick}
                            disabled={deactivate}
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
                            disabled={deactivate}
                        >
                            {t("delete_user")}
                        </button>
                    </div>
                </div>
            </form>
            {error === "Allocated or pending parking slots available!" && (
                <p className="error-message">{t("error")}</p>
            )}

            {error === "You cannot delete your own account." && (
                <p className="error-message">{t("error_user_deletion")}</p>
            )}

            {error === "You cannot make changes to your own account." && (
                <p className="error-message">{t("error_user_status_change")}</p>
            )}

            {loader && <Loader />}
        </div>
    );
};

export default UserEditDeleteForm;

//have bugs of fetching parking and buildings
