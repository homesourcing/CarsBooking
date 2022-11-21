import React, { useEffect } from "react";
import { useVehicles, setWorkshop } from '../../context/VehicleState'
import { Vehicles, Service, PersonalInfo, Summary, Box, Info, Progress } from '../index'

export const Container = () => {
    const [vehicleState, vehicleDispatch] = useVehicles()
    const { workshop, step } = vehicleState

    useEffect(() => {
        setWorkshop(vehicleDispatch, {
            workshop_id: process.env.REACT_APP_WORKSHOP_ID
            , slug: process.env.REACT_APP_WORKSHOP_SLUG, name: process.env.REACT_APP_WORKSHOP_NAME
            , phone: process.env.REACT_APP_WORKSHOP_PHONE
            , email: process.env.REACT_APP_WORKSHOP_EMAIL
        })
    }, [])
    // let workshop = {
    //     workshop_id: process.env.REACT_APP_WORKSHOP_ID
    //     , slug: process.env.REACT_APP_WORKSHOP_SLUG, name: process.env.REACT_APP_WORKSHOP_NAME
    //     , phone: process.env.REACT_APP_WORKSHOP_PHONE
    //     , email: process.env.REACT_APP_WORKSHOP_EMAIL
    // }

    let container;

    switch (step) {
        case 1:
            container = <>
                <Box />
                <Progress step={step} />
                <Info />
                <Vehicles workshop={workshop} />
            </>
            break;
        case 2:
            container = <>
                <Progress step={step} />
                <Service workshop={workshop} />
            </>
            break;
        case 3:
            container = <>
                <Progress step={step} />
                <PersonalInfo workshop={workshop} />
            </>
            break;
        case 4:
            container = <>
                <Progress step={step} />
                <Summary step={step} />
            </>
            break;
        default:
            container = <>
                <Box />
                <Progress step={step} />
                <Vehicles workshop={workshop} />
            </>
    }

    return (
        <>
            {container}
        </>
    )
}

export default Container