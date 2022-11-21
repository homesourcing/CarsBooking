import React, { useEffect, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect';

import {
  useVehicles,
  getServices,
  addService,
  removeService,
  setServiceAgreement,
  setStep,
} from '../context/VehicleState'

import { VehicleInfo } from './index'

import Alert from '../layout/Alert'
import '../layout/css/vehicle.css'
import Spinner from '../layout/Spinner'
import '../layout/css/service.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const Services = ({ workshop }) => {
  const [vehicleState, vehicleDispatch] = useVehicles()
  const { vehicles, categories, services, filtered, serviceAgreement, loading, step, error } = vehicleState
  const [showMore, setShowMore] = useState([false])
  const [descr, toggleDescription] = useState()
  const [chkDesc, toggleCheckboxDesc] = useState()

  console.log(workshop);
  useEffect(() => {
    getServices(vehicleDispatch, workshop.workshop_id)
  }, [vehicleDispatch, workshop.workshop_id])

  function Item({ item }) {
    return item.is_active ? (
      <>
        <div>
          <div className="tooltip" id="third">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="icon-left"
              onClick={(e) => toggleDescription(descr !== item.id ? item.id : -1)}
            />
            <div className="arrow"></div>
            <div className="info">
              <p>{item.description}</p>
            </div>
          </div>
          <div
            onClick={() => {
              addService(vehicleDispatch, item)
            }}
          >
            {item.selected ? (
              <FontAwesomeIcon icon={faCheck} className="icon selected-service" />
            ) : (
              <FontAwesomeIcon icon={faPlusCircle} className="icon" />
            )}
            <span className='text-start'>{item.name}</span>
          </div>
        </div>
        <div className={`service-desc ${descr === item.id ? 'show' : null}`}>
          {item.description}
        </div>
      </>
    ) : (
      <div className="inactive">
        <span className=' text-left'>{item.name}</span>
      </div>
    )
  }

  const StandardTemplate = ({ id }) => {
    return (
      <div className="list">
        {services
          .filter((itm) => itm.category_id === id)
          .map((service, id) => {
            return <Item key={service.id} item={service} />
          })}
      </div>
    )
  }

  const ExpandedTemplate = ({ id }) => {
    return (
      <>
        <div className="list">
          {services
            .filter((itm) => itm.category_id === id)
            .slice(0, 9)
            .map((service, id) => {
              return <Item key={service.id} item={service} />
            })}
          {showMore[id] ? (
            <div className="hidden-items">
              {services
                .filter((itm) => itm.category_id === id)
                .slice(9)
                .map((service, id) => {
                  return <Item key={service.id} item={service} />
                })}
            </div>
          ) : null}
        </div>
        <span className="show-more" onClick={() => toggleShowMore(id)}>
          {showMore[id] ? 'Show less' : 'Show more'}
        </span>
      </>
    )
  }

  const toggleShowMore = (key) => {
    let newArr = [...showMore]
    newArr[key] = !showMore[key]
    setShowMore(newArr)
  }
  return (
    <div className="w2">

      {error && <Alert type="error" message={error} />}
      {loading && <Spinner />}

      <VehicleInfo vehicle={vehicles} />

      {/* Checkbox */}
      <BrowserView>
        <div className="grid grid-cols-3 gap-4 content-start h-24 justify-center items-center">
          <div className="w-96 grid-container">
            <div className="first-service-heading">
              <div className='flex row items-center ml-4'>
                <input
                  type="checkbox"
                  checked={serviceAgreement}
                  onChange={() => setServiceAgreement(!serviceAgreement)}
                />
                <p>Fragus serviceavtale</p>
                <div className="tooltip" id="third">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="icon-left"
                    onClick={(e) => toggleCheckboxDesc(!chkDesc)}
                  />
                  <div className={`service-desc ${chkDesc ? 'show' : null}`}>
                    <span>Har du Fragus serviceavtale? Huk av for det her.</span>
                  </div>


                </div>
              </div>

            </div>

          </div>

          <div>
            <h2 className="title pt-6 whitespace-nowrap">Hva gjelder henvendelsen?</h2>
          </div>

        </div>
      </BrowserView>
      <MobileView>
      <div className="grid grid-rows-2 gap-4 content-start h-28 justify-center items-center">
          <div className="w-96 grid-container">
            <div className="first-service-heading">
              <div className='flex row items-center ml-4'>
                <input
                  type="checkbox"
                  checked={serviceAgreement}
                  onChange={() => setServiceAgreement(!serviceAgreement)}
                />
                <p>Fragus serviceavtale</p>
                <div className="tooltip" id="third">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="icon-left"
                    onClick={(e) => toggleCheckboxDesc(!chkDesc)}
                  />
                  <div className={`service-desc ${chkDesc ? 'show' : null}`}>
                    <span>Har du Fragus serviceavtale? Huk av for det her.</span>
                  </div>


                </div>
              </div>

            </div>

          </div>

          <div>
            <h2 className="title pt-6 whitespace-nowrap text-center">Hva gjelder henvendelsen?</h2>
          </div>

        </div>
      </MobileView>

      <div className='grid grid-cols-1 gap-4 h-full content-start'>
        <div className="services h-full">
          {categories &&
            categories.map((category, key) => {
              return (
                <div key={key} className="service-box w-full md:w-[23.4%]">
                  <h5>{category.name}</h5>
                  {services.filter((itm) => {
                    if (itm.category_id === category.id) return true
                    return false
                  }).length <= 9 ? (
                    <StandardTemplate id={category.id} />
                  ) : (
                    <ExpandedTemplate id={category.id} />
                  )}
                </div>
              )
            })}
        </div>

        <div className="actions center">
          <div>
            <p className="label">Du har valgt</p>
            <div className="tags">
              {filtered && filtered.length > 0 ? (
                filtered.map((item, key) => {
                  return (
                    <div key={item.id} className="badge">
                      <span key={item.id}>{item.name}</span>
                      <i
                        onClick={() => {
                          removeService(vehicleDispatch, item)
                        }}
                      >
                        x
                      </i>
                    </div>
                  )
                })
              ) : (
                <span></span>
              )}
            </div>
          </div>
          <div className="buttons">
            <input className='rounded-lg'
              type="button"
              value="TILBAKE"
              onClick={() => {
                setStep(vehicleDispatch, step - 1, '/booking/services')
              }}
            />
            <input className='rounded-lg'
              type="button"
              value="NESTE"
              disabled={filtered.length === 0}
              onClick={() => {
                setStep(vehicleDispatch, 3, '/booking/services')
              }}
            />
          </div>
        </div>

        <span className='text-center'>
          Kontakt oss på tlf.{' '}
          <a className="link" href={`tel:${workshop.phone}`}>
            {workshop.phone}
          </a>{' '}
          eller{' '}
          <a className="link" href={`mailto:${workshop.email}`}>
            {workshop.email}
          </a>{' '}
          eller bruk skjemaet over.
        </span>

      </div>

    </div>
  )
}

export default Services
