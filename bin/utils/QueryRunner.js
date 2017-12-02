"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const QueryRunnerConfig = require("../config/QueryRunnerConfig");
let Queries = QueryRunnerConfig.Queriers;
let Includes = QueryRunnerConfig.Includes;
let StringMapping = QueryRunnerConfig.StringMappings;
let Filters = QueryRunnerConfig.Filters;
/**
 * 加载配置文件
 */
(function loadConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        // 加载include的querier
        for (let i = 0; i < Includes.length; i++) {
            let queriers = (yield Promise.resolve().then(function () { return require(Includes[i]); })).Queriers;
            Queries = Object.assign(Queries, queriers);
        }
    });
}());
/**
 * sql操作类
 */
class QueryRunner {
    constructor() { }
    ;
    get Pool() { return this.pool; }
    get Connection() { return this.conn; }
    /**
     * 获取QueryRunner对象
     * 从连接池中取一条连接用于初始化QueryRunner对象
     * @param pool 连接池对象
     */
    static GetInstance(pool) {
        return __awaiter(this, void 0, void 0, function* () {
            let querier = new QueryRunner();
            querier.pool = pool;
            querier.conn = (yield pool.GetConnection());
            return querier;
        });
    }
    /**
     * 开启事务
     */
    Begin() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.Begin();
        });
    }
    /**
     * 提交事务
     */
    Commit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.Commit();
        });
    }
    /**
     * 回滚事务
     */
    Rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.Rollback();
        });
    }
    /**
     * 释放对象
     */
    Release() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.Release();
        });
    }
    /**
     * 主要的sql执行函数，执行大部分的sql操作
     * @param queryName 操作名
     * @param bean 数据对象
     * @param stringMapping 字符串映射，用于替换对应的sql语句，提供灵活操作
     */
    Query(queryName, bean, stringMapping) {
        return __awaiter(this, void 0, void 0, function* () {
            // 获取配置中的querier
            let querier = Queries[queryName];
            if (!querier) {
                throw new QuerierNotFoundError(queryName);
            }
            // 校验参数
            let params = (QueryRunner.checkParams(queryName, querier, bean))[0];
            // 加载sql语句
            let sql = QueryRunner.parseSQL(querier.sql, stringMapping);
            try {
                return yield this.conn.Query(sql, params);
            }
            catch (e) {
                console.error(e);
                throw e;
            }
        });
    }
    /**
     * 用于执行更新操作的函数，支持配置属性upFields
     * @param queryName 操作名
     * @param bean 数据对象
     * @param stringMapping 字符串映射，用于替换对应的sql语句，提供灵活操作
     */
    Update(queryName, bean, stringMapping) {
        return __awaiter(this, void 0, void 0, function* () {
            // 获取querier对象
            let querier = Queries[queryName];
            // 检查参数并获取params
            let [params, filters, necessaryParams] = QueryRunner.checkParams(queryName, querier, bean);
            // 检查添加更新字段，即upfields
            let upFields = querier.upFields;
            let upDefaultValues = querier.upDefaultValues || {};
            let toUpFields = [];
            let upParams = [];
            bean = Object.assign({}, upDefaultValues, bean);
            upFields.forEach(field => {
                if (bean[field] === undefined)
                    return;
                let value = bean[field];
                if (field in filters) {
                    let filter = filters[field];
                    filter = filter && filter.call ? filter : Filters[filter];
                    filter = filter && filter.call ? filter : () => true;
                    if (!filter(value)) {
                        let e = new InvalidParamValueError(queryName, field, value);
                        console.error(e);
                        throw e;
                    }
                }
                toUpFields.push(` ${field}=? `);
                upParams.push(value);
            });
            stringMapping = Object.assign({ toUpFields: toUpFields.join(',') }, stringMapping);
            //合并参数
            params = [].concat(params, upParams);
            // 解析sql
            let sql = querier.sql;
            sql = QueryRunner.parseSQL(sql, stringMapping);
            try {
                return yield this.conn.Query(sql, params);
            }
            catch (e) {
                console.error(e);
                throw e;
            }
        });
    }
    /**
     * 将字符串映射表中的映射填写到sql中，并将解析后的sql返回
     * @param sql 原sql语句
     * @param stringMapping 字符串映射
     */
    static parseSQL(sql, stringMapping) {
        let regArr = sql.match(/\{[^{}]+\}?/g);
        if (regArr) {
            regArr.forEach(regStr => {
                let key = regStr.slice(1, -1);
                let reg = new RegExp(regStr, 'g');
                let val = stringMapping[key] || StringMapping[key];
                sql = sql.replace(reg, val);
            });
        }
        return sql;
    }
    /**
     * 检查参数，并返回params集合
     * @param querier 操作对象
     * @param bean 数据模型
     * @return params,filters,necessaryParams
     */
    static checkParams(queryName, querier, bean) {
        let params = [];
        let paramNames = querier.paramNames || [];
        let filters = querier.filters || {};
        let necessaryParams = querier.necessaryParams || [];
        let defaultValues = querier.defaultValues || {};
        bean = Object.assign({}, defaultValues, bean);
        necessaryParams = necessaryParams === '*' ? paramNames : necessaryParams;
        for (let i = 0; i < paramNames.length; i++) {
            let paramName = paramNames[i];
            let value = bean[paramName];
            // 校验neccessaryParam是否缺失
            if (necessaryParams.indexOf(paramName) !== -1 && !(paramName in bean)) {
                let e = new NecessaryParamMissingError(queryName, paramName);
                console.error(e);
                throw e;
            }
            else {
                value = value === undefined ? null : value;
            }
            // 值通过过滤器检测
            if (paramName in filters) {
                let filter = filters[paramName];
                filter = filter && filter.call ? filter : Filters[filter];
                filter = filter && filter.call ? filter : () => true;
                if (!filter(value)) {
                    let e = new InvalidParamValueError(queryName, paramName, value);
                    console.error(e);
                    throw e;
                }
            }
            // 检测成功，加入params
            params.push(value);
        }
        return [params, filters, necessaryParams];
    }
}
exports.QueryRunner = QueryRunner;
/**
 * 执行query时缺少必要参数错误
 */
class NecessaryParamMissingError extends Error {
    constructor(querierName, paramName) {
        super();
        this.name = 'NecessaryParamMissingError';
        this.stack = 'utils/QueryRunner';
        this.message = `Necessary param "${paramName}" missing. Thrown by querier ${querierName}`;
    }
}
exports.NecessaryParamMissingError = NecessaryParamMissingError;
/**
 * 非法值错误
 */
class InvalidParamValueError extends Error {
    constructor(querierName, param, value) {
        super();
        this.name = 'InvalidParamValueError';
        this.stack = 'utils/QueryRunner';
        this.name = `Invalid value ${value} for param ${param}. Thrown by querier ${querierName}`;
    }
}
exports.InvalidParamValueError = InvalidParamValueError;
/**
 * querier未找到异常
 */
class QuerierNotFoundError extends Error {
    constructor(querierName) {
        super();
        this.name = 'QuerierNotFoundError';
        this.stack = 'utils/QueryRunner';
        this.name = `Qurier not found for the name of ${querierName}.`;
    }
}
exports.QuerierNotFoundError = QuerierNotFoundError;
