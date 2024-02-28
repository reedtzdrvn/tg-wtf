import module from "./errors.module.css"
const NotFound = () => {
    return(
        <div className={module.error}>
            <title>404</title>
            <article style={{textAlign: "center"}}>Ошибка 404</article>
            <article style={{textAlign: "center"}}>Страница не найдена!</article>
            <svg width="100" height="100" fill="none" stroke="#ff0000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z"></path>
            </svg>
        </div>
    )
}
export default NotFound;