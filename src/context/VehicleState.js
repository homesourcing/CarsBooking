import React, { useReducer, useContext } from 'react'

import VehicleContext from './vehicleContext'
import VehicleReducer from './vehicleReducer'
import axios from 'axios'
import client from './api'

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

// Create a custom hook to use the Vehicle context

export const useVehicles = () => {
  const { state, dispatch } = useContext(VehicleContext)
  return [state, dispatch]
}

export const setStep = async (dispatch, step, url) => {
  try {
    dispatch({
      type: SET_STEP,
      payload: step,
    })

    // navigation.navigate(url);
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: err,
    })
  }
}

export const setLoading = async (dispatch, loading) => {
  dispatch({
    type: SET_LOADING,
    payload: loading,
  })
}

// Get Vehicles
export const getVehicles = async (dispatch, regNo) => {
  try {
    setLoading(dispatch, true)

    const res = await client.get(`/vehicle/${regNo}`)

    dispatch({
      type: GET_VEHICLES,
      payload: res.data,
    })

    setLoading(dispatch, false)
    setStep(dispatch, 2, '/booking/services')
  } catch (err) {
    setLoading(dispatch, false)
    dispatch({
      type: VEHICLE_ERROR,
      payload: err,
    })
  }
}

export const getWorkshops = async (dispatch) => {
  try {
    const res = await client.get(`/workshop?appId=1`)

    dispatch({
      type: GET_WORKSHOPS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: err,
    })
  }
}

export const setWorkshop = async (dispatch, workshop) => {
  try {
    dispatch({
      type: SET_WORKSHOP,
      payload: workshop,
    })

    // navigation.navigate(url);
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: err,
    })
  }
}


// Get Services
export const getServices = async (dispatch, workshop_id) => {
  try {
    const res = await client.get(`/services/${workshop_id}`)

    dispatch({
      type: GET_SERVICES,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: err,
    })
  }
}

// Add Service
export const addService = async (dispatch, service) => {
  try {
    service.selected = true
    dispatch({
      type: ADD_SERVICE,
      payload: service,
    })
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: err.response.msg,
    })
  }
}

// Add Service
export const setServiceAgreement = async (dispatch, hasAgreement) => {
  try {
    dispatch({
      type: SERVICE_AGREEMENT,
      payload: hasAgreement,
    })
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: err.response.msg,
    })
  }
}

// Remove Service
export const removeService = async (dispatch, service) => {
  try {
    service.selected = false

    dispatch({
      type: REMOVE_SERVICE,
      payload: service,
    })
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: err,
    })
  }
}

// Find Personal Information by phone number
export const findPerson = async (dispatch, phone) => {
  try {
    setLoading(dispatch, true)

    let url = `https://live.intouch.no/tk/search.php?qry=${phone}&from=1&to=27&format=json&charset=UTF-8&username=CARSCAS&password=caso641`
    const res = await axios.get(url)

    const {
      1: {
        listing: { duplicates },
      },
    } = res.data.result

    dispatch({
      type: FIND_PERSON,
      payload: duplicates ? duplicates[0] : {},
    })

    setLoading(dispatch, false)
  } catch (err) {
    setLoading(dispatch, false)
    dispatch({
      type: VEHICLE_ERROR,
      payload: err,
    })
  }
}

export const setPerson = async (dispatch, person) => {
  try {
    dispatch({
      type: SET_PERSON,
      payload: person,
    })

    // navigation.navigate(url);
  } catch (err) {
    dispatch({
      type: VEHICLE_ERROR,
      payload: err,
    })
  }
}

export const submitOrder = async (dispatch, order) => {
  try {
    setLoading(dispatch, true)

    delete order.isBusiness

    const res = await client.post('/web-order', order)

    dispatch({
      type: SUBMIT_ORDER,
      payload: { ...res.data, ...order },
    })

    setLoading(dispatch, false)
    setStep(dispatch, 4, '')
  } catch (err) {
    setLoading(dispatch, false)
    dispatch({
      type: VEHICLE_ERROR,
      payload: err,
    })
  }
}

export const searchVehicle = async (dispatch, regNo) => {
  if (regNo) {
    setLoading(dispatch, true)

    const res = await client.get(`/vehicle/${regNo}`)

    if (res.status !== 200)
      dispatch({
        type: VEHICLE_ERROR,
        payload: res,
      })
    else
      dispatch({
        type: SEARCH_VEHICLE,
        payload: { ...res.data },
      })

      setLoading(dispatch, false)
  }
}

// Clear Filter
export const clearFilter = (dispatch) => {
  dispatch({ type: CLEAR_FILTER })
}

export const clearError = async (dispatch) => {
  dispatch({ type: CLEAR_ERROR })
}

const VehicleState = (props) => {
  const initialState = {
    vehicles: null,
    filtered: [],
    person: {},
    step: 1,
    current: null,
    error: null,
    isLoading: false,
  }

  const [state, dispatch] = useReducer(VehicleReducer, initialState)

  return (
    <VehicleContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </VehicleContext.Provider>
  )
}

export default VehicleState
