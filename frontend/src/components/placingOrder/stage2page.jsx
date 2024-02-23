import { useState } from "react";
const Stage2Page = (props) => {

    const [editional, setEditional] = useState(false)

    return ( 
        <div className="formOrderPlacingStage1 flex flex-col gap-[16px] mt-[20px]">
             <div className="flex flex-col gap-[8px]">
                <label className="labelPlacingInput" htmlFor="Adress">Present Address</label>
                <input id="Adress" type="text" placeholder="San Jose, California, USA" className="inputPlacing"/>
            </div>
            <div className="flex flex-col gap-[8px]">
                <label className="labelPlacingInput" htmlFor="Apartment">Apartment number</label>
                <input id="Apartment" type="text" placeholder="4" className="inputPlacing"/>
            </div>
            <div className="flex flex-col gap-[8px]">
                <label className="labelPlacingInput" htmlFor="postcode">Postal Code</label>
                <div className="flex justify-between"> 
                    <input id="postcode" type="text" placeholder="4" className="inputPlacing w-[120px]"/>
                    <div onClick={() => setEditional(true)} className="butonAdditional2 px-[12px] flex items-center justify-center cursor-pointer">Additional address</div>
                </div>
                {editional ? 
                    <input id="postcode2" type="text" placeholder="4" className="inputPlacing w-[120px] mt-[8px]"/> 
                    : ""
                }
            </div>
            <div className="flex flex-col gap-[8px]">
                <label className="labelPlacingInput" htmlFor="Information">Additional Information</label>
                <textarea id="Information" type="text" placeholder="4" className="inputPlacing lolkek py-[12px]"/>
            </div>
            <div className="flex justify-center items-center mt-[64px]">
                <div onClick={() => props.setStage(3)} className="cursor-pointer nextPageButton w-[75%] flex items-center justify-center">
                    Next
                </div>
            </div>
        </div>
     );
}
 
export default Stage2Page;