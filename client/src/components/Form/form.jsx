import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getCountries, filterBySeason } from "../../Redux/action";
import { validate } from "./validate";
import swal from "sweetalert";
import styles from "../Form/form.module.css";

export default function CreateActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countries);

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    hours: "",
    minutes: "",
    season: [],
    countries: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({
      ...form,
      [e.target.name]: e.target.value,
    }));
  }

  function handleCheck(e) {
    const seasonValue = e.target.value;

    if (e.target.checked) {
      if (!form.season.includes(seasonValue)) {
        setForm({
          ...form,
          season: [...form.season, seasonValue],
        });
      }
    } else {
      setForm({
        ...form,
        season: form.season.filter((s) => s !== seasonValue),
      });
    }

    setErrors(validate({
      ...form,
      season: e.target.checked ? [...form.season, seasonValue] : form.season,
    }));
  }

  function handleSelect(e) {
    setForm({
      ...form,
      countries: [...form.countries, e.target.value],
    });
    setErrors(validate({
      ...form,
      [e.target.name]: e.target.value,
    }));
  }

  function handleDelete(e) {
    setForm({
      ...form,
      countries: form.countries.filter((coun) => coun !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      swal({
        title: "Do you want to create the activity?",
        text: "This step cannot be modified...",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,
      }).then((isConfirm) => {
        if (isConfirm) {
          swal({
            title: "¡Successful!",
            text: "Now you can enjoy your activity",
            icon: "success",
            button: "OK",
          }).then(() => {
            const seasonString = form.season.join(", ");
            const updatedForm = {
              ...form,
              season: seasonString,
            };

            dispatch(createActivity(updatedForm));
            dispatch(filterBySeason(form.season)); // Aplicar el filtrado por temporada
            setForm({
              name: "",
              difficulty: "",
              hours: "",
              minutes: "",
              season: [],
              countries: [],
            });
            history.push("/home");
          });
        } else {
          swal({
            title: "¡No!",
            text: "Proceed to make the changes",
            icon: "error",
          });
        }
      });
    } else {
      swal("Please fill in all the required fields.");
    }
  }

  return (
    <div>
      <Link to="/home">
        <button className={styles.backButton}>Back</button>
      </Link>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Create tourist activity</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.label}>Activity Name:</label>
            <input
              className={styles.input}
              placeholder="Name..."
              type="text"
              value={form.name}
              name="name"
              onChange={handleChange}
            />
            {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
          </div>

          <div>
            <label className={styles.label}>Difficulty:</label>
            <select
              className={styles.select}
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
            >
              <option value="">Select Difficulty</option>
              <option value="1">⭐️</option>
              <option value="2">⭐️⭐️</option>
              <option value="3">⭐️⭐️⭐️</option>
              <option value="4">⭐️⭐️⭐️⭐️</option>
              <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
            </select>
            {errors.difficulty && <p className={styles.errorMessage}>{errors.difficulty}</p>}
          </div>

          <div className={styles.durationContainer}>
            <label className={styles.label}>Duration:</label>
            <div className={styles.timeInputContainer}>
              <input
                className={styles.timeInput}
                type="number"
                min="0"
                max="23"
                value={form.hours}
                name="hours"
                onChange={handleChange}
              />
              <span className={styles.timeSeparator}>:</span>
              <input
                className={styles.timeInput}
                type="number"
                min="0"
                max="59"
                value={form.minutes}
                name="minutes"
                onChange={handleChange}
              />
            </div>
            {errors.hours && <p className={styles.errorMessage}>{errors.hours}</p>}
            {errors.minutes && <p className={styles.errorMessage}>{errors.minutes}</p>}
          </div>

          <div className={styles.checkboxContainer}>
            <label className={styles.label}>Season:</label>
            <label>
              <input
                className={styles.checkbox}
                type="checkbox"
                name="All"
                value="All"
                onChange={handleCheck}
              />
              All
            </label>
            <label>
              <input
                className={styles.checkbox}
                type="checkbox"
                name="Summer"
                value="Summer"
                onChange={handleCheck}
              />
              Summer
            </label>
            <label>
              <input
                className={styles.checkbox}
                type="checkbox"
                name="Autumn"
                value="Autumn"
                onChange={handleCheck}
              />
              Autumn
            </label>
            <label>
              <input
                className={styles.checkbox}
                type="checkbox"
                name="Winter"
                value="Winter"
                onChange={handleCheck}
              />
              Winter
            </label>
            <label>
              <input
                className={styles.checkbox}
                type="checkbox"
                name="Spring"
                value="Spring"
                onChange={handleCheck}
              />
              Spring
            </label>
            {errors.season && <p className={styles.errorMessage}>{errors.season}</p>}
          </div>

          <div className={styles.countryContainer}>
            <select
              className={styles.select}
              onChange={(e) => handleSelect(e)}
            >
              <option value="">Select Countries</option>
              {countries.map((country, i) => (
                <option value={country.name} key={i}>
                  {country.name}
                </option>
              ))}
            </select>
            <div className={styles.selectedCountries}>
              {form.countries.map((country, i) => (
                <div className={styles.selectedCountry} key={i}>
                  <p>{country}</p>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(country)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            {errors.countries && <p className={styles.errorMessage}>{errors.countries}</p>}
          </div>

          <button className={styles.createButton} type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
