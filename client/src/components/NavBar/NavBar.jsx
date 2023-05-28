import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCountries, getCountriesName } from "../../Redux/action"


export default function NavBar() {
   const dispatch = useDispatch();
   const [name, setName] = useState("");


   const handleInputChange = (e) => {
      const { value } = e.target;
      setName(value);
      dispatch(getCountriesName(value))
   };

   const handleClick = (e) => {
      e.preventDefault();
      setName("");
      dispatch(getCountries())
   };

   return (
      <div>
         <div >

            <div>

               <input type="checkbox" id="menu-toggle" />
               <label htmlFor="menu-toggle">
                  <span></span>
                  <span></span>
                  <span></span>
               </label>

               <div >
                  <Link to="/about">About</Link>
                  <Link to="/create">Create an Activity</Link>
                  <Link to="/">
                     Back
                  </Link>
               </div>
            </div>

            <div>
               <form action>
                  <input
                     type="search"
                     placeholder="Search..."
                     value={name}
                     onChange={handleInputChange}

                  />

                  <div  >
                     <span>🔍</span>
                  </div>
               </form>
               <button onClick={handleClick} >
                  Reset
               </button>
            </div>
         </div>

         <div >
            <h1>COUNTRIES API</h1>
         </div>

      </div>
   );

}

