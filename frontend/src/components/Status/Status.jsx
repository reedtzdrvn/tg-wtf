import spinner from "../../images/spinner.svg"
import info from "../../images/info.svg"
import StatusInfo from "./StatusInfo"
import "./status.css"

const Status = () => {

    const doc = [
        {
            "src" : "https://static.vecteezy.com/system/resources/previews/010/994/232/non_2x/nike-logo-black-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg",
            "status" : "3", 
            "title" : "Nike",
            "article" : "Dress", 
            "date" : "17th February, 2023", 
            "track" : "XT-- --- 00 -- --- --USY"
        },
        {
            "src" : "https://static.vecteezy.com/system/resources/previews/022/076/746/non_2x/puma-logo-and-art-free-vector.jpg",
            "status" : "2", 
            "title" : "Puma",
            "article" : "Dress", 
            "date" : "17th February, 2023", 
            "track" : "XT-- --- 00 -- --- --USY"
        },
        {
            "src" : "https://static.vecteezy.com/system/resources/previews/010/994/232/non_2x/nike-logo-black-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg",
            "status" : "5", 
            "title" : "Nike",
            "article" : "Dress", 
            "date" : "17th February, 2023", 
            "track" : "XT-- --- 00 -- --- --USY"
        },
        {
            "src" : "https://static.vecteezy.com/system/resources/previews/022/076/746/non_2x/puma-logo-and-art-free-vector.jpg",
            "status" : "0", 
            "title" : "Puma",
            "article" : "Dress", 
            "date" : "17th February, 2023", 
            "track" : "XT-- --- 00 -- --- --USY"
        },
    ]

    return ( 
        <div className="mx-[8.5%] mt-[24px] page">
            <div className="flex gap-[10px] items-center mb-[36px]">
                <div><img src={spinner} alt="1" className="w-[30px] h-[30px]"/></div>
                <div className="HistoryText1 flex flex-col -mb-[2px]">
                    <div className="HistoryTitle1 flex items-center">Status <img className="-mt-[16px] ml-[3px]" src={info} alt="" /></div>
                    <div className="HistoryArtitle1 flex items-center">2 position</div>
                </div>
            </div>
            <div className="flex flex-col gap-[28px] ">
                
                {doc.map((obj) => (
                    <StatusInfo src={obj.src} status={obj.status} title={obj.title} article={obj.article} date={obj.date} track={obj.track}/>
                ))}
                
            </div>
        </div>
    );
}
 
export default Status;