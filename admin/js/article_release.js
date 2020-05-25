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
    // 添加日期插件
    // 添加富文本框插件
    // 发布或存为草稿
    // 发表文章
    $('.btn-release').on({
        click(e) {
            e.preventDefault();
            // FormData:传入的表单必须是dom元素
            let formdata = new FormData($('#form')[0]);
            console.log(formdata);
            // console.log($());
        }
    })
})