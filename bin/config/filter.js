"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterConfig = [
    // 例:
    // {
    //     script: './filter/body-parser',
    //     urls: [
    //         {
    //             url: '/*',
    //             method: 'use'
    //         }
    //     ]
    // }
    {
        script: './filter/logger',
        urls: [{
                url: '/',
                method: 'use'
            }]
    },
    {
        script: './filter/body-parser',
        urls: [{
                url: '*',
                method: 'use'
            }]
    },
    {
        script: './filter/cookie-parser',
        urls: [{
                url: '*',
                method: 'use'
            }]
    },
    {
        script: './filter/session',
        urls: [{
                url: '*',
                method: 'use'
            }]
    },
    {
        script: './filter/public',
        urls: [{
                url: '/public',
                method: 'use'
            }]
    },
    {
        script: './user/filter/upSignStatus',
        urls: [{
                url: '/index/*',
                method: 'use'
            },
            {
                url: '/index/*/aboutme',
                method: 'get'
            },
            {
                url: '/api/blog/getclslist',
                method: 'get'
            },
            {
                url: '/api/blog/getpreviewlist',
                method: 'post'
            },
            {
                url: '/api/user/focus',
                method: 'get'
            },
            {
                url: '/api/blog/getreplylist',
                method: 'get'
            },
            {
                url: '/signin',
                method: 'get'
            },
            {
                url: '/signin/',
                method: 'get'
            },
            {
                url: '/home',
                method: 'get'
            },
            {
                url: '/home/*',
                method: 'get'
            }]
    },
    {
        script: './user/filter/writeBlogUser',
        urls: [{
                url: '/index/*',
                method: 'use'
            }, {
                url: '/index/*/aboutme',
                method: 'get'
            }]
    }
];
