import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { orderByName } from '../../Redux/action'


export default function OrderNameAlpha({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [ascending, setAscending] = useState(false);
  const [descending, setDescending] = useState(false);

  function handleToggleOpen() {
    setOpen(!open);
  }

  function handleSort(e) {
    const sortOrder = e.target.value;
    if (sortOrder === "a-z") {
      setAscending(!ascending);
      setDescending(false);
    } else if (sortOrder === "z-a") {
      setDescending(!descending);
      setAscending(false);
    }
    dispatch(orderByName(sortOrder));
    setCurrentPage(1);
  }

  return (
    <div>
      <button onClick={handleToggleOpen} >Order By 
        Alphabetical</button>
      {open && (
        <div >
          <input
            type="checkbox"
            value="a-z"
            onChange={handleSort}
            checked={ascending}
          />
          <label >A - Z</label>
          <input
            type="checkbox"
            value="z-a"
            onChange={handleSort}
            checked={descending}
          />
          <label >Z - A</label>
        </div>
      )}
    </div>
  );
}