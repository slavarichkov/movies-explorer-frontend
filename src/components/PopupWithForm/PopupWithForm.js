import React from 'react';

function PopupWithForm({
    name,
    text,
    onSubmit,
    validationOptions,
    validationName,
    textButtonSubmit,
    colorButtonSubmit,
    buttonUnderText,
    buttonUp,
    handleChangeEmail,
    validationEmail,
    handleChangePassword,
    validationPassword,
    handleChangeName,
    withName,
    withEmail,
    withPassword,
    popup_style,
    title_style,
    submit_style,
}) {

    console.log(validationOptions)

    return (

        < div className={`popup ${popup_style}`}>
            <div className="popup__content">
                <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
                    {buttonUp}
                    <h2 className={`popup__title ${title_style}`}>{text}</h2>
                    <div className="popup__set">
                        {withName ? <div className="popup__input-conainer">
                            <p className="popup__input-name">Имя</p>
                            <input type="text" placeholder="" className={`popup__input ${validationName ? "popup__input_error" : ""}`}
                                id="username-input" minLength="2" onChange={handleChangeName} required
                            />
                            <span className="popup__text-error" id="error-firstname">{validationName}</span>
                        </div> : <></>}
                        {withEmail ? <div className="popup__input-conainer">
                            <p className="popup__input-name">E-mail</p>
                            <input type="email" placeholder="" className={`popup__input ${validationEmail ? "popup__input_error" : ""}`}
                                id="username-input" minLength="2" onChange={handleChangeEmail} required
                            />
                            <span className="popup__text-error" id="error-firstname">{validationEmail}</span>
                        </div> : <></>}
                        {withPassword ? <div className="popup__input-conainer">
                            <p className="popup__input-name">Пароль</p>
                            <input type="password" className={`popup__input ${validationPassword ? "popup__input_error" : ""}`}
                                id="username-input" minLength="2" onChange={handleChangePassword} required
                            />
                            <span className="popup__text-error" id="error-firstname">{validationPassword}</span>
                        </div> : <></>}
                    </div>
                    <button className={`popup__button_submit ${submit_style}`} type="submit" disabled={validationOptions}>{textButtonSubmit}</button>
                    {buttonUnderText}
                </form>
            </div>
        </div >
    )
}

export default PopupWithForm;