import { Pool } from "mysql2/promise";

 
let conn: Pool | null = null;

const _cors = {

    setConn : (connPool:Pool) => {
        conn = connPool;
    },


// Функція для динамічного визначення дозволених доменів
    corsOptions : {
        origin: (
            origin: string | undefined,
            callback: (err: Error | null, allow?: boolean) => void
        ) => {
            callback(null, true); // Дозволяємо всі домени
        }, 

        // Інші опції CORS, наприклад, методи або заголовки
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    }
}

export default _cors;