import React from 'react';

function InfoTooltip({ isOpen, isClose,  text }) {

    return (
        <div className={`info-tooltip info-tooltip__overlay ${isOpen ? "info-tooltip_show" : ""}`}>
            <div className='info-tooltip__container'>
                <button className="info-tooltip__close-button" type="button" onClick={isClose}/>
                <p className='tooltip__massage'>{text}</p>
            </div>
        </div>
    )
}


export default InfoTooltip;