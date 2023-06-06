import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { filterByContinents } from "../../../Redux/action";
import style from "../FilterContinents/filterContinents.module.css";

export default function FilterContinents({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContinents, setSelectedContinents] = useState([]);

  function handleFilterContinents(e) {
    const continent = e.target.value;
    setCurrentPage(1);
    if (selectedContinents.includes(continent)) {
      setSelectedContinents(selectedContinents.filter(item => item !== continent));
    } else {
      setSelectedContinents([...selectedContinents, continent]);
    }
    dispatch(filterByContinents(continent));
  }

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <div>
        <div>
          <button className={style["button-54"]} onClick={toggleDropdown}>
            Filter Continent
          </button>
          {isOpen && (
            <div>
              <ul className={style.li}>
                <li>
                  <label>
                    <input
                      type="checkbox"
                      name="All"
                      value="All"
                      checked={selectedContinents.includes("All")}
                      onChange={handleFilterContinents}
                    />
                    All
                  </label>
                </li>
                <li>
                  <label >
                    <input
                      type="checkbox"
                      name="North America"
                      value="North America"
                      checked={selectedContinents.includes("North America")}
                      onChange={handleFilterContinents}
                    />
                    North America
                  </label>
                </li>
                <li>
                  <label >
                    <input
                      type="checkbox"
                      name="South America"
                      value="South America"
                      checked={selectedContinents.includes("South America")}
                      onChange={handleFilterContinents}
                    />
                    South America
                  </label>
                </li>
                <li>
                  <label >
                    <input
                      type="checkbox"
                      name="Europe"
                      value="Europe"
                      checked={selectedContinents.includes("Europe")}
                      onChange={handleFilterContinents}
                    />
                    Europe
                  </label>
                </li>
                <li>
                  <label >
                    <input
                      type="checkbox"
                      name="Asia"
                      value="Asia"
                      checked={selectedContinents.includes("Asia")}
                      onChange={handleFilterContinents}
                    />
                    Asia
                  </label>
                </li>
                <li>
                  <label >
                    <input
                      type="checkbox"
                      name="Oceania"
                      value="Oceania"
                      checked={selectedContinents.includes("Oceania")}
                      onChange={handleFilterContinents}
                    />
                    Oceania
                  </label>
                </li>
                <li>
                  <label >
                    <input
                      type="checkbox"
                      name="Africa"
                      value="Africa"
                      checked={selectedContinents.includes("Africa")}
                      onChange={handleFilterContinents}
                    />
                    Africa
                  </label>
                </li>
                <li>
                  <label >
                    <input
                      type="checkbox"
                      name="Antarctica"
                      value="Antarctica"
                      checked={selectedContinents.includes("Antarctica")}
                      onChange={handleFilterContinents}
                    />
                    Antarctica
                  </label>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
