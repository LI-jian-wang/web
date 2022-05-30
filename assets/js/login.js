$(function () {
   // 点击去注册账号
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });

//   接引模块
  const form = layui.form;

  // 通过 form.verify() 方法自定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    repwd: (val) => {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      const pwd = $(".reg-box [name=password").val();
      if (pwd !== val) return "两次密码不一致";
    },
  });

  
  const layer = layui.layer;

  const baseUrl = "http://www.liulongbin.top:3007";

  // 监听注册表单，发送注册请求
  $("#form_reg").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url:"/api/reguser",
      data: {
        username: $("#form_reg [name=username").val(),
        password: $("#form_reg [name=password").val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg("注册失败");
        layer.msg("注册成功！");
        // 注册成功后跳转到登录界面
        $("#link_login").click();
      },
    });
  });

//   登录功能
$("#form_login").on("submit",function(e){
    e.preventDefault(); 
    $.ajax({
        type: "POST",
        url:"/api/login",
        data: $(this).serialize(),
        success: (res) => {
          if (res.status !== 0) return layer.msg("登录失败");
         layer.msg("登录成功！");
         localStorage.setItem("token",res.token);
         location.href="/index.html";
         
        },
})
})
})