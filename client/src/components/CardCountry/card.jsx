import React from "react";
import { Link } from "react-router-dom";
import style from "../CardCountry/card.module.css"

export default function Card(props) {
    const { name, image, continents, id } = props;
    return (
        <div className={style.card}>
            <div>
                <img src={image} alt={name} className={style.flag} />
            </div>
            <div>
                <h1>{name}</h1>
                <h1>{continents}</h1>
            </div>
            <div>
            <Link to={`/detail/${id}`}>
            <button className={style.button}>More info</button>
          </Link>
            </div>
        </div>
    )
}

