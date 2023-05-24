import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivityCreated } from "../../Redux/action";
import Card from "../CardCountry/card";
import Pagination from "../Pagination/pagination";
