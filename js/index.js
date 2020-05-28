$(document).ready(function () {
    // ???
    function init(url, elm, temp) {
        $.ajax({
            url: 'http://127.0.0.1:3002/api/v1/index/' + url,
            dataType: 'json',
            success(res) {
                console.log(res);
                if (res.code == 200) {
                    $(elm).html(template(temp, res));
                }
            }
        })
    }
    init('hotpic', '.focus_list', "host_temp");
    init('rank', '.hotrank_list', "hot_temp");
    init('latest', '.common_news', "new_temp");
})