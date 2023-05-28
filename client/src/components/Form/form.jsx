import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getCountries, filterBySeason } from "../../Redux/action";
import { validate } from "./validate";
import swal from "sweetalert";

export default function CreateActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countries);

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    duration: "",
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
              duration: "",
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
        <button>Back</button>
      </Link>
      <div>
        <h1>Create tourist activity</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>
              <label>Activity Name:</label>
              <input
                placeholder="Name..."
                type="text"
                value={form.name}
                name="name"
                onChange={handleChange}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>

            <div>
              <label>Difficulty:</label>
              <select
                type="number"
                value={form.difficulty}
                name="difficulty"
                onChange={handleChange}
              >
                <option value="">Select Difficulty</option>
                <option value="1">Very Easy</option>
                <option value="2">Easy</option>
                <option value="3">Normal</option>
                <option value="4">Difficult</option>
                <option value="5">Extreme</option>
              </select>
              {errors.difficulty && <p>{errors.difficulty}</p>}
            </div>

            <div>
              <label>Duration: </label>
              <input
                placeholder="Duration..."
                type="number"
                value={form.duration}
                name="duration"
                onChange={handleChange}
              />
              {errors.duration && <p>{errors.duration}</p>}
              <span>Hs</span>
            </div>

            <div>
              <label>Season:</label>
              <label>
                <input
                  type="checkbox"
                  name="All"
                  value="All"
                  onChange={handleCheck}
                />
                All
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Summer"
                  value="Summer"
                  onChange={handleCheck}
                />
                Summer
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Autumn"
                  value="Autumn"
                  onChange={handleCheck}
                />
                Autumn
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Winter"
                  value="Winter"
                  onChange={handleCheck}
                />
                Winter
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Spring"
                  value="Spring"
                  onChange={handleCheck}
                />
                Spring
              </label>
              {errors.season && <p>{errors.season}</p>}
            </div>

            <div>
              <select onChange={(e) => handleSelect(e)}>
                <option value="">Select Countries</option>
                {countries.map((cou) => (
                  <option value={cou.name} key={cou.name}>
                    {cou.name}
                  </option>
                ))}
              </select>
              <div>
                <ul>
                  <li>
                    {form.countries.map((el, index) => (
                      <div key={index}>
                        {el}
                        <button onClick={() => handleDelete(el)}>X</button>
                      </div>
                    ))}
                  </li>
                </ul>
                {errors.countries && <p></p>}
              </div>
            </div>
          </div>

          <div>
            <button type="submit">
              <span>Create New Activity</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
