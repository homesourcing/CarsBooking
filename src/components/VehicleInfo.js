import React from 'react'

import background from '../layout/assets/images/bg-header.png'
import flag from '../layout/assets/images/no-flag.png'

const VehicleInfo = ({ vehicle }) => {
  return (
    <div className="flex flex-row w-full h-12 items-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="sec-flag flex flex-row w-44 bg-white rounded-lg h-8 p-[1px]">
        <div className='flex row pl-1 w-[40px] items-center rounded-l-lg' style={{ backgroundColor: '#1A51A0', width: '60px;' }}>
          <img alt="flag" className='px-1 w-28' src={flag} />
        </div>
        <div className='w-28 text-center pt-[4px] default-text'>{vehicle?.kjennemerke}</div>
      </div>
      <div className='sec-carname grid grid place-items-end'>
        <div className="bg-white text-center rounded-lg h-8 pt-[4px] default-text">
          {`${vehicle?.merkeNavn} ${vehicle?.modellbetegnelse} ${vehicle?.regAAr}`}
        </div>
      </div>
    </div>
  )
}

export default VehicleInfo
