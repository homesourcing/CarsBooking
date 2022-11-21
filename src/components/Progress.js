import React from 'react';

export const Progress = ({step}) => {
    return (
        <div className="progressbar-wrapper">
            <ul className="progressbar">
                <li id='p-1' className={step >= 1 ? 'active' : null}>Din bil</li>
                <li id='p-2' className={step >= 2 ? 'active' : null}>Vei tjeneste</li>
                <li id='p-3' className={step >= 3 ? 'active' : null}>Bruker info</li>
                <li id='p-4' className={step >= 4 ? 'active' : null}>Sendt bestilling</li>
            </ul>
        </div>
    )
}

export default Progress;