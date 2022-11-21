import React from 'react'

export const SearchBox = ({ showResults, vehicle, setShowResults, setShowModal }) => {

    const formatDate = (date) => {
        try {
            const dateFormatter = new Intl.DateTimeFormat('nb', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            })
            const [{ value: day }, , { value: month }, , { value: year }] = dateFormatter.formatToParts(
                new Date(date)
            )
            return `${day}. ${month} ${year}`
        } catch (e) {
            return '- Ikke tilgjengelig -'
        }
    }

    return (
        <>
            {showResults && vehicle ? (
                <div className="grid search-box">
                    <h5>
                        Neste kontrollperiode er{' '}
                        <strong>
                            <time>{formatDate(vehicle.nestePKK)}</time>
                        </strong>
                    </h5>
                    <p style={{ fontSize: '13px' }}>
                        Sist godkjent{' '}
                        <time>
                            <strong>{formatDate(vehicle.sistPKKgodkj)}</strong>
                        </time>
                    </p>
                    <p style={{ fontSize: '13px' }}>
                        {vehicle.kjennemerke} - {vehicle.merkeNavn} {vehicle.modellbetegnelse}{' '}
                        {vehicle.regAAr}
                    </p>

                    <div className="mt-4">
                        <input
                            type="button"
                            className="btn-black w-40"
                            onClick={() => {
                                setShowResults(false)
                            }}
                            value="Lukk"
                        />
                        <input
                            type="button"
                            className="btn-blue"
                            onClick={() => {
                                setShowResults(false)
                                setShowModal(true)
                                // orderButtonClicked()
                            }}
                            value="Bestill EU-kontroll"
                        />
                    </div>
                </div>
            ) : null}
        </>
    )
}