$(document).ready(function () {
    // 发表文章
    // 前台页面的所有操作都是伪后台接口所要求的服务器数据
    // 意味着在前台主要是接收数据
    // 后台接口的请求参数：通过formData提交
    // 图片不是单独进行上传，而是提交时统一传递，所以需要使用dormData来收集数据
    // 文件预览

    // 获取富文本框的数据
    // 添加的textarea并不是在页面中真正操作的元素，因为插件会创建一个富文本框结构覆盖到textarea上，意味着用户交互的元素是富文本框结构而不是textarea
    // 意味着不能从textarea去获取用户数据
    // 获取数据（关于数据的格式）
    // 1.富文本框的内容格式为html结构
    // 2.只有这种结构才能记录下内容的格式和结构
    // 发布或存为草稿
    // 发表文章
    $('.btn-release,.btn-draft').on({
        click(e) {
            e.preventDefault();
            // 获取tinymce编辑器文本
            // 所取到的值为网页结构
            // activeEditor:当前的富文本框
            // getContent():获取当前文本框的内容
            console.log(tinymce.activeEditor.getContent());
            $(this).text() == '发布' ? publish('已' + $(this).text()) : publish();
        }
    })

    function publish(state) {
        // FormData:传入的表单必须是dom元素
        let formdata = new FormData($('#form')[0]);
        // console.log(formdata);
        // console.log(...formdata);
        // 单独的追加文章内容
        formdata.append('content', tinymce.activeEditor.getContent());
        // 添加文章类型：已发布或者是草稿
        state && formdata.append('state', state);
        console.log(...formdata);
        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
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