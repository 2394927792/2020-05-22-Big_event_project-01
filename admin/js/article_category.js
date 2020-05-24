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


    // 封装实现新增与编辑
    function opt(url, data) {
        $.ajax({
            type: 'post',
            url: url,
            // serialize()会报错,因为获得隐藏域中的id值，并且是空值，为空字符串
            // insert into 表 values(null,......) -----null:是状态值
            // insert into 表 values('',......) ------ 报错
            data: data,
            dataType: 'json',
            success(res) {
                console.log(res);
                // 新增成功与编辑成功
                if (res.code == 201 || res.code == 200) {
                    alert(res.msg);
                    // 隐藏模态框
                    $('#myModal').modal('hide');
                    // 清空表单元素的数据，使用元素的reset方法实现
                    $('form')[0].reset();
                    // 刷新---局部刷新
                    init();
                }
            },
            // name和slug在数据表中是唯一值-----值不能重复
            //opt方法中添加失败处理方法
            error(err) {
                console.log(err);
                alert(err.responseJSON.msg);
            }
        })
    }


    // 计录当前分类时在编辑前的值
    let temp = {};

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
            // 判断应该执行的操作
            if ($(this).text() == '新增') {
                /* $.ajax({
                    type: 'post',
                    url: BigNew.category_add,
                    // serialize()会报错,因为获得隐藏域中的id值，并且是空值，为空字符串
                    // insert into 表 values(null,......) -----null:是状态值
                    // insert into 表 values('',......) ------ 报错
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
                }) */
                opt(BigNew.category_add, {
                    name,
                    slug
                });
            } else {
                /* $.ajax({
                    type: 'post',
                    url: BigNew.category_edit,
                    data: {
                        id: $('#category_id').val(),
                        name,
                        slug
                    },
                    dataType: 'json',
                    success(res) {
                        console.log(res);
                        if (res.code == 200) {
                            alert(res.msg);
                            // 隐藏模态框
                            $('#myModal').modal('hide');
                            // 清空表单元素的数据，使用元素的reset方法实现
                            $('form')[0].reset();
                            // 刷新---局部刷新
                            init();
                        }
                    }
                }) */
                /* opt(BigNew.category_edit, {
                    name,
                    slug,
                    id: $('#category_id').val()
                }); */
                if (temp.name == name && temp.slug == slug) {
                    alert('编辑操作至少修改其中一个值，否则取消当前操作')
                } else {
                    // 编辑需要传入id参数作为条件
                    opt(BigNew.category_edit, {
                        name,
                        slug,
                        id: $('#category_id').val()
                    });
                }
            }
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
        // 记录分类数据在编辑前的值
        temp = {
            name,
            slug
        };
        console.log(id, name, slug);
        $('#name').val(name);
        $('#slug').val(slug);
        //以隐藏域的方式存储id
        $('#category_id').val(id);
        // 修改数据时修改弹出框元素的内容
        $('.modal-title').text('编辑分类');
        $('.btn-add').text('编辑');
    })
    // 添加数据时修改弹出框元素的内容
    $('#xinzengfenlei').on({
        click() {
            $('.modal-title').text('新增分类');
            $('.btn-add').text('新增');
        }
    })

    // 模态框中的取消
    /* $('.btn-cancel,.close').on({
        click() {
            // reset是原生方法， 可以重置指定表单的所有表单元素的默认值
            $('form')[0].reset();
        }
    }) */
    // 单击编辑后不想编辑，在单击新增数据没有清空的问题解决
    $('.btn-cancel,.close').on('hidden.bs.modal', () => {
        $('form')[0].reset();
    })




    // 分类数据的删除(不要删除原始的分类数据)
    // 事件委托
    // 根据后台接口的要求获取类别的id：存储再获取----- 自定义属性
    // 修改模板结构
    // 实现分类数据的删除
    $('tbody').on('click', '.btn-del', function () {
        // 1.获取id
        let id = $(this).data('id');
        if (confirm('是否确定删除当前数据')) {
            $.ajax({
                type: 'post',
                url: BigNew.category_delete,
                data: {
                    id
                },
                dataType: 'json',
                success(res) {
                    console.log(res);
                    if (res.code == 204) {
                        alert(res.msg);
                        init();
                    }
                }
            })
        }
    })
})