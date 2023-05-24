import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
    const { name, image, continents, id } = props;
    return (
        <div>
            <div>
                <img src={image} alt={name} />
            </div>
            <div>
                <h1>{name}</h1>
                <h1>{continents}</h1>
            </div>
            <div>
            <Link to={`/detail/${id}`}>
            <button>More info</button>
          </Link>
            </div>
        </div>
    )
}

