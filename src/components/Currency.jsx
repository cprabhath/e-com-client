import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { axiosInstance } from "./Axios/Axios";
import { toast } from "react-toastify";

const Currency = React.memo((props) => {
    const [currency, setCurrency] = useState("");

    useEffect(() => {
        axiosInstance.get("/settings/find-all")
            .then((response) => {
                setCurrency(response.data.message[0].systemCurrency);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }, []);

    return (
        <>
            {props.price.toLocaleString("en-US", {
                style: "currency",
                currency: currency || "USD",
            })}
        </>
    );
});

Currency.displayName = "Currency";

Currency.propTypes = {
    price: PropTypes.number.isRequired,
};

export default Currency;
