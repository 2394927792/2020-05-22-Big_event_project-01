$(document).ready(function () {
    // 文件列表的动态渲染-----查询
    // 查阅后台接口-----ajax请求-----分析数据-----创建模板-----调用模板引擎-----填充到指定的位置
    // 1.数据初始化
    // 定义变量进行测试
    let page = 1,
        perpage = 8;

    function init() {
        $.ajax({
            url: BigNew.article_query,
            data: {
                page,
                perpage
            },
            dataType: 'json',
            success(res) {
                console.log(res);
                if (res.code == 200) {
                    $('tbody').html(template("list_temp", res.data))
                }
            }
        })
    }
    init();
    // 实现分页功能-----查询
    // 实现数据筛选-----查询
    // 数据删除
    // 发表文章-----跳转
    // 文章编辑-----跳转
})