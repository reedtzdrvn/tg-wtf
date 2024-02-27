import https from "https";

export const wakeServer = () => {

    function sendRequestToServer() {
        const options = {
            hostname: 'tg-wtf.onrender.com',
            port: 443,
            path: '/',
            method: 'GET',
        };

        const req = https.request(options, (res) => {
            console.log(`Status code: ${res.statusCode}`);
        });


        // Обрабатываем ошибки запроса
        req.on('error', (error) => {
            console.error(`Error sending request: ${error}`);
        });

        // Завершаем запрос
        req.end();
    }


// Отправляем запрос каждые 5 минут (300 000 миллисекунд)
    setInterval(sendRequestToServer, 150000);

}