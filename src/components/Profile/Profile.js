import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import currentUserContext from './../../utils/CurrentUserContext/CurrentUserContext';

function Profile({ nameUser }) {

    // Стейты, в которых содержятся значения инпута
    const [isName, setISName] = useState('');
    const [isEmail, setIsEmail] = useState('');
    const [validationMassegeName, setValidationMassegeName] = useState('');
    const [validationMassegeEmail, setValidationMassegeEmail] = useState('');
    const [validationAll, setValidationAll] = useState(true);
    const navigate = useNavigate();
    const currentUser = useContext(currentUserContext); // подписаться на контекст


    //передать данные  из инпутов
    function handleChangeName(e) {
        setISName(e.target.value);
        setValidationMassegeName(e.target.validationMessage);
        console.log(e.target.value)
    }

    function handleChangeEmail(e) {
        setIsEmail(e.target.value);
        setValidationMassegeEmail(e.target.validationMessage);
    }


    function redirectPage() {
        navigate('/signin')
    }

    useEffect(() => {
        (validationMassegeName === '' && validationMassegeEmail === '')
            ? setValidationAll(false) : setValidationAll(true)
    }, [validationMassegeName, validationMassegeEmail])

    useEffect(() => {//передать данные юзера в инпуты
        setISName(currentUser.name);
        setIsEmail(currentUser.email);
    }, [currentUser])

    return (
        <section className="profile">
            <PopupWithForm
                withName={true}
                withEmail={true}
                withPassword={false}
                text={`Привет, ${currentUser.name}!`}
                textButtonSubmit="Редактировать"
                popup_style="popup__profile"
                title_style="popup__title-profile"
                submit_style="popup__button-submit-profile"
                placeholderName={isName}
                placeholderEmail={isEmail}
                validationOptions={validationAll}
                handleChangeName={handleChangeName}
                handleChangeEmail={handleChangeEmail}
                validationName={validationMassegeName}
                validationEmail={validationMassegeEmail}
                buttonUnderText={
                    <button to='signup' className="popup__button-under-submit popup__button-under-submit_profile" onClick={redirectPage}>Выйти из аккаунта</button>
                }
            />
        </section>
    )
}

export default Profile;