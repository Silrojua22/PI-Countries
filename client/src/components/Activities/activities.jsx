import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCreatedData } from "../../Redux/action";
import { Link } from "react-router-dom";
import DeleteActivity from "../DeleteActivity/DeleteActivity"
import style from "../Activities/activities.module.css"


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
        <div className={style.activities}>
            <h2>Lista de actividades</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>
                        <label>
                            <input type="checkbox" onChange={() => handleActivityClick(activity.id)} />
                            {activity.name}
                        </label>
                        <DeleteActivity activityId={activity.id} />
                    </li>
                ))}
            </ul>

            {/* Renderizar los países seleccionados */}
            {countries && countries.length > 0 ? (
                <div>
                    <h3>Países con actividad</h3>
                    <ul>
                        {countries.map((country) => (
                            <div key={country.id}>
                                {/* Agrega la clase CSS */}
                                <img src={country.flags} alt={country.name} />
                                <h1>{country.name}</h1>
                                <h1>Continente: {country.continents}</h1>
                                <Link to={`/detail/${country.id}`}>
                                    <button>Ir al detalle</button>
                                </Link>
                            </div>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No activities have been created yet</p>
            )}
            <Link to="/home">
                <button className={style["button-54"]}>Go Home</button>
            </Link>
        </div>
    );
}


//--------COMPONENTE DE CLASE------------//

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { getCreatedData } from "../../Redux/action";
// import { Link } from "react-router-dom";
// import styles from "./CountryCard.module.css";

// class Activities extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       countries: [],
//       selectedActivities: [],
//     };
//   }

//   componentDidMount() {
//     this.props.getCreatedData();
//   }

//   handleActivityClick = (activityId) => {
//     const { activities } = this.props;
//     const { countries, selectedActivities } = this.state;

//     const selectedActivity = activities.find(
//       (activity) => activity.id === activityId
//     );
//     if (selectedActivity) {
//       const countriesWithActivity = selectedActivity.countries;
//       console.log(`Countries with activity (${activityId}):`, countriesWithActivity);
//       if (selectedActivities.includes(activityId)) {
//         this.setState({
//           selectedActivities: selectedActivities.filter(
//             (id) => id !== activityId
//           ),
//           countries: countries.filter(
//             (country) => !countriesWithActivity.includes(country)
//           ),
//         });
//       } else {
//         this.setState({
//           selectedActivities: [...selectedActivities, activityId],
//           countries: [...countries, ...countriesWithActivity],
//         });
//       }
//     }
//   };

//   render() {
//     const { activities } = this.props;
//     // eslint-disable-next-line
//     const { countries, selectedActivities } = this.state;

//     return (
//       <div>
//         <h2>Lista de actividades</h2>
//         <ul>
//           {activities.map((activity) => (
//             <li key={activity.id}>
//               <label>
//                 <input
//                   type="checkbox"
//                   onChange={() => this.handleActivityClick(activity.id)}
//                 />
//                 {activity.name}
//               </label>
//             </li>
//           ))}
//         </ul>

//         {/* Renderizar los países seleccionados */}
//         {countries && countries.length > 0 ? (
//           <div>
//             <h3>Países con actividad</h3>
//             <ul>
//               {countries.map((country) => (
//                 <div key={country.id} className={styles.card}>
//                   <img src={country.flags} alt={country.name} />
//                   <h1>{country.name}</h1>
//                   <h1>Continente: {country.continents}</h1>
//                   <Link to={`/detail/${country.id}`}>
//                     <button className={styles.button}>Ir al detalle</button>
//                   </Link>
//                 </div>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           <p>No activities have been created yet</p>
//         )}
//         <Link to="/home">
//           <button>Go Home</button>
//         </Link>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   activities: state.activities,
// });

// const mapDispatchToProps = {
//   getCreatedData,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Activities);
