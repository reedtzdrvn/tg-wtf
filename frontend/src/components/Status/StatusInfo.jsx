const StatusInfo = ({src, status, title, article, date, track}) => {

    const statusNumber = parseInt(status);

    const calculateProgressWidth = () => {
        switch(statusNumber) {
            case 1:
                return 20;
            case 2:
                return 40;
            case 3:
                return 60;
            case 4:
                return 80;
            case 5:
                return 100;
            default:
                return 0;
        }
    };

    return ( 
        <div>
            <div className="p-[16px] infoDiliveryDiv flex justify-between items-center">
                <div className=" flex gap-[10px] items-center">
                    <div className="w-[44px]"><img src={src} alt="1" className="w-[44px] h-[44px] rounded lolkakek"/></div>
                    <div className="HistoryText1 flex flex-col -mb-[2px]">
                        <div className=" StatusTitle1 flex items-center">{title}</div>
                        <div className="StatusArtitle1 flex items-center">{article}</div>
                    </div>
                </div>
                <div className=" statusPositions flex flex-col gap-[8px]">
                    <div className="flex lolkeklol">

                        <svg className={`w-[24px] h-[24px] ${statusNumber > 0 ? "lolgreen":""}`} xmlns="http://www.w3.org/2000/svg"  id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M9,14h6a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"/><path d="M19,0H5A5.006,5.006,0,0,0,0,5V6A3,3,0,0,0,1,8.234V19a5.006,5.006,0,0,0,5,5H18a5.006,5.006,0,0,0,5-5V8.234A3,3,0,0,0,24,6V5A5.006,5.006,0,0,0,19,0ZM2,5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3V6a1,1,0,0,1-1,1H3A1,1,0,0,1,2,6ZM21,19a3,3,0,0,1-3,3H6a3,3,0,0,1-3-3V9H21Z"/></svg>
                        <svg className={`w-[24px] h-[24px] ${statusNumber > 1 ? "lolgreen":""}`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M21,10H17.693L13.446,1.563A3,3,0,0,0,10.812,0H7.13l2.9,10H6.4l-2.3-2.295A2.4,2.4,0,0,0,.327,8.2a2.38,2.38,0,0,0-.008,2.4L3.407,16h6.612l-3,8h3.793a2.97,2.97,0,0,0,2.605-1.513L17.464,16H24V13A3,3,0,0,0,21,10ZM9.792,2h1.02a.989.989,0,0,1,.863.491L15.455,10H12.11ZM22,14H16.354L11.69,21.479a1,1,0,0,1-.878.521H9.9l3-8H4.567L2.055,9.6A.4.4,0,0,1,2.406,9a.4.4,0,0,1,.285.118L5.573,12H21a1,1,0,0,1,1,1Z"/></svg>
                        <svg className={`w-[24px] h-[24px] ${statusNumber > 2 ? "lolgreen":""}`} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0ZM22,12a9.938,9.938,0,0,1-1.662,5.508l-1.192-1.193A.5.5,0,0,1,19,15.962V15a3,3,0,0,0-3-3H13a1,1,0,0,1-1-1v-.5a.5.5,0,0,1,.5-.5A2.5,2.5,0,0,0,15,7.5v-1a.5.5,0,0,1,.5-.5h1.379a2.516,2.516,0,0,0,1.767-.732l.377-.377A9.969,9.969,0,0,1,22,12Zm-19.951.963,3.158,3.158A2.978,2.978,0,0,0,7.329,17H10a1,1,0,0,1,1,1v3.949A10.016,10.016,0,0,1,2.049,12.963ZM13,21.949V18a3,3,0,0,0-3-3H7.329a1,1,0,0,1-.708-.293L2.163,10.249A9.978,9.978,0,0,1,17.456,3.63l-.224.224A.507.507,0,0,1,16.879,4H15.5A2.5,2.5,0,0,0,13,6.5v1a.5.5,0,0,1-.5.5A2.5,2.5,0,0,0,10,10.5V11a3,3,0,0,0,3,3h3a1,1,0,0,1,1,1v.962a2.516,2.516,0,0,0,.732,1.767l1.337,1.337A9.971,9.971,0,0,1,13,21.949Z"/></svg>
                        <svg className={`w-[24px] h-[24px] ${statusNumber > 3 ? "lolgreen":""}`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M19,5H17V4a3,3,0,0,0-3-3H3A3,3,0,0,0,0,4V19H2.041A3.465,3.465,0,0,0,2,19.5a3.5,3.5,0,0,0,7,0,3.465,3.465,0,0,0-.041-.5h6.082a3.465,3.465,0,0,0-.041.5,3.5,3.5,0,0,0,7,0,3.465,3.465,0,0,0-.041-.5H24V10A5.006,5.006,0,0,0,19,5Zm0,2a3,3,0,0,1,3,3v1H17V7ZM7,19.5a1.5,1.5,0,0,1-3,0,1.418,1.418,0,0,1,.093-.5H6.907A1.418,1.418,0,0,1,7,19.5ZM15,17H2V4A1,1,0,0,1,3,3H14a1,1,0,0,1,1,1Zm5,2.5a1.5,1.5,0,0,1-3,0,1.41,1.41,0,0,1,.093-.5h2.814A1.41,1.41,0,0,1,20,19.5ZM17,17V13h5v4Z"/></svg>
                        <svg className={`w-[24px] h-[24px] ${statusNumber > 4 ? "lolgreen":""}`} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M22.773,7.721A4.994,4.994,0,0,0,19,6H15.011l.336-2.041A3.037,3.037,0,0,0,9.626,2.122L7.712,6H5a5.006,5.006,0,0,0-5,5v5a5.006,5.006,0,0,0,5,5H18.3a5.024,5.024,0,0,0,4.951-4.3l.705-5A5,5,0,0,0,22.773,7.721ZM2,16V11A3,3,0,0,1,5,8H7V19H5A3,3,0,0,1,2,16Zm19.971-4.581-.706,5A3.012,3.012,0,0,1,18.3,19H9V7.734a1,1,0,0,0,.23-.292l2.189-4.435A1.07,1.07,0,0,1,13.141,2.8a1.024,1.024,0,0,1,.233.84l-.528,3.2A1,1,0,0,0,13.833,8H19a3,3,0,0,1,2.971,3.419Z"/></svg>
                        
                    </div>
                    <div>
                        <div className="h-[5px] w-full infobarDelivery"> 
                            <div className="h-[5px] infobarDelivery2" style={{ width: `${calculateProgressWidth()}%` }}> </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="infoDeliveryTracks mt-[4px]">
                <div>Estimated delivery time: <span className="font-normal">{date}</span></div>
                <div>Tracks: <span className="font-normal">{track}</span></div>
            </div>
        </div>
    );
}
 
export default StatusInfo;
