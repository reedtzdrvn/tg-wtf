import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import user from "../../images/fi-rr-user.svg"
import "./EditProfile.css";
import { useState, useEffect } from "react";
import axios from '../../axios.js'
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {

    const [firstname, setFirstName] = useState(null)
    const [lastname, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [phonenumber, setPhone] = useState(null)
    let navigate = useNavigate();

    let tg = window.Telegram.WebApp;

    let userId = ''
  
    if (!tg.initDataUnsafe.user){
      userId='703999322'
    }
    else{
      userId=tg.initDataUnsafe.user?.id
    }
  
    useEffect(() => {
        axios.get(`/user`, { params: { telegramId: userId } })
            .then(response => {
                const {firstName, lastName, phoneNumber, email} = response.data[0]
                setFirstName(firstName)
                setLastName(lastName)
                setEmail(email)
                setPhone(phoneNumber)
            })

            .catch(error => {
                console.error('Ошибка при получении JSON файла', error);
            });
      }, []);


    const handlerConfirm = () => {
        axios.post('/updateuser', {firstName: firstname, lastName: lastname, email: email, phoneNumber: phonenumber, telegramId: userId})
            .then(response => {
                navigate('/account');
            })

        .catch(error => {
            console.error('Ошибка при получении JSON файла', error);
        });
    }

    return (

        <div className ="mx-[8.5%] mt-[24px] page">
            <div className="flex gap-[10px] items-center">
                <img src={user} alt="1" className="w-[30px] h-[30px]"/>
                <div className="flex justify-between w-full items-center">
                    <div className="PlacingTextTitle"><div className="flex flex-col kkff "><div>Edit Profile</div></div></div>
                </div>
            </div>
            <div className="formOrderPlacingStage1 flex flex-col gap-[16px] mt-[20px]">
                    <div className="flex flex-col gap-[8px]">
                        <label className="labelPlacingInput" htmlFor="FirstNamePerson">Your First Name</label>
                        <input id="FirstNamePerson" type="text" required value={firstname} onChange={(e) => setFirstName(e.target.value)} placeholder="Charlene" className="inputPlacing"/>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <label className="labelPlacingInput" htmlFor="LastNamePerson">Your Last Name</label>
                        <input id="LastNamePerson" type="text" required value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder="Reed" className="inputPlacing"/>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <label className="labelPlacingInput" htmlFor="Email">Email</label>
                        <input id="Email" type="text" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="charlenereed@gmail.com " className="inputPlacing"/>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <label className="labelPlacingInput" htmlFor="PhoneNumbrer">Phone Number</label>
                    </div>
                    <div className="inputNumber flex items-center w-full">
                        <PhoneInput
                            country={'ru'}
                            value={phonenumber}
                            onChange={setPhone}
                            required
                        />
                    </div>
                    <div className="flex justify-center items-center mt-[60px]">
                        <div onClick={handlerConfirm} className="cursor-pointer nextPageButton w-[75%] flex items-center justify-center">
                            Confirm
                        </div>
                    </div>
                </div>
        </div>
     );
}
 
export default EditProfile;