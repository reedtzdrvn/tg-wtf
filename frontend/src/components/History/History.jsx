import history from "../../images/history.svg"
import "./history.css"

const History = () => {
    const doc = [
        {
            "name" : "Spotify Subscription",
            "date" : "28 Jan, 12:30 AM",
            "sum" : "-$2,500",
        },
        {
            "name" : "Spotify",
            "date" : "28 Jan, 12:30 AM",
            "sum" : "-$2,500",
        },
        {
            "name" : "alena bogdeiak",
            "date" : "28 Jan, 12:30 AM",
            "sum" : "-$2,500",
        },
        {
            "name" : "ya wtf ",
            "date" : "28 Jan, 12:30 AM",
            "sum" : "-$2,500",
        },
        {
            "name" : "hochu spat",
            "date" : "28 Jan, 12:30 AM",
            "sum" : "-$2,700",
        },
    ]
    return ( 
        <div className="mx-[8.5%] mt-[24px]">
            <div className="flex gap-[10px] items-center">
                <div><img src={history} alt="1" className="w-[30px] h-[30px]"/></div>
                <div className="HistoryText1 flex flex-col -mb-[2px]">
                    <div className="HistoryTitle1 flex items-center">History</div>
                    <div className="HistoryArtitle1 flex items-center">12 transactions</div>
                </div>
            </div>
            <div className="mt-[48px] flex flex-col">
                {doc.map((obj) => (
                    <div className="stringinfo flex justify-between items-center py-[12px] px-[6px]">
                        <div className="textOrderHistory w-5/12">{obj.name}</div>
                        <div className="dateOrderHistory w-4/12">{obj.date}</div>
                        <div className="sumOrderHistory w-3/12">{obj.sum}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default History;