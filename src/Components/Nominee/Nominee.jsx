import React from 'react';
import "./Nominee.css"

function Nominee({ data, sectionId, selectNominee }) {
    const { id, selected, title, photoUrL } = data;
    return (
        // make active 
        <div className={`card ${selected ? 'active' : ''}`} onClick={() => selectNominee(sectionId, id)}>
            <div className='card-header'>
                <p className="card-header__title">{title}</p>
            </div>
            <div className="card-body">
                <div>
                    {/* // make active  */}
                    <img src={photoUrL} alt={title} className={`card-body__photo ${selected ? 'active' : ''}`} />
                </div>
            </div>
            <div className='card-footer'>
                <button className='button secondary'>{selected ? 'Selected' : 'Select'}</button>
            </div>
        </div>
    )
}

export default Nominee