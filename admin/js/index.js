$(document).ready(function () {
    // 页面一加载就请求用户信息
    $.ajax({
        // url: 'http://localhost:3002/api/v1/admin/user/info',
        url: BigNew.user_info,
        dataType: 'json',
        // 在jquery中添加成员进行全局设置
        // 通过请求头的方式传递token参数，并且键只能使用Authorization
        /* headers: {
            'Authorization': 'Bearer '+localStorage.getItem('heban_bignews_token')
        }, */
        // 请求发送前来设置请求头，这个函数有一个默认参数xhr,这就是异步对象
        /* beforeSend(xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('heban_bignews_token'));
        }, */
        success(res) {
            console.log(res);
            if (res.code == 200) {
                $('.user_info,.user_center_link').children('img').attr('src', res.data.userPic);
                $('.user_info > span').html('欢迎您&nbsp;&nbsp;' + res.data.nickname);
            }
            /*  else if (res.status == 403) {
                 alert(res.msg);
                 location.href = './login.html';
             } */
        },
        // 在jquery中添加成员进行全局设置
        // 使用error来处理请求失败的场景
        /* error(err) {
            console.log(err);
            // Forbidden说明token请求已失效
            if (err.statusText == 'Forbidden') {
                alert('请求失败，请重新登录');
                location.href = './login.html';
            }
        } */
    })
    // 中间件beforeSetup
    // 可以对ajax请求进行全局设置，设置完之后，后期所有的ajax请求都会使用这个设置


    // 实现左侧菜单的样式切换和展开
    $('.level01').on({
        click() {
            // 切换样式
            $(this).addClass('active').siblings().removeClass('active');
            // 实现文章管理菜单项的展开与合并---单击文章管理才会进行展开或合并
            if ($(this).next().hasClass('level02')) {
                // 展开下一个元素
                // 水平展开或合并为toggle
                // 垂直展开或合并为slideToggle
                $(this).next().slideToggle();
                // 同时让右侧的小箭头进行旋转的切换---rotate0样式：箭头旋转90度
                // toggleClass:切换样式，如果有就移除，没有则添加
                $(this).find('b').toggleClass('rotate0');
            } else {
                // 单击的不是文章管理，而是其他的菜单项，则合并菜单管理并让箭头旋转回去
                // 让文章管理合并
                // slideUp:合并   slideDown:展开
                $('.level02').slideUp();
                // 清除变化的样式，让箭头旋转回去
                $('.level01').find('b').removeClass('rotate0');
                // 清除子项可能添加的样式active
                $('.level02 > li').removeClass('active');
            }
        }
    })


    // 单击子项菜单切换样式
    $('.level02 > li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })

    // 实现退出
    $('.logout').on({
        click() {
            // 删除token
            // removeItem:清除指定的本地存储
            // clear:全部清除
            localStorage.removeItem('heban_bignews_token');
            // 退回到登录页
            location.href = './login.html';
        }
    })


    /* $('.level01').on({
        click() {
            $(this).addClass('active').siblings().removeClass('active');
            if ($(this).next().hasClass('level02')) {
                $(this).next().slideToggle();
                $(this).find('b').toggleClass('rotate0');
            } else {
                $('.level02').slideUp();
                $('.level02 > li').removeClass('active');
                $('.level01').find('b').removeClass('rotate0');
            }
        }
    })
    $('.level02 > li').on({
        click() {
            $(this).addClass('active').siblings().removeClass('active');
        }
    }) */
})