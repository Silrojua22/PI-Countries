import React from "react";
import { Link } from "react-router-dom";
import style from "../About/about.module.css";

export default function About() {
  return (
    <div className={style.about}>
      <div className={style.highlight}>
        <h1 className={style.title}>About</h1>
        <p className={style.paragraph}>
          Welcome to API Countries! In this application, you will not only be
          able to search for countries, but you will also be able to filter them
          by continent, alphabetical order, by population (from smallest to
          largest and vice versa). In addition, you will have the opportunity,
          from a very didactic form, to create all kinds of activities!
        </p>
        <Link to="/home">
          <button className={style["button-54"]}>Back Home</button>
        </Link>
      </div>
    </div>
  );
}
