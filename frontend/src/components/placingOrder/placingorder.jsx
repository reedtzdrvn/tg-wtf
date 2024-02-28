import basket from "../../images/basket-active.svg";
import user from "../../images/fi-rr-user.svg";
import { useState, useEffect } from "react";
import "./placingorder.css";
import Stage1Page from "./stage1page";
import Stage2Page from "./stage2page";
import Stage3Page from "./stage3page";

import axios from '../../axios.js'

const PlacingOrder = () => {

    let tg = window.Telegram.WebApp;
    const userId = tg.initDataUnsafe.user.id;

    const [stage, setStage] = useState(1);
    const [valueNumber1, setValueNumber1] = useState('');
    const [valueNumber2, setValueNumber2] = useState('');

    const [name, setName] = useState('')
    const [telegramName, setTelegramName] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')

    const [address, setAddress] = useState('')
    const [appNumber, setAppNumber] = useState('')
    const [postcode1, setPostcode1] = useState('')
    const [postcode2, setPostcode2] = useState('')
    const [information, setInformation] = useState('')

    useEffect(() => {
        axios.get(`/user`, { params: { telegramId: userId } })
            .then(response => {
                const {firstName, lastName, phoneNumber, userName} = response.data[0]
                let fullName = `${firstName} ${lastName}`
                setName(fullName)
                setValueNumber1(phoneNumber)
                setTelegramName(`@${userName}`)
            })
            .catch(error => {
                console.error('Ошибка при получении JSON файла', error);
            });
      }, []);

    return ( 
        <div className="mx-[8.5%] mt-[24px] page">
            <div className="flex gap-[10px] items-center">
                <img src={ stage===3 ? user : basket} alt="1" className="w-[30px] h-[30px]"/>
                <div className="flex justify-between w-full items-center">
                    <div className="PlacingTextTitle">{stage === 3 ? <div className="flex flex-col kkff "><div>Confirmation of</div><div>information</div></div> :"Placing an order"}</div>
                    <div className="titleStage">Stage {stage}</div>
                </div>
            </div>
            <form action="">
                {
                    stage === 1 ? 
                    <Stage1Page 
                        setValue={setValueNumber1} 
                        setValue2={setValueNumber2}  
                        setStage={setStage} 
                        value={valueNumber1} 
                        value2={valueNumber2} 
                        name={name}
                        setName={setName}
                        telegramName={telegramName}
                        setTelegramName={setTelegramName}
                        email={email}
                        setEmail={setEmail}
                        country={country}
                        setCountry={setCountry}
                        city={city}
                        setCity={setCity}

                    /> :
                    stage === 2 ?
                    <Stage2Page
                        setStage={setStage} 
                        address={address}
                        setAddress={setAddress}
                        appNumber={appNumber}
                        setAppNumber={setAppNumber}
                        postcode1={postcode1}
                        setPostcode1={setPostcode1}
                        postcode2={postcode2}
                        setPostcode2={setPostcode2}
                        information={information}
                        setInformation={setInformation}
                    /> :
                    stage === 3 ?
                    <Stage3Page 
                        setStage={setStage} 
                        name={name}
                        telegramName={telegramName}
                        email={email}
                        address={address}
                        value={valueNumber1} 
                        value2={valueNumber2} 
                        country={country}
                        city={city}
                        postcode1={postcode1}
                        postcode2={postcode2}
                    /> : "Ошибка формы"
                }
            </form>
        </div>
     );
}
 
export default PlacingOrder;
