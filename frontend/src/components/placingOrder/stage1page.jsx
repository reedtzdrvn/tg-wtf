import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import "./placingorder.css";
import { useState } from 'react';

const Stage1Page = (props) => {

    const [editional, setEditional] = useState(false)

    const handleNextClick = () => {
        if (
            props.name.trim() === '' ||
            props.telegramName.trim() === '' ||
            props.email.trim() === '' ||
            props.country.trim() === '' ||
            props.city.trim() === '' ||
            props.value.trim() === ''
        ) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        props.setStage(2);
    };

    return ( 
        <div className="formOrderPlacingStage1 flex flex-col gap-[16px] mt-[20px]">
                    <div className="flex flex-col gap-[8px]">
                        <label className="labelPlacingInput" htmlFor="NamePerson">Your Name*</label>
                        <input id="NamePerson" type="text" required value={props.name} onChange={(e) => props.setName(e.target.value)} placeholder="Charlene Reed" className="inputPlacing"/>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <label className="labelPlacingInput" htmlFor="UserNameTelegram">User Name* <span className="ddff">Telegram</span></label>
                        <input id="UserNameTelegram" type="text" required value={props.telegramName} onChange={(e) => props.setTelegramName(e.target.value)} placeholder="@Charlene Reed " className="inputPlacing"/>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <label className="labelPlacingInput" htmlFor="Email">Email*</label>
                        <input id="Email" type="text" required value={props.email} onChange={(e) => props.setEmail(e.target.value)} placeholder="charlenereed@gmail.com " className="inputPlacing"/>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <label className="labelPlacingInput" htmlFor="Country">Country*</label>
                        <input id="Country" type="text" required value={props.country} onChange={(e) => props.setCountry(e.target.value)} placeholder="Russia" className="inputPlacing"/>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <label className="labelPlacingInput" htmlFor="City">City*</label>
                        <input id="City" type="text" required value={props.city} onChange={(e) => props.setCity(e.target.value)}  placeholder="Moscow" className="inputPlacing"/>
                    </div>
                    <div className="inputNumber flex justify-between items-center w-full">
                        <PhoneInput
                            country={'ru'}
                            value={props.value}
                            onChange={props.setValue}
                            required
                        />
                        
                        <div onClick={() => setEditional(!editional)} className="cursor-pointer flex items-center justify-between px-[10px] h-[40px] butonAdditional">Additional number</div>
                    </div>
                    { editional ?
                        <div>
                            <PhoneInput
                                country={'ru'}
                                value={props.value2}
                                onChange={props.setValue2}
                            />
                        </div> : ""
                    }
                    <div className="flex justify-center items-center mt-[64px]">
                        <div onClick={handleNextClick} className="cursor-pointer nextPageButton w-[75%] flex items-center justify-center">
                            Next
                        </div>
                    </div>
                    
                </div>
     );
}
 
export default Stage1Page;