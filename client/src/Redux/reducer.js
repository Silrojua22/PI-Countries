import {
  GET_COUNTRY,
  GET_COUNTRY_NAME,
  GET_DETAIL,
  FILTER_BY_CONTINENTS,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  GET_ACTIVITY_CREATED,
  POST_ACTIVITY,
  CLEAR_DETAIL,
  FILTER_BY_SEASON,
  DELETE_ACTIVITY,
  //FILTER_ACTIVITY,
} from './actions-types';

const initialState = {
  countries: [],
  allContinents: [],
  activities: [],
  detailId: [],
  controllActivities: {},
  season: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRY:
      console.dir(Object.prototype);

      return {
        ...state,
        countries: action.payload,
        allContinents: action.payload
      };

    case GET_COUNTRY_NAME:
      return {
        ...state,
        countries: action.payload
      };

    case GET_DETAIL:
      return {
        ...state,
        detailId: action.payload,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        detailId: [],
      };

    case FILTER_BY_CONTINENTS:
      const continents = state.allContinents;
      const filteredContinents =
        action.payload === 'All'
          ? continents
          : continents.filter(c => c.continents === action.payload);
      return {
        ...state,
        countries: filteredContinents
      };

    case ORDER_BY_NAME:
      const { type } = action.payload;
      const sortedCountries = [...state.countries];

      if (type === 'a-z') {
        sortedCountries.sort((a, b) => a.name.localeCompare(b.name));
      } else if (type === 'z-a') {
        sortedCountries.sort((a, b) => b.name.localeCompare(a.name));
      }

      return {
        ...state,
        countries: sortedCountries
      };

      case ORDER_BY_POPULATION:
        const countries = [...state.countries].sort((a, b) => {
          if (action.payload === 'asc') {
            return b.population - a.population; // Orden ascendente (más alto primero)
          } else if (action.payload === 'desc') {
            return a.population - b.population; // Orden descendente (más bajo primero)
          }
          return 0; // Agregar esta línea para devolver 0 por defecto
        });
  
        return {
          ...state,
          countries: countries,
        };

    case GET_ACTIVITY_CREATED:
      return {
        ...state,
        activities: action.payload
      };

    case POST_ACTIVITY:
      return {
        ...state,
        controllActivities: action.payload
      };

    case FILTER_BY_SEASON:
      const filteredObjects = Array.isArray(state.objects) ? state.objects.filter(obj => obj.season === action.season) : [];
      return {
        ...state,
        filteredObjects
      };
    case DELETE_ACTIVITY:
      const updatedActivities = state.activities.filter(activity => activity.id !== action.payload);
      return {
        ...state,
        activities: updatedActivities
      };

    default:
      return state;
  }


  //   case FILTER_ACTIVITY:
  //     const { filter } = action.payload;

  //     const filteredCountries = state.countries.filter(country =>
  //       country.activities.some(activity => activity.name.toLowerCase().includes(filter.toLowerCase()))
  //     );

  //     return {
  //       ...state,
  //       countries: filteredCountries,
  //     };

  //   default:
  //     return state;
  // }
}

export default rootReducer;
