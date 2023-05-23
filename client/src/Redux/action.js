import axios from "axios";

import {
    url,
    GET_COUNTRY,
    GET_COUNTRY_NAME,
    GET_DETAIL,
    FILTER_BY_CONTINENTS,
    FILTER_ACTIVITY,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    GET_ACTIVITY_CREATED,
    POST_ACTIVITY,
    CLEAR_DETAIL,
} from "./actions-types"

//Renderizado de todos los países, por Id y nombre
export function getCountries() {
    return function (dispatch) {
        return axios.get(`${url}/countries`)
            .then(response => {
                dispatch({
                    type: GET_COUNTRY,
                    payload: response.data
                });
            })
            .catch(error => {
                console.error("Error:", error);
            })
    };
};

//Para el searchBar
export function getCountriesName(name) {
    return function (dispatch) {
        return axios.get(`${url}/countries`)
            .then(response => {
                const filteredCountries = response.data.filter(country =>
                    country.name.toLowerCase().includes(name.toLowerCase())
                );
                dispatch({
                    type: GET_COUNTRY_NAME,
                    payload: filteredCountries
                });
            })
            .catch(error => {

            })
    };
};

//Para el detail
export function getDetail(id) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`${url}/countries/${id}`)
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        } catch (error) {
            console.error(error);
        }
    };
};

export function clearDetail() {
    return {
        type: CLEAR_DETAIL
    };
};
//Filtro por continentes
export function filterByContinents(payload) {
    return {
        type: FILTER_BY_CONTINENTS,
        payload
    };
};

//Filtro por actividad
export function filterByActivity(payload) {
    return {
        type: FILTER_ACTIVITY,
        payload
    };
};

export function orderByName(type) {
    return {
        type: ORDER_BY_NAME,
        payload: { type }
    }
};
//Ordenar ascendendente o descendente
export function orderByPopulation() {
    return {
        type: ORDER_BY_POPULATION,
    }
};
//Crear actividades
export function createActivity(payload) {
    return async function (dispatch) {
        try {
            const apiData = await axios.post(`${url}/activities`, payload);
            dispatch({ type: POST_ACTIVITY, payload: apiData.data });
        } catch (error) {
            console.error(error);
        }
    };
};


//Buscar activividades creadas
export function getCreatedData() {
    return async function (dispatch) {
        const apiData = axios.get(`${url}/activities`)
        const getDataActivity = apiData.data;
        dispatch({ type: GET_ACTIVITY_CREATED, payload: getDataActivity })
    }
};

