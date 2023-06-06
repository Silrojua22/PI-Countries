import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCountries, getCountriesName } from "../../Redux/action";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setName(value);
    dispatch(getCountriesName(value));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setName("");
    dispatch(getCountries());
  };

  return (
    <div className={styles["navbar-container"]}>
      <div className={styles["navbar-menu"]}>
        <label htmlFor="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div>
          <Link
            to="/create"
            className={`${styles["navbar-link"]} ${styles["navbar-link-hover"]}`}
          >
            Create an Activity
          </Link>
          <Link to="/about" className={`${styles["navbar-link"]} ${styles["navbar-link-hover"]}`}>
            About
          </Link>
          <Link to="/" className={`${styles["navbar-link"]} ${styles["navbar-link-hover"]}`}>
            Back
          </Link>
        </div>
      </div>
      <div className={styles["navbar-search"]}>
        <form action>
          <input
            type="search"
            placeholder="Search..."
            value={name}
            onChange={handleInputChange}
          />
          <div>
            <span role="img" aria-label="Search"></span>
          </div>
        </form>
        <button onClick={handleClick} className={styles["reset-button"]}>
          Reset
        </button>
      </div>
    </div>
  );
}
