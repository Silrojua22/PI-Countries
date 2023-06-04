import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../Redux/action";
import style from "../DetailCountries/detailCountries.module.css"


export default function DetailCountries() {
const dispatch = useDispatch();
const details = useSelector((state) => state.detailId)
const {id} = useParams()



useEffect(() => {
    dispatch(getDetail(id))
},[dispatch,id])

console.log("Details:", details);

return (
    <div className={style.detail} >
      <div>
      <Link to="/create">
          <button className={style["button-54"]}>Add an Activity</button>
        </Link>
        <Link to="/home">
          <button className={style["button-54"]}>Back to home</button>
        </Link>
      </div>
      <div > 
        <div  >
          {details.hasOwnProperty("name") ? (
            <div>
              <img  src={details.flags} alt='Bandera' />
            </div>
          ) : (
            <p>Buscando.....</p>
          )}
        </div>
        <div className={style.details}>
          {details.hasOwnProperty("name") && (
            <h2 >{details.name}</h2>
          )}
        </div>
      </div>

      <div >
        <div className={style.detail}>
          {details.hasOwnProperty("name") && (
            <div >
              <p>Continent: {details.continents}</p>
              <p>Capital: {details.capital.replace(/["{}]/g, '')}</p>
              <p>Subregion: {details.subregion}</p>
              <p>Area: {parseInt(details.area).toLocaleString('de-DE')} Km2</p>
              <p>Population: {details.population.toLocaleString('de-DE')}</p>
            </div>
          )}
        </div>
        <div className={style.detail}>
            <h2><i>Activities:</i></h2>
            {console.log("Activities:", details.activities)}
            {details.activities?.length > 0 ? (
              details.activities.map(act => (
                <div key={act.id} >
                  <h3 >Activity: {act.name}</h3>
                  <p >
                    Season: {act.season} <br /> 
                    Duration: {act.duration}hs. <br />
                    Difficulty: {act.difficulty} 
                  </p>
                </div>
              ))
            ) : (
              <h3 >The country has no activities!</h3>
            )}
          </div>
      </div>
    </div>
  );
}
    
