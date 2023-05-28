import React from "react";
import { Link } from "react-router-dom";
import style from "./card.module.css";

export default function Card(props) {
  const { name, image, continents, id } = props;

  return (
    <div className={style.card}>
      <div className={style.flag}>
        <img src={image} alt={name} />
      </div>
      <div className={style["card-content"]}>
        <h1>{name}</h1>
        <h1>{continents}</h1>
        <Link to={`/detail/${id}`}>
          <button className={style.button}>More Info</button>
        </Link>
      </div>
    </div>
  );
}
