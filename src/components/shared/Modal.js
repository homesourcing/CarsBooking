import React, { useEffect } from "react";
// import { useWorkshops } from '../../hooks/use-workshops'
import { useVehicles, getWorkshops, setWorkshop } from '../../context/VehicleState'

const Modal = ({ setShowModal }) => {
    // const workshops = useWorkshops()
    const [vehicleState, vehicleDispatch] = useVehicles()
    const { workshops } = vehicleState

    useEffect(() => {
        getWorkshops(vehicleDispatch)
    }, [vehicleDispatch])

    return (
        <div className="min-h-[42rem] w-1/2 flex flex-col fixed z-50 my-6 border-2 rounded-lg shadow-lg bg-white  
                ">
            <div className="w-full justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl text-center">
                    Velg verksted
                </h3>
                <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}>
                    Lukk
                </button>
            </div>
            <div className="w-full p-4 ">
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="p-4 w-full">
                <div className="px-4 py-1 overflow-y-auto h-96">
                    {workshops &&
                        workshops.map((itm, i) => {
                            return <div className="px-4 py-1 bg-slate-200 mt-2 cursor-pointer" key={itm.workshop_id}
                                onClick={() => { setWorkshop(vehicleDispatch, itm); setShowModal(false); }}>
                                <div className="text-2xl dark:text-white" >{itm.name}</div>
                                <div className="text-sm text-black-600 dark:text-gray-200">
                                    <span>Myrvangveien 1<br /><span>67905050</span></span>
                                </div>
                            </div>
                        })
                    }
                </div>


            </div>
        </div >

    );
};

export default Modal;