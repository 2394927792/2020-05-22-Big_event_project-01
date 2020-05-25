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
                perpage,
                // 添加文章的分类参数
                type: $('#selCategory').val(),
                // 添加文章的筛选参数
                state: $('#selStatus').val()
            },
            dataType: 'json',
            success(res) {
                console.log(res);
                if (res.code == 200) {
                    $('tbody').html(template("list_temp", res.data));
                    // 渲染分页结构
                    // totalPage:返回了总页数
                    if (res.data.totalPage > 0) {
                        setPage(res.data.totalPage);
                    } else {
                        alert('查询结果为空');
                        setPage(1);
                    }
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

    // 实现分页功能
    // 分页效果功能的实现主要完成两个方面的
    // 添加分页插件（这个插件会自动的生成分页结构，并放置到指定的dom元素中)
    //ajax请求的时候需要传递当前页码作为参数
    // bootstrapMajorVersion:当前bootstrap版本，如果是版本3.*那么后期的分页结构需要使用ul，如果版本是2.*，那么分页结构需要使用div
    // currentPage:当前页码，对于用户而言，最直观的作用就是为当前代码添加一个样式
    // totalPages:总页数，一定要设置合理的总页数，如果没有设置那么分页插件不会生成扥也结构，这个值往往需要后台的支持，后台一般会返回类似总页数、总记录数这样的数据
    // onPageClicked:页码被单击时触发，在这个事件中需要根据当前页码重新发起ajax请求
    /**
     *
     * @param pageCurrent 当前所在页
     * @param pageSum 总页数
     * @param callback 调用ajax
     */
    function setPage(pageSum) {
        // $(".pagination").bootstrapPaginator:调用bootstrapPaginator生成分页结构，并放置到指定的dom元素中
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: page,
            // 总页数
            totalPages: pageSum,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event, originalEvent, type, index) {
                // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                // page为当前单击页码的值
                console.log(index);
                if (page != index) {
                    page = index;
                    // 根据新的页码值重新发起ajax请求
                    init();
                }
            }
        })
    }
    // 文章数据的筛选
    // type:文章分类需要动态加载
    // state:文章状态，固定写死，只有两种
    // 文章分类动态加载
    // 1.option标签之间的值是给用户看的值
    // 2.option标签的value
    // 实现文章列表的筛选
    // 关键获取用户所选择的数据
    // 动态加载文章数据
    $.ajax({
        url: BigNew.category_list,
        // 根据后台的处理业务逻辑，如果传入的参数是空字符串，那么就不要以这个条件进行处理
        // “所有状态”或是“所有分类”的value值都是设置为空字符串
        dataType: 'json',
        success(res) {
            console.log(res);
            if (res.code == 200) {
                // 模板中使用的是所传递的数据对象的属性名称
                $('#selCategory').html(template("category_temp", res));
            }
        }
    })
    // 实现文章数据的筛选
    $('#btnSearch').on({
        click(e) {
            e.preventDefault();
            let type = $('#selCategory').val();
            let state = $('#selStatus').val();
            console.log(type, state);
            // 筛选之后，应该将页码重置为1
            page = 1;
            // 调用ajax根据搜索条件发起数据请求
            init();
        }
    })
    // 文章数据的删除
    $('tbody').on('click', '.delete', function (e) {
        e.preventDefault();
        console.log($(this).data().id);
        let id = $(this).data().id;
        $.ajax({
            type: 'post',
            url: BigNew.article_delete,
            data: {
                id
            },
            dataType: 'json',
            success(res) {
                console.log(res);
                if (res.code == 204) {
                    alert(res.msg);
                    // 细节处理
                    // 删除之后刷新，如果在进行删除的时候，当前页面还有多条记录，那么直接删除记录，页码不用变化
                    // 如果在进行删除时，页面只有一条记录，那么删除之后，应该回到上一页进行刷新
                    // 先删除后刷新
                    // 意味着在刷新之后，如果表格中的数据行的数量大于1，说明不用刷新到上一页
                    // 如果在刷新之前，表格中的数据只有一条，说明这一条已经被删除，本质上应该到上一页继续进行刷新
                    // 判断当前表格中所剩下的数据行的数量，如果数量等于1，那么就要刷新到上一页
                    // 删除和刷新是两个不同的操作
                    // 代码到这删除操作已经完成
                    if ($('tbody'.find('tr').length == 1)) {
                        // 说明这里不是第一页，否则没法减
                        if (page > 1) {
                            page--;
                        }
                    }
                    init();
                }
            }
        })
    })
})