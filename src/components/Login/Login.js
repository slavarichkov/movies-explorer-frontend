import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupWithForm from "../PopupWithForm/PopupWithForm"

import img from './../../images/logo-header.svg'

function Login() {

    const navigate = useNavigate();

    // Стейты, в которых содержятся значения инпута
    const [isEmail, setIsEmail] = useState('');
    const [isPassword, setIsPassword] = useState('');
    const [validationMassegePassword, setValidationMassegePassword] = useState('Введите пароль');
    const [validationMassegeEmail, setValidationMassegeEmail] = useState('Введите Email');
    const [validationAll, setValidationAll] = useState(true);

    //передать данные  из инпутов
    function handleChangePassword(e) {
        setIsPassword(e.target.value);
        setValidationMassegePassword(e.target.validationMessage);
        console.log(e.target.validationMessage)
    }

    function handleChangeEmail(e) {
        setIsEmail(e.target.value);
        setValidationMassegeEmail(e.target.validationMessage);
    }


    function redirectPage() {
        navigate('/signin')
    }

    useEffect(() => {
        (validationMassegePassword === '' && validationMassegeEmail === '')
            ? setValidationAll(false) : setValidationAll(true)
    }, [validationMassegePassword, validationMassegeEmail])

    return (
        <div className="login">
            <PopupWithForm
                withName={false}
                withEmail={true}
                withPassword={true}
                withSubmitButtons={true}
                text={"Рады видеть!"}
                textButtonSubmit="Войти"
                validationOptions={validationAll}
                handleChangePassword={handleChangePassword}
                handleChangeEmail={handleChangeEmail}
                validationEmail={validationMassegeEmail}
                validationPassword={validationMassegePassword}
                buttonUnderText={
                    <div className="popup__container-elements">
                        <p className="popup__text-under-submit">Ещё не зарегистрированы?</p>
                        <button to='signup' className="popup__button-under-submit" onClick={redirectPage}>Регистрация</button>
                    </div>
                }
                buttonUp={
                    <img className="popup__img-up-form" src={img} alt="лого" />
                }
            />
        </div >
    )
}

export default Login;