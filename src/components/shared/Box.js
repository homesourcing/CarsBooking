import React, { useState, useEffect } from "react";
import { HashLink } from 'react-router-hash-link';
import { BrowserView, MobileView } from 'react-device-detect';
import { SearchBox } from "./SearchBox";

import { useVehicles, searchVehicle } from '../../context/VehicleState'

import Alert from '../../layout/Alert'
import Spinner from '../../layout/Spinner'
import Modal from "./Modal";

export const Box = () => {
    const [vehicleState, vehicleDispatch] = useVehicles()
    const { vehicle, error, loading } = vehicleState

    const [showResults, setShowResults] = useState(false)

    const [state, setInput] = useState({ regNo: '' })
    const { regNo } = state

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowResults(true);
    }, [vehicle])

    const onChange = (e) => setInput({ ...state, [e.target.name]: e.target.value.toUpperCase() })

    return (
        <>
            {showModal &&
                <Modal setShowModal={setShowModal} />
            }
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-x-20 gap-y-2 lg:w-6/12 md:w-full">
                <div className="box">
                    <h4>Bestill time</h4>
                    <HashLink className="btn-blue pt-1" smooth to="/#booking">Sjekk og bestill time</HashLink>
                </div>
                <div className="box">
                    {error && <Alert type="error" message={error} />}
                    {loading && <Spinner />}

                    <h4>Når er neste EU-kontroll?</h4>
                    <BrowserView>
                        <div className="grid lg:grid-cols-2 md:grid-cols-1 rounded-full w-full h-12 px-3 border py-1.5 place-items-center">
                            <div className="h-full w-full">
                                <label className="text-xs">REGNR.</label>
                                <input type="text" className="w-9/12 h-8 p-2 focus:outline-0"
                                    maxLength={7} name="regNo" value={regNo} onChange={onChange} />
                            </div>
                            <div className="w-full items-center">
                                <input type="button" className="btn-blue" value="Sjekk og bestill time"
                                    onClick={() => {
                                        searchVehicle(vehicleDispatch, regNo)
                                    }} />
                            </div>
                        </div>
                        <SearchBox setShowResults={setShowResults} showResults={showResults} vehicle={vehicle} setShowModal={setShowModal} />
                    </BrowserView>
                    <MobileView>
                        <div className="grid rounded-full h-12 px-3 border py-1.5 place-items-center">
                            <div className="h-full w-full">
                                <label className="text-xs">REGNR.</label>
                                <input type="text" className="w-9/12 h-8 p-2 focus:outline-0"
                                    maxLength={7} name="regNo" value={regNo} onChange={onChange} />
                            </div>
                        </div>
                        <div className="mt-4 grid place-items-center">
                            <input type="button" className="btn-blue" value="Sjekk og bestill time"
                                onClick={() => {
                                    searchVehicle(vehicleDispatch, regNo)
                                }} />
                        </div>
                        <SearchBox setShowResults={setShowResults} showResults={showResults} vehicle={vehicle} setShowModal={setShowModal} />

                    </MobileView>

                </div>
            </div >
        </>
    )
}

export default Box;