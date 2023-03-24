import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PopupWithForm from "../PopupWithForm/PopupWithForm"
import img from './../../images/logo-header.svg'

function Register({ onRegister }) {

    const navigate = useNavigate();
    // Стейты, в которых содержятся значения инпута
    const [isName, setISName] = useState('');
    const [isEmail, setIsEmail] = useState('');
    const [isPassword, setIsPassword] = useState('');
    const [validationMassegeName, setValidationMassegeName] = useState('Введите имя');
    const [validationMassegePassword, setValidationMassegePassword] = useState('Введите пароль');
    const [validationMassegeEmail, setValidationMassegeEmail] = useState('Введите Email');
    const [validationAll, setValidationAll] = useState(true);

    //передать данные  из инпутов
    function handleChangeName(e) {
        setISName(e.target.value);
        setValidationMassegeName(e.target.validationMessage);
    }

    function handleChangePassword(e) {
        setIsPassword(e.target.value);
        setValidationMassegePassword(e.target.validationMessage);
    }

    function handleChangeEmail(e) {
        setIsEmail(e.target.value);
        setValidationMassegeEmail(e.target.validationMessage);
    }

    function handleSubmit(e) { //пробросить данные из инпутов наверх
        e.preventDefault();
        onRegister({
            name: isName,
            email: isEmail,
            password: isPassword,
        });
    }


    function redirectPage() {
        navigate('/signin')
    }

    useEffect(() => {
        (validationMassegeName === '' && validationMassegePassword === '' && validationMassegeEmail === '')
            ? setValidationAll(false) : setValidationAll(true)
    }, [validationMassegeName, validationMassegePassword, validationMassegeEmail])

    return (
        <div className="register">
            <PopupWithForm
                withName={true}
                withEmail={true}
                withPassword={true}
                withSubmitButtons={true}
                onSubmit={handleSubmit}
                validationOptions={validationAll}
                handleChangeName={handleChangeName}
                handleChangePassword={handleChangePassword}
                handleChangeEmail={handleChangeEmail}
                validationName={validationMassegeName}
                validationEmail={validationMassegeEmail}
                validationPassword={validationMassegePassword}
                text={"Доброе пожаловать!"}
                textButtonSubmit="Зарегистрироваться"
                buttonUnderText={
                    <div className="popup__container-elements">
                        <p className="popup__text-under-submit">Уже зарегистрированы?</p>
                        <button to='signup' className="popup__button-under-submit" onClick={redirectPage}>Войти</button>
                    </div>
                }
                buttonUp={
                    <img className="popup__img-up-form" src={img} alt="лого" />
                }
            />
        </div>
    )
}

export default Register;