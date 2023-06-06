import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCreatedData } from "../../Redux/action";
import { Link } from "react-router-dom";
import DeleteActivity from "../DeleteActivity/DeleteActivity";
import styles from "./activities.module.css";

export default function Activities() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const [countries, setCountries] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);

  useEffect(() => {
    dispatch(getCreatedData());
  }, [dispatch]);

  const handleActivityClick = (activityId) => {
    const selectedActivity = activities.find((activity) => activity.id === activityId);
    if (selectedActivity) {
      const countriesWithActivity = selectedActivity.countries;
      console.log(`Countries with activity (${activityId}):`, countriesWithActivity);
      if (selectedActivities.includes(activityId)) {
        setSelectedActivities(selectedActivities.filter((id) => id !== activityId));
        setCountries(countries.filter((country) => !countriesWithActivity.includes(country)));
      } else {
        setSelectedActivities([...selectedActivities, activityId]);
        setCountries([...countries, ...countriesWithActivity]);
      }
    }
  };

  return (
    <div className={styles.activities}>
      <h2 className={styles.h2}>List Activities</h2>
      <ul className={styles.li}>
        {activities.map((activity) => (
          <li key={activity.id}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" onChange={() => handleActivityClick(activity.id)} className={styles.checkbox} />
              {activity.name}
            </label>
            <DeleteActivity activityId={activity.id} />
          </li>
        ))}
      </ul>

     
      {countries && countries.length > 0 ? (
        <div>
          <h3>Countries with activity</h3>
          <ul >
            {countries.map((country) => (
              <div key={country.id} className={styles.card}>
                <div className={styles.flag}>
                  <img src={country.flags} alt={country.name} />
                </div>
                <div>
                  {country.name}
                </div>
                <div className={styles["card-content"]}>
                  <h1>{country.name}</h1>
                  <h1>Continent: {country.continents}</h1>
                  <Link to={`/detail/${country.id}`}>
                    <button className={styles["button-54"]}>More Info</button>
                  </Link>
                </div>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p className={styles.p}>No activities have been created yet</p>
      )}
      <Link to="/home">
        <button className={styles["button-54"]}>Go Home</button>
      </Link>
    </div>
  );
}
