$(document).ready(function () {
    // 登录
    $('.input_sub').on('click', function (e) {
        e.preventDefault();
        let username = $('.input_txt').val().trim();
        let password = $('.input_pass').val().trim();
        if (username == '' || password == '') {
            // alert('用户名与密码不能为空');
            $('#myModel').modal('show');
            $('.logininfo').text('用户名与密码不能为空');
            return;
        };
        // 任何请求之后，一定要查阅接口文件
        $.ajax({
            type: 'post',
            // 基准路径：http://localhost:3002/api/v1/
            // 所有请求接口都需要拼接这个基地址
            // url: 'http://localhost:3002/api/v1/admin/user/login',
            url: BigNew.user_login,
            // ajax支持的参数类型常见的有：key=value&key1=value1    {key:value}    formData
            // 属性名称一定要参照后台接口
            data: {
                username,
                password
            },
            dataType: 'json',
            success(res) {
                console.log(res);
                if (res.code == 200) {
                    // 先弹出模态框
                    $('#myModel').modal('show');
                    $('.logininfo').text(res.msg);
                    // 跳转只有在模态框消失之后再跳转
                    // hidden.bs.modal 此事件在模态框被隐藏，并且同时在css过渡效果完成之后被触发
                    $('#myModel').on('hidden.bs.modal', function (e) {
                        // 登录成功后，后台会返回token,只需要进行本地存储
                        // 存储一定要在跳转之前储存
                        localStorage.setItem('heban_bignews_token', res.token);
                        location.href = './index.html';
                    })
                } else {
                    $('#myModel').modal('show');
                    $('.logininfo').text(res.msg);
                }
            }
        })
    })
    $('.btnconfirm').on('click', function (e) {
        $('#myModel').modal('hide');
    })
})