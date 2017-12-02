$(function () {

    "use strict";
    window.my_blog = window.my_blog || {};
    var errorReloadHTML = '<div class="am-text-center">出问题了，<a href="javascript:void(0)" style="text-decoration:underline">点击重试</a></div>';
    var loaadingIconHTML = '<div class="am-text-center"><i class="am-icon-spinner am-icon-pulse"></i></div>';
    var replyItemTplt =
        '<li class="am-comment" style="border:none">' +
        '  <a href="{userIndexUrl}">' +
        '    <img src="{headurl}" class="am-comment-avatar" width="48" height="48" />' +
        '  </a>' +
        '  <div class="am-comment-main">' +
        '    <header class="am-comment-hd">' +
        '      <div class="am-comment-meta">' +
        '        <a href="{userIndexUrl}" class="am-comment-author">{reply_nickname}</a>' +
        '        评论于' +
        '        <time>{reply_time}</time>' +
        '      </div>' +
        '    </header>' +
        '    <div class="am-comment-bd">' +
        '       <div>{content}</div> ' +
        '       <ul class="am-comment-list am-list cm-comment-flip"></ul>' +
        '       <ul class="am-nav am-nav-pills">' +
        '         <li>' +
        '           <a href="javascript:void(0)"><i class="{likeIcon}"></i><a>'
    '         </li>' +
    '       </ul>' +
    '    </div>' +
    '  </div>' +
    '</li>'

    function getReplyHTML(reply) {
        return replyItemTplt
            .replace(/\{userIndexUrl\}/g, '/index/' + reply.username)
            .replace('{headurl}', reply.headurl)
            .replace('{reply_nickname}', reply.nickname)
            .replace('{reply_time}', reply.c_time)
            .replace('{content}', reply.content);
    }

    // 加载评论列表
    function loadReply() {
        $('#replyList').html(loaadingIconHTML)
        $.get({
            url: '/api/blog/getreplylist',
            dataType: 'json',
            data: {
                blogno: $('[blogid]').attr('blogid')
            },
            success: function (res) {
                $('#replyList').empty();
                var $replyList = $('<ul class="am-comment-list am-list"></ul>')
                var count = 0;
                res.data.replyList.forEach(function (reply) {
                    count++;
                    var $li = $(getReplyHTML(reply));
                    var $childList = $li.find('.am-comment-list');
                    var childReplysHTML = '';
                    reply.replys.forEach(function (childReply) {
                        count++
                        childReplysHTML = getReplyHTML(childReply);
                        $childList.append($(childReplysHTML));
                    })
                    
                    $replyList.append($li);
                })
                $('#replyTimes').text('(' + count + ')');
                $('#replyList').append($replyList);
            },
            error: function () {
                $('#replyList')
                    .html(errorReloadHTML)
                    .find('a')
                    .click(loadReply);
            }
        })
    }
    loadReply();


    var likedItemTplt =
        '<li userid={userid}>' +
        '  <a href="{userIndexUrl}"><img src="{headurl}" width="30" height="30"></a>' +
        '</li>';

    function getLikeItemHTML(user) {
        return likedItemTplt
            .replace('{userid}', user.userid)
            .replace('{userIndexUrl}', '/index/' + user.username)
            .replace('{headurl}', user.headurl);
    }

    function loadLikeUsers() {
        $('#likeUsers').html(loaadingIconHTML);
        $.get({
            url: '/api/blog/getlikeusers',
            data: {
                blogno: $('[blogid]').attr('blogid')
            },
            dataType: 'json',
            success: function (res) {
                var count = 0;
                var $ul = $('<ul class="am-nav am-nav-pills"></ul>')
                res.data.likeUsers.forEach(function (user) {
                    count++;
                    var html = getLikeItemHTML(user);
                    $ul.append($(html));
                })
                $('#likedTimes').html('(' + count + ')');
                $('#likeUsers').empty().append($ul);
            },
            error: function () {
                setTimeout(function () {
                    $('#likeUsers')
                        .html(errorReloadHTML)
                        .find('a')
                        .click(loadLikeUsers);
                }, 200);
            }
        })
    }
    window.my_blog.onlikeload = window.my_blog.onlikeload || [];
    window.my_blog.onlikeload.push(function (res) {
        $('#likedTimes').html('(' + res.data.likeCount + ')');
        var $li = $(getLikeItemHTML(res.data.userinfo));
        var $ul = $('#likeUsers>ul');
        if (res.data.liked) {

            $ul.append($li);
        } else {
            $ul.find('li').each(function () {
                if ($(this).attr('userid') == res.data.userinfo.userid) {
                    $(this).remove();
                }
            })
        }
    })
    loadLikeUsers();
})