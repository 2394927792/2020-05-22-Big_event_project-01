$(document).ready(function () {
    // 由于新增与编辑的部分功能相同
    // 为了减少代码的冗余，可以将这一部分操作提取到一个单独的js文件中，然后进行引入

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
    }); // pnColor:本月与其他月的颜色区分

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
})