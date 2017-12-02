export let ServerConfig: {
    Port:                         number,
    MsgOnListenStart:             string,
    EnvStatus:                    string,
    OnListenStart:                Function[],
    Views:                        string,
    ViewEngine:                   string,
    CookieSecret:                 string,
    SignTimeout:                  number,
    Host:                         string,
    SignUpVerifyCodeTimeout:      number
} = {
        Port:                     3000,
        MsgOnListenStart:         'Starting',
        EnvStatus:                'DEBUG',
        OnListenStart:            [],
        Views:                    './views',
        ViewEngine:               'ejs',
        CookieSecret:             '123456',
        SignTimeout:              1000*60*30,
        Host:                     'localhost:3000',
        SignUpVerifyCodeTimeout:  1000*60*30
    };


// 用户配置

ServerConfig.MsgOnListenStart = `===========================================
服务已开启
端口   :    ${ServerConfig.Port},
时间   :    ${new Date().toLocaleString()}
===========================================`;
ServerConfig.ViewEngine = 'jade';
ServerConfig.CookieSecret = 'kazetotori';
ServerConfig.SignTimeout = 1000 * 60 * 60 * 24 * 7;
ServerConfig.Host = 'www.maylight.com.cn';