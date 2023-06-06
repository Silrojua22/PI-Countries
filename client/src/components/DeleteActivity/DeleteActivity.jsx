import React from "react";
import { useDispatch } from "react-redux";
import { deleteActivity } from "../../Redux/action";
import style from "../DeleteActivity/delete.module.css"

export default function DeleteActivity({ activityId }) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteActivity(activityId));
    };

    return (
        <button onClick={handleDelete} className={style["button-54"]}>Delete Activity</button>
    );
};