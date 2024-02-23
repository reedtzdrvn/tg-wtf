import basket from "../../images/basket-active.svg";
import user from "../../images/fi-rr-user.svg";
import { useState } from "react";
import "./placingorder.css";
import Stage1Page from "./stage1page";
import Stage2Page from "./stage2page";
import Stage3Page from "./stage3page";

const PlacingOrder = () => {
    const [stage, setStage] = useState(1);
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    const [editional, setEditional] = useState(false)

    const [name, setName] = useState('')
    const [telegramName, setTelegramName] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')

    const [address, setAddress] = useState('')
    const [appNumber, setAppNumber] = useState('')
    const [postcode1, setPostcode1] = useState('')
    const [postcode2, setCisetPostcode2] = useState('')
    const [information, setInformation] = useState('')

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
                        setValue={setValue} 
                        setValue2={setValue2} 
                        setEditional={setEditional} 
                        setStage={setStage} 
                        value={value} 
                        value2={value2} 
                        editional={editional} 
                    /> :
                    stage === 2 ?
                    <Stage2Page 
                        setStage={setStage} 
                    /> :
                    stage === 3 ?
                    <Stage3Page 
                        setValue={setValue} 
                        setValue2={setValue2} 
                        setEditional={setEditional} 
                        setStage={setStage} 
                        value={value} 
                        value2={value2} 
                        editional={editional} 
                    /> : "Ошибка формы"
                }
            </form>
        </div>
     );
}
 
export default PlacingOrder;
