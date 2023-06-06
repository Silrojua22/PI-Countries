import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/landingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div>
          <h1 className={style.shadowAnimation}>Welcome to API Countries</h1>
        </div>
        <Link to="/home">
          <button className={style["button-54"]}>Go Home</button>
        </Link>
      </div>
    </div>
  );
}
