import * as path from "path";


export const SqlConfig = {
    poolDriver: path.join(process.cwd(), '/src/async-mysql-ts/implements/SQLPool'),
    host: "localhost",
    port: 3306,
    user: "kazetotori",
    database: "my_blog_x",
    password: "Zq12398045",
    logSql: false
};