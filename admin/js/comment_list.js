$(document).ready(function () {
    // 评论数据的动态渲染
    let page = 1,
        perpage = 6;
    // 模板
    // ajax请求
    function init() {
        $.ajax({
            // 访问一个对象不存在的属性会得到undefined
            // 访问一个不存在的变量会报错
            // 如果写错url相当于设置url为undefined,那么ajax会默认设置为当前的网页地址
            url: BigNew.comment_list,
            data: {
                page,
                perpage
            },
            dataType: 'json',
            success(res) {
                console.log(res);
                if (res.code == 200) {
                    $('tbody').html(template("comment_temp", res.data));
                    // 生成分页结构
                    setPage(res.data.totalPage);
                }
            }
        })
    }
    // 分页
    // 引入资源
    // 封装分页方法,以总页作为参数
    // pageSum:总页数
    function setPage(pageSum) {
        // bootstrapPaginator:实现分页的核心方法
        $("#pagination").bootstrapPaginator({
            // 设置版本号,版本号不一样,放置分页结构的dom元素不一样
            bootstrapMajorVersion: 3,
            // 当前页码
            currentPage: page,
            // 总页数,它会根据这个值生成合理的页码结构
            totalPages: pageSum,
            // 参数传递-----对应原则:数量对应,顺序对应,类型对应
            onPageClicked: function (event, originalEvent, type, index) {
                // index:用户当前所点击的页码
                // ajax请求需要查询这个页码的数据
                // 修改全局的page,因为在ajax中是参照这个page进行数据查询的
                if (page != index) {
                    page = index;
                    init();
                }
            }
        });
    }
    // 调用方法实现分页功能
    init();

    function opt(url) {
        $.ajax({
            type: 'post',
            url: BigNew['comment_' + url],
            data: {
                id: $(this).data('id')
            },
            dataType: 'json',
            success(res) {
                console.log(res);
                if (res.code == 200) {
                    alert(res.msg);
                    init();
                }
            }
        })
    }
    // 批准评论
    // 拒绝评论
    // 删除评论
    // 事件委托方式实现
    $('tbody').on('click', '.newBtn', function (e) {
        e.preventDefault();
        opt.call(this, $(this).data('name'));
    })
})