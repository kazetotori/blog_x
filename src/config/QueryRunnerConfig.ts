/**
 * 基本配置文件
 * 配置格式如下
 * 
 * 调用名: {
 *    sql: sql语句,
 *    paramNames: 需要从bean中获取的参数名集合,
 *    necessaryParams:  必须参数，如果缺少则抛出异常，如果该项为*，则表示所有参数都为必须
 *    defaultValues:{},  参数的缺省值
 *    filters:{}         过滤器，允许使用配置的全局过滤器
 * }
 */
export let Queriers = {
};


/**
 * 需要引入的配置文件
 */
export let Includes: string[] = [
    '../user/model/UserModel',
    '../user/model/HeadModel',
    '../user/model/ShipModel',
    '../blog/model/BlogModel',
    '../blog/model/BlogLikeModel',
    '../blog/model/BlogShareModel',
    '../blog/model/BlogTransModel',
    '../blog/model/BlogClsModel',
    '../blog/model/VisitModel',
    '../blog/model/BlogReplyModel'
];


/**
 * 字符串映射
 * 在sql语句中使用{str}会被转义成对应的映射
 * 一般用来存储表名等
 */
export let StringMappings = {
    "t_user": "t_user",
    "t_head": "t_head",
    "t_star": "t_star",
    "t_ship": "t_ship",
    "t_blog": "t_blog",
    "t_blog_share": "t_blog_share",
    "t_blog_reply": "t_blog_reply",
    "t_blog_trans": "t_blog_trans",
    "t_blog_like": "t_blog_like",
    "t_blog_cls": "t_blog_cls",
    "t_visit": "t_visit"
}



/**
 * 全局值过滤器
 */
export let Filters = {
    username: val => /^[a-zA-Z0-9]{6,18}$/.test(val),
    password: val => /^[a-zA-Z0-9]{6,18}$/.test(val),
    email: val => /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(val),
    phone: val => /^1[3578]\d{9}$/.test(val),
    nickname: val => /^[\w\u4e00-\u9fa5]{3,16}$/.test(val),
    birthday: val => new Date(val).toString() !== 'Invalid Date',
    sex: val => ['男', '女', '-'].indexOf(val) !== -1,
}