$(function() {
    // 表单校验初始化
    var $form = $('form');
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "用户名长度必须在6到30之间"
                    },
                    callback: {
                        message: "密码错误"
                    }

                }
            }
        }

    })


    // 表单校验成功事件
    $form.on("success.form.bv", function(e) {
        e.preventDefault();
        console.log('hehe');
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $form.serialize(),
            success: function(data) {
                console.log(data);
                if (data.success) {
                    location.href = "index.html"
                }
                if (data.error === 1000) {
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
                }
                if (data.error === 1001) {
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
                }

            }
        })
    })
    $("[type='reset']").on("click", function() {

        //重置样式
        $form.data("bootstrapValidator").resetForm();

    });
})