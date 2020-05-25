$(document).ready(function () {
    // 页面一加载就立刻发起ajax请求获取用户详情
    $.ajax({
        url: BigNew.user_detail,
        dataType: 'json',
        success(res) {
            console.log(res);
            // 操作DOM
            $('[name="username"]').val(res.data.username);
            $('[name="nickname"]').val(res.data.nickname);
            $('[name="email"]').val(res.data.email);
            $('[name="password"]').val(res.data.password);
            $('.user_pic').attr('src', res.data.userPic);
        }
    });


    // 一选择文件就实现预览
    // 后台处理方式和之前的ajax不一样，以前是上传文件，获取文件的名称，实现img标签的src属性设置并进行二次请求，以达到预览的目的
    //现在完全不一样，所以想实现预览，必须通过本地文件的读取或转换来实现
    $('#exampleInputFile').on({
        change() {
            // 1.获取当前的所选择的文件对象
            let myFile = this.files[0];
            // 2.根据文件对象生成一个Url,它将这个文件托管到当前的页面服务器中，并且返回一个服务器中的路径
            let url = URL.createObjectURL(myFile); 
            console.log(url);
            // 3.将url赋值给img的src属性
            $('.user_pic').attr('src', url);
        }
    })


    // 个人信息的编辑
    // formData可以收集到type='file'这种表单的数据，且收集到的数据是文件对象的数据
    // 如果没有修改图片，那么收集到的图片数据为空字符串"",不会进行修改操作
    $('.btn-edit').on({
        click(e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: BigNew.user_edit,
                data: new FormData($('#form')[0]), //formData能收集图片数据
                dataType: 'json',
                // 不让ajax进行数据的处理
                processData: false,
                // 不让ajax进行编码的处理
                contentType: false,
                success(res) {
                    console.log(res);
                    /*  console.log($('#form')[0]);
                     console.log(new FormData($('#form')[0])); */
                    alert(res.msg);
                    window.parent.location.reload();
                }
            })
        }
    })
})