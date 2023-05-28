import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCreatedData } from "../../Redux/action";
import { Link } from "react-router-dom";
import styles from "./CountryCard.module.css";

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
        <div>
            <h2>Activities list</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>
                        <label>
                            <input type="checkbox" onChange={() => handleActivityClick(activity.id)} />
                            {activity.name}
                        </label>
                    </li>
                ))}
            </ul>

            {/* Renderizar los países seleccionados */}
            {countries && countries.length > 0 && (
                <div>
                    <h3>Countries with activity</h3>
                    <ul>
                        {countries.map((country) => (
                            <div key={country.id} className={styles.card}> {/* Agrega la clase CSS */}
                                <img src={country.flags} alt={country.name} />
                                <h1>{country.name}</h1>
                                <h1>Capital: {country.continents}</h1>
                                <Link to={`/detail/${country.id}`}>
                                    <button className={styles.button}>Go to Detail</button></Link>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
            <Link to="/home"><button>
                Go Home
            </button>
            </Link>
            
        </div>
    );
}
