$(document).ready(function () {
    // 页面一加载就请求用户信息
    $.ajax({
        url: 'http://localhost:3002/api/v1/admin/user/info',
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
                $('.user_info > img').attr('src', res.data.userPic);
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
})