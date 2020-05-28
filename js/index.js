$(document).ready(function () {
    // 热点图
    $.ajax({
        url: 'http://127.0.0.1:3002/api/v1/index/hotpic',
        dataType: 'json',
        success(res) {
            console.log(res);
            if (res.code == 200) {
                $('.focus_list').html(template("host_temp", res));
            }
        }
    })
})