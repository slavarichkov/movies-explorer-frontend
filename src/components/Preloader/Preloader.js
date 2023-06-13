import React, { useState } from 'react'
import './Preloader.css'

const Preloader = ({ handleLoad }) => {

    const [isLoad, setIsLoad] = useState(false);


    return (
        <div className={`preloader${handleLoad ? "preloader_active" : ""}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div >
    )
};

export default Preloader
