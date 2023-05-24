import React from "react";

export default function Pagination ({countryPerPage, allCountries, paginado, currentPage}) {
    const pageCountrys = [];
    
    for(let i = 1; i <= Math.ceil(allCountries/countryPerPage); i++){
        pageCountrys.push(i)
    }
    return (
        <div >
            <ul  >
                {pageCountrys && pageCountrys.map((page, index) => (
            <li key={index}>
                <button
                onClick={() => paginado(page)}
                >
                {page}
               </button>
            </li>
                ))}
            </ul>
        </div>
    )
}