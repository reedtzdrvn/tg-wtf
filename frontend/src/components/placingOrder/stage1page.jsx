import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import "./placingorder.css";

const Stage1Page = (props) => {
    return ( 
        <div className="formOrderPlacingStage1 flex flex-col gap-[16px] mt-[20px]">
                    <div className="flex flex-col gap-[8px]">
                        <label className="labelPlacingInput" htmlFor="NamePerson">Your Name</label>
                        <input id="NamePerson" type="text" placeholder="Charlene Reed" className="inputPlacing"/>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <label className="labelPlacingInput" htmlFor="UserNameTelegram">User Name <span className="ddff">Telegram</span></label>
                        <input id="UserNameTelegram" type="text" placeholder="@Charlene Reed " className="inputPlacing"/>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <label className="labelPlacingInput" htmlFor="Email">Email</label>
                        <input id="Email" type="text" placeholder="charlenereed@gmail.com " className="inputPlacing"/>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <label className="labelPlacingInput" htmlFor="Country">Country</label>
                        <input id="Country" type="text" placeholder="Russia" className="inputPlacing"/>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <label className="labelPlacingInput" htmlFor="City">City</label>
                        <input id="City" type="text" placeholder="Moscow" className="inputPlacing"/>
                    </div>
                    <div className="inputNumber flex justify-between items-center w-full">
                        <PhoneInput
                            country={'ru'}
                            value={props.value}
                            onChange={props.setValue}
                        />
                        
                        <div onClick={() => props.setEditional(true)} className="cursor-pointer flex items-center justify-between px-[10px] h-[40px] butonAdditional">Additional number</div>
                    </div>
                    { props.editional ?
                        <div>
                            <PhoneInput
                                country={'ru'}
                                value={props.value2}
                                onChange={props.setValue2}
                            />
                        </div> : ""
                    }
                    <div className="flex justify-center items-center mt-[64px]">
                        <div onClick={() => props.setStage(2)} className="cursor-pointer nextPageButton w-[75%] flex items-center justify-center">
                            Next
                        </div>
                    </div>
                    
                </div>
     );
}
 
export default Stage1Page;