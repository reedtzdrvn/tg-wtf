import module from "./errors.module.css"
const Preloader = () => {
    return(
        <div className={module.error}>
            <title>Проверка</title>
        <div className={module.ldsring}><div></div><div></div><div></div><div></div></div>
        </div>
    )
}
export default Preloader;