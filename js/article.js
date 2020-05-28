$(document).ready(function () {
    let id = location.search.split('=')[1];
    $.ajax({
        url: 'http://127.0.0.1:3002/api/v1/index/article',
        data: {
            id
        },
        dataType: 'json',
        success(res) {
            console.log(res);
            $('.article_temp').html(template("article_temp", res.data));
        }
    })
})