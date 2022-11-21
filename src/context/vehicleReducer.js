import {
  SET_STEP,
  GET_VEHICLES,
  GET_SERVICES,
  ADD_SERVICE,
  REMOVE_SERVICE,
  SERVICE_AGREEMENT,
  FIND_PERSON,
  SET_PERSON,
  SUBMIT_ORDER,
  CLEAR_FILTER,
  VEHICLE_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
  SEARCH_VEHICLE,
  GET_WORKSHOPS,
  SET_WORKSHOP
} from './types'

const vehicleReducer = (state, action) => {
  switch (action.type) {
    case SET_STEP:
      return {
        ...state,
        step: action.payload,
      }
    case GET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
      }
    case GET_SERVICES:
      return {
        ...state,
        categories: action.payload
          .filter((x) => x.type === 'category')
          .sort(function (a, b) {
            return a.id - b.id || a.name.localeCompare(b.name)
          }),
        services: action.payload
          .filter((x) => x.type === 'service')
          .sort(function (a, b) {
            return a.id - b.id || a.name.localeCompare(b.name)
          }),
      }
    case ADD_SERVICE:
      let exists = state.filtered.includes(action.payload)
      return {
        ...state,
        services: exists
          ? state.services.map((x) => (x.id === action.payload.id ? { ...x, selected: false } : x))
          : state.services,
        filtered: exists
          ? state.filtered.filter((s) => s !== action.payload)
          : [...state.filtered, action.payload],
      }
    case REMOVE_SERVICE:
      return {
        ...state,
        filtered: state.filtered.filter((service) => {
          return service.id !== action.payload.id
        }),
      }
    case SERVICE_AGREEMENT:
      return {
        ...state,
        serviceAgreement: action.payload,
      }
    case FIND_PERSON:
      return {
        ...state,
        person: action.payload,
      }
    case SET_PERSON:
      return {
        ...state,
        person: action.payload,
      }
    case SUBMIT_ORDER:
      return {
        ...state,
        person: action.payload,
      }
    case CLEAR_FILTER:
      return {
        ...state,
        person: {},
        filtered: [],
      }
    case SEARCH_VEHICLE:
      return {
        ...state,
        vehicle: action.payload,
      }
    case GET_WORKSHOPS:
      let workshops = action.payload.filter((w) => w.active).filter((w) => w.workshop_id !== 1357)
      return {
        ...state,
        workshops: workshops,
      }
    case SET_WORKSHOP:
      return {
        ...state,
        workshop: action.payload,
      }
    case VEHICLE_ERROR:
      return {
        ...state,
        error: JSON.stringify(action.payload.message), //action.payload,
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      throw new Error(`Unsupported type of: ${action.type}`)
  }
}

export default vehicleReducer
