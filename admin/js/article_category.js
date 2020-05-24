$(document).ready(function () {
    // 1.动态渲染分类数据
    function init() {
        $.ajax({
            url: BigNew.category_list,
            dataType: 'json',
            success(res) {
                console.log(res);
                if (res.code == 200) {
                    // 模板中使用的是所传递的数据对象的属性名称
                    $('tbody').html(template("category_temp", res));
                }
            }
        })
    }
    // 数据初始化
    init();



    //实现分类数据的新增
    $('.btn-add').on({
        click() {
            // 收集数据
            let name = $('#name').val().trim();
            let slug = $('#slug').val().trim();
            // console.log(name, slug);
            if (name == '' || slug == '') {
                alert('请输入名称与别名');
                return;
            }
            $.ajax({
                type: 'post',
                url: BigNew.category_add,
                data: {
                    name,
                    slug
                },
                dataType: 'json',
                success(res) {
                    console.log(res);
                    if (res.code == 201) {
                        alert(res.msg);
                        // 隐藏模态框
                        $('#myModal').modal('hide');
                        // 清空表单元素的数据，使用元素的reset方法实现
                        $('form')[0].reset();
                        // 刷新---局部刷新
                        init();
                    }
                }
            })
        }
    })



    // 分类数据的编辑
    // 让编辑按钮与模态框关联---修改模板
    // 实现默认数据的展示-----获取数据
    // 1.如果自己有数据，那么就直接使用
    // 2.如果有给你，就设置参数
    // 3.如果没有，就先储存在获取
    // 储存
    // 将要编辑的数据存储到编辑文件的自定义属性中，将来在事件中通过this来获取`
    // 需要进行修改模板
    // 在jq获取自定义属性:$().data()
    // 获取
    // 事件添加，需要用到事件委托，因为动态生成的元素绑定事件需要使用事件委托，否则获取不到元素
    //单击编辑按钮：弹出模态框+数据的默认展示
    $('tbody').on('click', '.btn-edit', function () {
        // data:获取当前元素的所有自定义属性
        console.log($(this).data());
        /*  let id = $(this).data('id');
          let name = $(this).data('name');
           let slug = $(this).data('slug'); */
        // 添加结构，更加方便的获取值
        let {
            id,
            name,
            slug
        } = $(this).data();
        console.log(id, name, slug);
        $('#name').val(name);
        $('#slug').val(slug);
        //以隐藏域的方式存储id
        $('#category_id').val(id);
        // 修改弹出框元素的内容
        $('.modal-title').text('编辑分类');
        $('.btn-add').text('编辑');
    })
    // 修改弹出框元素的内容
    $('#xinzengfenlei').on({
        click() {
            $('.modal-title').text('新增分类');
            $('.btn-add').text('新增');
        }
    })
})