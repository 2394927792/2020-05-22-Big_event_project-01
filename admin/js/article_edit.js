$(document).ready(function () {
    // 实现编辑页面的跳转:传递当前文章id
    // 实现编辑页面布局
    // 分类数据的动态加载、日期插件的添加、富文本框插件的添加
    // 引入需要的资源文件、添加页面中必须的结构、封装代码到单独的js文件、引入封装到js文件中
    // 实现数据的默认展示
    // 1.获取数据-----根据文章id查询数据
    // search可以获取当前请求url中？及其后面的内容
    // split的方式只能处理单个参数的情况
    // let id = location.search.split('=')[1];
    let id = itcast.getArguments(location.search).id;
    console.log(id);
    // 根据id获取文件详情数据
    $.ajax({
        url: BigNew.article_search,
        data: {
            id
        },
        dataType: 'json',
        success(res) {
            console.log(res);
            if (res.code == 200) {
                $('#inputTitle').val(res.data.title);
                $('.article_cover').attr('src', res.data.cover);
                // 下拉列表：下拉列表赋值的值有两种方式
                // 1.赋值字符串-----不常见
                // 2.赋值value值，它会找到与value值匹配的选项进行显示
                $('.category').val(res.data.categoryId);
                $('#article_date').val(res.data.date);
                // 富文本框
                $('#article_content').val(res.data.content);
                // /*细节：由于tinymce比较复杂，加载需要时间。
                //     一旦网速过快，就有可能导致数据已经返回，但是插件还没加载完的情况
                //     解决方案：使用定时器延迟加载（可以添加一个loading动画迷惑用户）
                // */
                // setTimeout(function () {
                //     tinymce.activeEditor.setContent(backData.data.content)
                // }, 200);
            }
        }
    })
    // 2.dom操作 | 模板引擎
    // 实现编辑操作-----收集数据
    // 富文本框可以帮助我们解析html结构
    $('.btn-edit,.btn-draft').on({
        click(e) {
            e.preventDefault();
            $(this).text() == '修改' ? opt('已发布') : opt();
        }
    })
    // 封装编辑与存为草稿的方法
    function opt(state) {
        // 使用formdata收集数据
        let formdata = new FormData($('#form')[0]);
        // 文本内容
        formdata.append('content', tinymce.activeEditor.getContent());
        // 添加id条件
        formdata.append('id', id);
        // 文章状态
        state && formdata.append('state', state);
        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data: formdata,
            dataType: 'json',
            processData: false,
            contentType: false,
            success(res) {
                console.log(res);
                if (res.code == 200) {
                    alert(res.msg);
                    location.href = './article_list.html';
                }
            }
        })
    }
})