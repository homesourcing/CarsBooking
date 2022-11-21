import React, { useEffect, useState } from 'react'
import { BrowserView, MobileView, isMobile } from 'react-device-detect';

import VehicleInfo from './VehicleInfo'
import Spinner from '../layout/Spinner'
import { useVehicles, findPerson, submitOrder, setStep } from '../context/VehicleState'
import { useForm } from '../hooks/useForm'

import Alert from '../layout/Alert'
import '../layout/css/personal-info.css'

const PersonalInfo = ({ workshop }) => {
  const [vehicleState, vehicleDispatch] = useVehicles()
  const { vehicles, person, filtered, serviceAgreement, step, loading } = vehicleState
  const { error } = vehicleState

  const [search, setSearch] = useState('')

  // form handlers
  const { handleSubmit, handleChange, data, errors, fillData } = useForm({
    validations: {
      first_name: {
        custom: {
          isValid: (value) => (data.isBusiness ? true : value !== ''),
          message: 'This field is required',
        },
      },
      middle_name: {
        pattern: {
          value: '^[a-zA-Z" "]*$',
          message: 'Invalid input.',
        },
      },
      last_name: {
        required: {
          value: true,
          message: 'This field is required',
        },
        pattern: {
          value: '^[a-zA-Z" "]*$',
          message: 'Invalid input.',
        },
      },
      email: {
        required: {
          value: true,
          message: 'This field is required',
        },
        custom: {
          isValid: (value) =>
            value?.toLowerCase() === 'x' ||
            value?.match(
              /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ),
          message: 'Invalid email address',
        },
      },
      phone: {
        required: {
          value: true,
          message: 'This field is required',
        },
        // pattern: {
        //     value: '^[0-9]*$',
        //     message: "Invalid number.",
        // },
      },
      street: {
        required: {
          value: true,
          message: 'This field is required',
        },
      },
      zip: {
        required: {
          value: true,
          message: 'This field is required',
        },
      },
      city: {
        required: {
          value: true,
          message: 'This field is required',
        },
      },
    },
    onSubmit: () => {
      submitOrder(vehicleDispatch, data)
    },
  })

  useEffect(() => {
    console.log(person);
    fillData({
      workshop_id: workshop.workshop_id,
      first_name: person.fornavn === undefined ? '' : person.fornavn?.split(' ')[0],
      middle_name: person.fornavn?.split(' ')[1] || '',
      last_name: person.etternavn,
      email: person.epost,
      street: Object.keys(person).length === 0 ? '' : `${person.veinavn} ${person.husnr}`,
      zip: person.postnr,
      city: person.poststed,
      phone: person.tlfnr,
      regno: vehicles.kjennemerke,
      order_type_name: filtered.map((item) => item.name).join('|'),
      order_type_duration: filtered.map((item) => item.duration).join('|'),
      request: person.request ?? '',
      message: person.message ?? '',
      isBusiness: person.virkkode === 'N',
      service_agreement: serviceAgreement,
      // ...person
    })

    // instruct eslint regarding dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person, filtered])

  const onSearch = (e) => setSearch(e.target.value)

  return (
    <div className="w3">

      {error && <Alert type="error" message={error} />}
      {loading && <Spinner />}

      <VehicleInfo vehicle={vehicles} />

      <div className="personal-info">
        <h2 className="title">Legg inn informasjon</h2>

        <div>
          <label className='input-label'>+47</label>
          <input
            type="text"
            placeholder=""
            className={`text-center ${isMobile ? "w-32" : ""}`}
            id="search"
            name="search"
            value={search}
            onChange={onSearch}
          />
          <input
            className="green-button m-0"
            type="button"
            value="SØK"
            disabled={search?.length === 0}
            onClick={() => {
              findPerson(vehicleDispatch, search)
            }}
          />
        </div>

        <form onSubmit={handleSubmit} method="post">
          <BrowserView>
            <div>

              <div className='grid grid-cols-2 gap-4'>
                <div className="leftcontact grid-rows-3">
                  {Object.keys(person).length === 0 || person.virkkode === 'P' ? (
                    <div className='grid grid-cols-3 gap-4 h-[4.5rem]'>
                      <div className="">
                        <p>Fornavn *</p>
                        <input
                          type="text"
                          name="first_name"
                          className='w-full'
                          value={data.first_name || ''}
                          onChange={handleChange('first_name')}
                        />
                        {errors.first_name && <p className="error">{errors.first_name}</p>}
                      </div>
                      <div className="">
                        <p>Mellomnavn</p>
                        <input
                          type="text"
                          name="middle_name"
                          className='w-full'
                          value={data.middle_name || ''}
                          onChange={handleChange('middle_name')}
                        />
                        {errors.middle_name && <p className="error">{errors.middle_name}</p>}
                      </div>
                      <div className="">
                        <p>Etternavn *</p>
                        <input
                          type="text"
                          name="last_name"
                          className='w-full'
                          value={data.last_name || ''}
                          onChange={handleChange('last_name')}
                        />
                        {errors.last_name && <p className="error">{errors.last_name}</p>}
                      </div>
                    </div>
                  ) : (

                    <div className="grid h-[4.5rem]">
                      <p>Firmanavn *</p>
                      <input
                        type="text"
                        name="last_name"
                        className='w-full'
                        value={data.last_name || ''}
                        onChange={handleChange('last_name')}
                      />
                      {errors.last_name && <p className="error">{errors.last_name}</p>}
                    </div>

                  )}
                  <div className="grid grid-cols-2 gap-4 h-[4.5rem]">
                    <div className="grid grid-rows-2">
                      <div>
                        <p>E-post *</p>
                        <input
                          type="text"
                          name="email"
                          className='w-full'
                          value={data.email || ''}
                          onChange={handleChange('email')}
                        />
                      </div>
                      <div>
                        {errors.email && <p className="error">{errors.email}</p>}
                        <p style={{ fontSize: '0.5rem' }}>
                          Sett X dersom du ikke ønsker å oppgi e-postadresse
                        </p>
                      </div>
                    </div>
                    <div>
                      <p>Telefonnummer *</p>
                      <div className='flex'>
                        <div className='input-label-grey w-1/6'>+47</div>
                        <div className='w-full border-l-transparent'>
                          <input
                            type="text"
                            name="phone"
                            className='w-full phone-input'
                            value={data.phone || ''}
                            onChange={handleChange('phone')}
                          />
                          {errors.phone && <p className="error">{errors.phone}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-3 gap-4 h-[4.5rem]'>
                    <div className="form-group col-2">
                      <p>Gate *</p>
                      <input
                        type="text"
                        name="street"
                        className='w-full'
                        value={data.street || ''}
                        onChange={handleChange('street')}
                      />
                      {errors.street && <p className="error">{errors.street}</p>}
                    </div>
                    <div className="form-group col-2">
                      <p>Postnr *</p>
                      <input
                        type="text"
                        name="zip"
                        className='w-full'
                        value={data.zip || ''}
                        onChange={handleChange('zip')}
                      />
                      {errors.zip && <p className="error">{errors.zip}</p>}
                    </div>
                    <div className="form-group col-2">
                      <p>Posted *</p>
                      <input
                        type="text"
                        name="city"
                        className='w-full'
                        value={data.city || ''}
                        onChange={handleChange('city')}
                      />
                      {errors.city && <p className="error">{errors.city}</p>}
                    </div>
                  </div>
                </div>

                <div className="rightcontact grid-rows-2 border-l-2 pl-8 border-dotted">
                  <div className='h-20'>
                    <p>Ønske for tidspunkt? (valgfritt) </p>
                    <input
                      type="text"
                      name="request"
                      value={data.request || ''}
                      onChange={handleChange('request')}
                    />
                  </div>
                  <div className="form-group">
                    <p>Beskjed til verksted (valgfritt) </p>
                    <textarea
                      name="message"
                      value={data.message || ''}
                      onChange={handleChange('message')}
                    />
                  </div>
                </div>
              </div>

              <div className="footer actions center mt-10">
                <div>
                  <p className="label">Du har valgt</p>
                  <div className="tags">
                    {filtered && filtered.length > 0 ? (
                      filtered.map((item, key) => {
                        return (
                          <div key={item.id} className="badge">
                            <span key={item.id}>{item.name}</span>
                          </div>
                        )
                      })
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div className="buttons">
                <input type="submit" className='green-button w-40' value="SEND BESTILLING" style={{float: 'right'}} />
                  <input
                    type="button"
                    value="TILBAKE"
                    className='btn-blue w-40'
                    style={{float: 'right'}}
                    onClick={() => {
                      setStep(vehicleDispatch, step - 1, '/booking/services')
                    }}
                  />
                </div>
              </div>

            </div>
          </BrowserView>
          <MobileView>
            <div>

              <div className='grid gap-4'>
                <div className="leftcontact grid-rows-6">
                  {Object.keys(person).length === 0 || person.virkkode === 'P' ? (
                    <div className=''>
                      <div>
                        <p>Fornavn *</p>
                        <input
                          className='w-full'
                          type="text"
                          name="first_name"
                          value={data.first_name || ''}
                          onChange={handleChange('first_name')}
                        />
                        {errors.first_name && <p className="error">{errors.first_name}</p>}
                      </div>
                      <div>
                        <p>Mellomnavn</p>
                        <input
                          type="text"
                          className='w-full'
                          name="middle_name"
                          value={data.middle_name || ''}
                          onChange={handleChange('middle_name')}
                        />
                        {errors.middle_name && <p className="error">{errors.middle_name}</p>}
                      </div>
                      <div>
                        <p>Etternavn *</p>
                        <input
                          className='w-full'
                          type="text"
                          name="last_name"
                          value={data.last_name || ''}
                          onChange={handleChange('last_name')}
                        />
                        {errors.last_name && <p className="error">{errors.last_name}</p>}
                      </div>
                    </div>
                  ) : (

                    <div className="">
                      <p>Firmanavn *</p>
                      <input
                        type="text"
                        name="last_name"
                        value={data.last_name || ''}
                        onChange={handleChange('last_name')}
                      />
                      {errors.last_name && <p className="error">{errors.last_name}</p>}
                    </div>

                  )}
                  <div className="mb-2">
                    <p>E-post *</p>
                    <input
                      type="text"
                      name="email"
                      className='w-full'
                      value={data.email || ''}
                      onChange={handleChange('email')}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <p style={{ fontSize: '0.5rem' }}>
                      Sett X dersom du ikke ønsker å oppgi e-postadresse
                    </p>
                  </div>
                  <div className="">
                    <p>Telefonnummer *</p>
                    <div className='flex'>
                      <div className='input-label-grey w-1/6 h-[2.1rem]'>+47</div>
                      <div className='w-full border-l-transparent'>
                        <input
                          type="text"
                          name="phone"
                          className='w-full phone-input'
                          value={data.phone || ''}
                          onChange={handleChange('phone')}
                        />
                        {errors.phone && <p className="error">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="form-group col-2">
                    <p>Gate *</p>
                    <input
                      className='w-full'
                      type="text"
                      name="street"
                      value={data.street || ''}
                      onChange={handleChange('street')}
                    />
                    {errors.street && <p className="error">{errors.street}</p>}
                  </div>
                  <div className="form-group col-2">
                    <p>Postnr *</p>
                    <input
                      className='w-full'
                      type="text"
                      name="zip"
                      value={data.zip || ''}
                      onChange={handleChange('zip')}
                    />
                    {errors.zip && <p className="error">{errors.zip}</p>}
                  </div>
                  <div className="form-group col-2">
                    <p>Posted *</p>
                    <input
                      className='w-full'
                      type="text"
                      name="city"
                      value={data.city || ''}
                      onChange={handleChange('city')}
                    />
                    {errors.city && <p className="error">{errors.city}</p>}
                  </div>

                </div>


                <div className='grid-rows-2 border-t-2 pt-2 border-dotted'>
                  <p>Ønske for tidspunkt? (valgfritt) </p>
                  <input
                    className='w-full'
                    type="text"
                    name="request"
                    value={data.request || ''}
                    onChange={handleChange('request')}
                  />
                </div>
                <div className="form-group">
                  <p>Beskjed til verksted (valgfritt) </p>
                  <textarea
                    className='w-full'
                    name="message"
                    value={data.message || ''}
                    onChange={handleChange('message')}
                  />
                </div>

              </div>

              <div className="footer actions center mt-10">
                <div>
                  <p className="label">Du har valgt</p>
                  <div className="tags">
                    {filtered && filtered.length > 0 ? (
                      filtered.map((item, key) => {
                        return (
                          <div key={item.id} className="badge">
                            <span key={item.id}>{item.name}</span>
                          </div>
                        )
                      })
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <div className="buttons">
                  <input
                    type="button"
                    value="TILBAKE"
                    className='btn-blue w-40 mb-2'
                    onClick={() => {
                      setStep(vehicleDispatch, step - 1, '/booking/services')
                    }}
                  />
                  <input type="submit" className='green-button w-40' value="SEND BESTILLING" />
                </div>
              </div>

            </div>
          </MobileView>
        </form>
      </div>
      <div className='text-center'>
        <span>
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

export default PersonalInfo
