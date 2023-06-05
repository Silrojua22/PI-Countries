import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries /*filterBySeason */ } from "../../Redux/action";
import Card from "../CardCountry/card";
import Pagination from "../Pagination/pagination";
import NavBar from "../NavBar/NavBar";
//import FilterActivity from "../FilterAndOrder/FilterActivity";
import FilterContinents from "../FilterAndOrder/FilterContinents/FilterContinents";
import OrderAlfa from "../FilterAndOrder/OrderAlfa/OrderAlfa";
import OrderPopulation from "../FilterAndOrder/OrderPopulation/OrderPopulation";
import style from "./home.module.css";
import styles from "../Home/home.module.css"
import estilo from "../Activities/activities.module.css"

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

  const [currentPage, setCurrentPage] = useState(1); //Se setea en 1 ya que mi primer pág es 1
  const [countryPerPage] = useState(10); // Se guarda la cantidad de países por página
  const indexOfLastCountrys = currentPage * countryPerPage; // 10
  const indexOfFristCountrys = indexOfLastCountrys - countryPerPage; // 0
  const currentCountrys = allCountries.slice(indexOfFristCountrys, indexOfLastCountrys);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  // const handleFilterBySeason = (filter) => {
  //   dispatch(filterBySeason(filter));
  //   setCurrentPage(1);
  // };

  return (
    <div className={style.home}>
      <NavBar />
      <div className={styles.containerbutton}>
        <div className={styles.buttonContainer}>
          <div>
            <FilterContinents setCurrentPage={setCurrentPage}  />
          </div>
          {/* <div>
        <FilterActivity setCurrentPage={setCurrentPage} onFilter={handleFilterBySeason} />
      </div> */}
          <div>
            <OrderAlfa setCurrentPage={setCurrentPage} />
          </div>
          <div>
            <OrderPopulation setCurrentPage={setCurrentPage} />
          </div>
          <div>
            <Link to="/activities">
              <button className={estilo["button-54"]}>Activities</button>
            </Link>
          </div>
        </div>

        <div>
          {currentCountrys?.map((el) => (
            <Card key={el.id} id={el.id} name={el.name} continents={el.continents} image={el.flags} />
          ))}
        </div>
      </div>

      <div>
        <Pagination
          countryPerPage={countryPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
          currentPage={currentPage} // Pass the current page as a prop
        />
      </div>
    </div>
  );
}
