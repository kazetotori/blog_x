$(function () {
    "use strict";

    window.my_blog = window.my_blog || {
        onlikeload: []
    };
    // 操作按钮需要登录
    $('' +
        '.mb-index-main-blogitem-operate-like,' +
        '.mb-index-main-blogitem-operate-share,' +
        '.mb-index-main-blogitem-operate-trans,' +
        '#focusBloger').click(function (e) {
        if ($('#pageInfo').attr('signStatus') != 0) {
            toastr.info('请先登录')
            e.stopImmediatePropagation();
        }
    })


    // 点赞按钮
    $('.mb-index-main-blogitem-operate-like').click(like);

    function like() {
        var blogno = $(this).parent().parent().parent().attr('blogid');
        var $this = $(this);
        $.ajax({
            url: '/api/blog/like',
            type: 'get',
            data: {
                blogno: blogno
            },
            dataType: 'json',
            success: function (res) {
                var liked = res.data.liked;
                var count = res.data.likeCount;
                $this.find('i').attr('class', liked ? 'am-icon-thumbs-up' : 'am-icon-thumbs-o-up');
                $this.find('span').html('(' + count + ')');
                toastr.success(liked ? '已赞' : '已取消赞');

                if (window.my_blog && window.my_blog.onlikeload && window.my_blog.onlikeload) {
                    window.my_blog.onlikeload.forEach(function (callback) {
                        if (callback && callback.call) callback(res);
                    })
                }
            },
            error: function () {
                toastr.error('点赞失败，请刷新页面后重试')
            }
        })
    }


    // 收藏按钮
    $('.mb-index-main-blogitem-operate-share').click(share);

    function share() {
        var blogno = $(this).parent().parent().parent().attr('blogid');
        var $this = $(this);
        $.ajax({
            url: '/api/blog/share',
            type: 'get',
            data: {
                blogno: blogno
            },
            dataType: 'json',
            success: function (res) {
                var shared = res.data.shared;
                var sharedTimes = res.data.sharedTimes;
                $this.find('i').attr('class', shared ? 'am-icon-star' : 'am-icon-star-o');
                $this.find('span').html('(' + sharedTimes + ')');
                toastr.success(shared ? '已收藏' : '已取消收藏');
            },
            error: function () {
                toastr.error('收藏失败，请刷新页面后重试')
            }
        })
    }


    // 转发按钮
    var $select = $('<select></select>');
    var transBlogid;
    $('.mb-index-main-blogitem-operate-trans').click(trans);

    function trans() {
        var xhr;
        var successed = false;
        transBlogid = $(this).parent().parent().parent().attr('blogid');

        // 加载正在加载的图标
        $('#transConfirm .am-modal-bd').html('<i class="am-icon-spinner am-icon-pulse"></i>')
        $('#transConfirm').modal({
            onConfirm: function () {
                if (!successed) return toastr.error('没有选择分类');
                if (isNaN(parseInt($select.val()))) return toastr.error('转载失败，请选择至少一个分类');

                $.get({
                    url: '/api/blog/trans',
                    dataType: 'json',
                    data: {
                        blogid: transBlogid,
                        clsid: $select.val()
                    },
                    success: function (res) {
                        toastr.success('转载成功');
                    },
                    error: function () {
                        toastr.error('转载失败');
                    }
                })
            },
            onCancel: function () {
                if (xhr) xhr.abort();
            }
        });

        // 获取分类信息
        loadCls();

        function loadCls() {
            var xhr = $.get({
                url: '/api/blog/getclslist',
                dataType: 'json',
                success: function (res) {
                    successed = true;
                    var clsList = res.data.clsList
                    var optionHTMLTplt = '<option value={clsid}>{clsname}</option>'
                    var optionsHTML = '';
                    clsList.forEach(function (cls) {
                        optionsHTML += optionHTMLTplt.replace('{clsid}', cls.clsid).replace('{clsname}', cls.clsname);
                    })
                    $('#transConfirm .am-modal-bd').empty().append($select);
                    $select.html(optionsHTML);
                    $select.selected();
                },
                error: function () {
                    $('#transConfirm .am-modal-bd')
                        .html('<div class="am-text-center">出问题了，<a href="javascript:void(0)" style="text-decoration:underline">点击重试</a></div>')
                        .find('a')
                        .click(loadCls);
                }
            })
        }

        function onConfirm() {

        }

        function onCancel() {

        }
    }


    // 滚动加载页面
    var loadingXHR = null;
    var blogItemTplt =
        '<li blogid={blogid}>' +
        '  <h2 class="am-text-fl mb-index-main-blogitem-title">' +
        '    <a href="{blogReadAllUrl}">{blogTitle}</a>' +
        '  </h2>' +
        '  <div class="mb-index-main-blogitem-preview">{blogPreview}</div>' +
        '  <div class="mb-index-main-blogitem-readall"><a href="{blogReadAllUrl}">>>阅读全文</a></div>' +
        '  <ul class="am-nav am-nav-pills mb-index-main-blogitem-operate-group">' +
        '    <li>' +
        '      <a class="mb-index-main-blogitem-operate-like" href="javascript:void(0)">' +
        '        <i class="{likedIcon}"></i><span>{likeTimes}</span>' +
        '      </a>' +
        '    </li>' +
        '    <li>' +
        '      <a class="mb-index-main-blogitem-operate-share" href="javascript:void(0)">' +
        '        <i class="{sharedIcon}"></i><span>{shareTimes}</span>' +
        '      </a>' +
        '    </li>' +
        '    <li>' +
        '      <a class="mb-index-main-blogitem-operate-trans" href="javascript:void(0)">' +
        '        <i class="am-icon-share-square-o"></i><span>{transTimes}</span>' +
        '      </a>' +
        '    </li>' +
        '    <li style="float:right;color:#999;font-size:12px">' +
        '      <i class="am-icon-eye"></i><span>{readTimes}</span>' +
        '      <i class="am-icon-pencil-square-o"></i><span>{replyTimes}</span>' +
        '      <i class="am-icon-clock-o"></i><span>{uTime}</span>' +
        '    </li>' +
        '  </ul>' +
        '</li>';

    $('#bottomLoading').on('inview.scrollspy.amui', loadNextPage)

    function loadNextPage() {
        if (loadingXHR) loadingXHR.abort();
        var $this = $(this);
        var $pageInfo = $('#pageInfo');
        $this.html('<i class="am-icon-spinner am-icon-pulse"></i>');
        loadingXHR = $.post({
            url: '/api/blog/getpreviewlist',
            dataType: 'json',
            data: {
                blogUserno: $pageInfo.attr('blogUserid'),
                pageNo: parseInt($pageInfo.attr('pageNo')) + 1
            },
            success: function (res) {
                if (res.errno != 0) {
                    return onerror();
                }

                setTimeout(function () {
                    $pageInfo.attr('pageNo', parseInt($pageInfo.attr('pageNo')) + 1);

                    var data = res.data;

                    var blogListHtml = '';
                    data.blogList.forEach(function (blog) {
                        var blogReadAllUrl = $pageInfo.attr('indexUrl') + '/blog?blogid=' + blog.blogid;
                        blogListHtml += blogItemTplt
                            .replace('{blogTitle}', blog.title)
                            .replace('{blogPreview}', blog.preview)
                            .replace('{likedIcon}', blog.liked ? 'am-icon-thumbs-up' : 'am-icon-thumbs-o-up')
                            .replace('{likeTimes}', '(' + blog.like_times + ')')
                            .replace('{sharedIcon}', blog.shared ? 'am-icon-star' : 'am-icon-star-o')
                            .replace('{shareTimes}', '(' + blog.share_times + ')')
                            .replace('{transTimes}', '(' + blog.trans_times + ')')
                            .replace('{readTimes}', '(' + blog.read_times + ')')
                            .replace('{replyTimes}', '(' + blog.reply_times + ')')
                            .replace('{uTime}', blog.u_time)
                            .replace(/\{blogReadAllUrl\}/g, blogReadAllUrl)
                            .replace('{blogid}', blog.blogid)
                    });

                    var $blogItems = $(blogListHtml);
                    $blogItems.find('.mb-index-main-blogitem-operate-like').click(like);
                    $blogItems.find('.mb-index-main-blogitem-operate-share').click(share);
                    $blogItems.find('.mb-index-main-blogitem-operate-trans').click(trans);
                    $('.mb-index-main-blogitem-container').append($blogItems);

                    if (!data.hasNextPage) {
                        $('#bottomLoading').off('inview.scrollspy.amui', loadNextPage);
                        $('#bottomLoading').html('<span style="font-size:10px;color:#222">已加载全部...</span>');
                        return;
                    }
                }, 500);

            },
            error: onerror
        })


        function onerror() {
            setTimeout(function () {
                $this.html('<span style="font-size:14px;color:#777">' +
                    '<i class="am-icon-meh-o" style="margin-right:10px"></i>' +
                    '啊哦，出现错误了' +
                    '<a id="loadingRetry" style="cursor:pointer;font-size:14px;color:#777;margin-left:10px;text-decoration:underline">' +
                    '点击重试' +
                    '</a>' +
                    '</span>')
                $('#loadingRetry').click(function () {
                    $this.trigger('inview.scrollspy.amui');
                })
            }, 200);
        }
    }



    // 关注按钮
    $('#focusBloger').click(focusBloger)

    function focusBloger() {
        var $this = $(this);
        $.get({
            url: '/api/user/focus',
            dataType: 'json',
            data: {
                blogUserid: $('#pageInfo').attr('blogUserid')
            },
            success: function (res) {
                if (res.data.focused) {
                    toastr.success('已关注');
                    $this.html('<i class="am-icon-heart"></i><span>&nbsp;已关注</span>')
                } else {
                    toastr.success('已取消关注');
                    $this.html('<i class="am-icon-heart-o"></i><span>&nbsp;加关注</span>')
                }
                $('#fanCount').html(res.data.fanCount);
            },
            error: function () {}
        })
    }




    // 异步加载最受欢迎列表和评论最多列表
    var topItemTplt =
        '<li blogid="{blogid}" style="border:none;height:30px">' +
        '  <a href="{blogReadAllUrl}">{blogTitle}</a>' +
        '</li>';
    $.get({
        url: '/api/blog/getreadtimestoplist',
        dataType: 'json',
        data: {
            blogUserid: $('#pageInfo').attr('blogUserid')
        },
        success: function (res) {
            var $ul = $('<ul class="am-list am-text-truncate"></ul>');
            var $pageInfo = $('#pageInfo');
            var html = '';
            res.data.blogList.forEach(function (blog) {
                var blogReadAllUrl = $pageInfo.attr('indexUrl') + '/blog?blogid=' + blog.blogid;
                html += topItemTplt
                    .replace('{blogid}', blog.blogid)
                    .replace('{blogReadAllUrl}', blogReadAllUrl)
                    .replace('{blogTitle}', blog.title);
            });
            $ul.html(html);
            $('#readTimesTopList').empty().append($ul)
        },
        error: function () {
            alert('error');
        }
    })

    $.get({
        url: '/api/blog/getreplytimestoplist',
        dataType: 'json',
        data: {
            blogUserid: $('#pageInfo').attr('blogUserid')
        },
        success: function (res) {
            var $ul = $('<ul class="am-list am-text-truncate"></ul>');
            var $pageInfo = $('#pageInfo');
            var html = '';
            res.data.blogList.forEach(function (blog) {
                var blogReadAllUrl = $pageInfo.attr('indexUrl') + '/blog?blogid=' + blog.blogid;
                html += topItemTplt
                    .replace('{blogid}', blog.blogid)
                    .replace('{blogReadAllUrl}', blogReadAllUrl)
                    .replace('{blogTitle}', blog.title);
            });
            $ul.html(html);
            $('#replyTimesTopList').empty().append($ul)
        },
        error: function () {
            alert('error');
        }
    })
}())