import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {orderByPopulation} from "../../Redux/action";


export default function OrderPopulation ({ setCurrentPage }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [ascending, setAscending] = useState(false);
    const [descending, setDescending] = useState(false);

    function handleToggleOpen() {
        setOpen(!open);
      }    

    function handleSort(e){
        const sortOrder = e.target.value;
        if (sortOrder === "asc") {
            setAscending(!ascending);
            setDescending(false);
          } else if (sortOrder === "desc") {
            setDescending(!descending);
            setAscending(false);
          }
        dispatch(orderByPopulation(sortOrder));
        setCurrentPage(1);

    }

    return (
        <div>
          <button onClick={handleToggleOpen}>Order By 
            Population</button>
          {open && (
            <div>
              <input
                type="checkbox"
                value="asc"
                onChange={handleSort}
                checked={ascending}
              />
              <label >Asc</label>
              <input
                type="checkbox"
                value="desc"
                onChange={handleSort}
                checked={descending}
              />
              <label >Desc</label>
            </div>
          )}
        </div>
      );
}