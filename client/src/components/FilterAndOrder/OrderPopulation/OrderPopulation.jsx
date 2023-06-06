import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { orderByPopulation } from "../../../Redux/action";
import style from "../OrderPopulation/orderPopulation.module.css";

export default function OrderPopulation({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(""); // Nueva variable de estado para almacenar el orden de clasificación

  function handleToggleOpen() {
    setOpen(!open);
  }

  function handleSort(e) {
    const selectedOrder = e.target.value;
    setSortOrder(selectedOrder); // Actualiza el estado del orden de clasificación

    dispatch(orderByPopulation(selectedOrder));
    setCurrentPage(1);
  }

  return (
    <div>
      <button onClick={handleToggleOpen} className={style["button-54"]}>
        Order By Population
      </button>
      {open && (
        <div>
          <input
            type="radio"
            value="asc"
            onChange={handleSort}
            checked={sortOrder === "asc"}
            id="ascending"
          />
          <label htmlFor="ascending">Ascending</label>
          <input
            type="radio"
            value="desc"
            onChange={handleSort}
            checked={sortOrder === "desc"}
            id="descending"
          />
          <label htmlFor="descending">Descending</label>
        </div>
      )}
    </div>
  );
}
