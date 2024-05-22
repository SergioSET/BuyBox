import {createPool} from 'mysql2/promise'


export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Juanes2732003.',
    port: '3306',
    database: 'buyboxdb'
})
