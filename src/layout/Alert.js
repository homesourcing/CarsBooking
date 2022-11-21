import './css/alert.css'
import React from 'react'
import { useVehicles, clearError } from '../context/VehicleState'

export default function Alert({ children, type, message }) {
  const [vehicleState, vehicleDispatch] = useVehicles()
  const { error } = vehicleState

  const renderElAlert = function () {
    return React.cloneElement(children)
  }

  const handleClose = (e) => {
    e.preventDefault()
    clearError(vehicleDispatch)
  }

  return (
    <div className={`alert ${type} ${!error && 'hiden'}`}>
      <span className="closebtn" onClick={handleClose}>
        &times;
      </span>
      {children ? renderElAlert() : message}
    </div>
  )
}
