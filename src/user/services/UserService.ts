import { QueryRunner } from "../../utils/QueryRunner";
import { SQLUtils } from "../../utils/SQLUtils";
const POOL = SQLUtils.Pool;

export class UserService {

    public constructor() { }


    /**
     * 判断邮箱是否已经被占用
     * @param email 邮箱
     */
    public async emailExists(email) {
        let runner: QueryRunner = null;
        try {
            runner = await QueryRunner.GetInstance(POOL);
            let exists = (await runner.Query('user.selEmailExists', { email: email }, {})).length > 0;
            return exists;
        }
        catch (e) {
            console.error(e)
            throw e;
        }
        finally {
            if (runner) await runner.Release();
        }
    }
}