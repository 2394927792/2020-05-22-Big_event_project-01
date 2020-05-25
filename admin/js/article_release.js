$(document).ready(function () {
    // 发表文章
    // 前台页面的所有操作都是伪后台接口所要求的服务器数据
    // 意味着在前台主要是接收数据
    // 后台接口的请求参数：通过formData提交
    // 图片不是单独进行上传，而是提交时统一传递，所以需要使用dormData来收集数据
    // 文件预览
    // 实现文件预览-----一选择文件就实现文件预览
    $('#inputCover').on({
        change() {
            // 1.获取文件对象
            let myFile = this.files[0];
            // 2.生成url
            let url = URL.createObjectURL(myFile);
            // 3.赋值给img标签的src属性
            $('.article_cover').prop('src', url);
        }
    })
    // 实现分类数据的动态渲染
    // 1.模板创建
    // 2.发送ajax请求
    $.ajax({
        url: BigNew.category_list,
        dataType: 'json',
        success(res) {
            console.log(res);
            if (res.code == 200) {
                // 模板中使用的是所传递的数据对象的属性名称
                $('.category').html(template("category_temp", res));
            }
        }
    })
    // 添加日期插件一般会建议
    // 使用到jeDate日期插件
    // 1.引入jeDate日期插件资源文件
    // 2. 指定使用对象
    // 希望操作哪个dom元素出现日期控件
    // 一般会建议使用input
    // 3. 初始化
    jeDate("#article_date", {
        trigger: 'click',
        theme: {
            // bgcolor:背景色
             bgcolor: "#00A1CB",
            color: "#ffffff",
            pnColor: 'orange'
        },
        format: "YYYY-MM-DD",
        isinitVal: true
    });   // pnColor:本月与其他月的颜色区分

    // 4.获取：让插件起作用
    // 日期插件的值最终既阻碍文本框中，可以依据获取文本框区域的值进行操作
    // 1.直接dom操作获取
    // 2.支持serialize
    // 3.支持formdata
    /* 1. 能给默认值的就给默认值
    2. 能让他选择的就别让输入
    3. 一定要输入的话就需要给出清晰的提示 */
    // 添加富文本框插件
    // 会使用tinyMCE插件
    // 引入资源文件
    // 指定使用对象
    // 初始化富文本框
    tinymce.init({
        selector: '#article_content',
        language: 'zh_CN',
        directionality: 'ltl',
        browser_spellcheck: true,
        contextmenu: false,
        // 清除询问的标识
        branding: false,
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table contextmenu paste imagetools wordcount",
            "emoticons",
            "code"
        ],
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | emoticons | code"
    })
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