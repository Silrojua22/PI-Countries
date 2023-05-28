import React from "react";
import styles from "./pagination.module.css"


export default function Pagination ({countryPerPage, allCountries, paginado, currentPage}) {
    const pageCountrys = [];
    
    for(let i = 1; i <= Math.ceil(allCountries/countryPerPage); i++){
        pageCountrys.push(i)
    }
    return (
        <div className={styles.pagination} >
            <ul className={styles.paginationList} >
                {pageCountrys && pageCountrys.map((page, index) => (
            <li key={index} className={styles.paginationItem}>
                <button
                onClick={() => paginado(page)
                }
                className={`${styles.paginationLink} ${
                    page === currentPage ? styles.active : ''
                  }`}>
                  {page}
               </button>
            </li>
                ))}
            </ul>
        </div>
    )
}