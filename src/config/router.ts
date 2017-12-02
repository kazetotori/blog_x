export let RouteConfig: { url: string, method: string, script: string }[] = [

    // 例:
    // {
    //     url: '/index',
    //     method: 'get',
    //     script: './controller/index'
    // }
    {
        url: '/home/blog',
        method: 'get',
        script: './main/renderer/home.blog'
    },
    {
        url: '/home',
        method: 'get',
        script: './main/renderer/home.blog'
    },
    {
        url: '/user/signout',
        method: 'get',
        script: './user/renderer/signout'
    },
    {
        url: '/user/signout/',
        method: 'get',
        script: './user/renderer/signout'
    },
    {
        url: '/api/blog/getlikeusers',
        method: 'get',
        script: './blog/api/getlikeusers'
    },
    {
        url: '/api/user/signin',
        method: 'post',
        script: './user/api/signin'
    },
    {
        url: '/api/blog/getpreviewlist',
        method: 'post',
        script: './blog/api/getpreviewlist'
    },
    {
        url: '/api/blog/getreplylist',
        method: 'get',
        script: './blog/api/getreplylist'
    },
    {
        url: '/api/user/focus',
        method: 'get',
        script: './user/api/focus'
    },
    {
        url: '/api/user/send_signup_verify_toemail',
        method: 'post',
        script: './user/api/send_signup_verify_toemail'
    },
    {
        url: '/api/user/verify_signup_code',
        method: 'post',
        script: './user/api/verify_signup_code'
    },
    {
        url: '/api/user/check_username_unique',
        method: 'post',
        script: './user/api/check_username_unique'
    },
    {
        url: '/api/user/check_email_unique',
        method: 'post',
        script: './user/api/check_email_unique'
    },
    {
        url: '/api/user/signup',
        method: 'post',
        script: './user/api/signup'
    },
    {
        url: '/api/blog/getreadtimestoplist',
        method: 'get',
        script: './blog/api/getreadtimestoplist'
    },
    {
        url: '/api/blog/getreplytimestoplist',
        method: 'get',
        script: './blog/api/getreplytimestoplist'
    },
    {
        url: '/api/blog/share',
        method: 'use',
        script: './blog/api/share'
    },
    {
        url: '/api/blog/trans',
        method: 'get',
        script: './blog/api/trans'
    },
    {
        url: '/api/blog/getclslist',
        method: 'get',
        script: './blog/api/getclslist'
    },
    {
        url: '/api/blog/like',
        method: 'use',
        script: './blog/api/like'
    },
    {
        url: '/index/*/aboutme',
        method: 'get',
        script: './main/renderer/aboutme'
    },
    {
        url: '/index/*/blog',
        method: 'get',
        script: './main/renderer/index.blog'
    },
    {
        url: '/index/*/',
        method: 'get',
        script: './main/renderer/index'
    },
    {
        url: '/signin',
        method: 'get',
        script: './main/renderer/signin'
    },
    {
        url: '/signup',
        method: 'get',
        script: './main/renderer/signup'
    },
    {
        url: '/signin/',
        method: 'get',
        script: './main/renderer/signin'
    },
];

