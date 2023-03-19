import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupWithForm from "../PopupWithForm/PopupWithForm"

function Profile({ nameUser }) {

    // Стейты, в которых содержятся значения инпута
    const [isName, setISName] = useState('');
    const [isEmail, setIsEmail] = useState('');
    const [validationMassegeName, setValidationMassegeName] = useState('Введите имя');
    const [validationMassegeEmail, setValidationMassegeEmail] = useState('Введите Email');
    const [validationAll, setValidationAll] = useState(true);

    //передать данные  из инпутов
    function handleChangeName(e) {
        setISName(e.target.value);
        setValidationMassegeName(e.target.validationMessage);
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


    const navigate = useNavigate();

    function redirectPage() {
        navigate('/sign-up')
    }

    return (
        <section className="profile">
            <PopupWithForm
                withName={true}
                withEmail={true}
                withPassword={false}
                text={`Привет, ${nameUser}!`}
                textButtonSubmit="Редактировать"
                popup_style="popup__profile"
                title_style="popup__title-profile"
                submit_style="popup__button-submit-ptofile"
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