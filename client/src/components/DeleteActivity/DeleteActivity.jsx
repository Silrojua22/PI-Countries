import React from "react";
import { useDispatch } from "react-redux";
import { deleteActivity } from "../../Redux/action";

export default function DeleteActivity({ activityId }) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteActivity(activityId));
    };

    return (
        <button onClick={handleDelete}>Delete Activity</button>
    );
};