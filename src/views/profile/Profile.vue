<template>
  <div class="profile">
    <h1>登录</h1>
    <div class="login">
      <img src="~assets/img/wx.png" alt="" /><span>微信登陆</span>
    </div>
    <div class="login-other">其他登录方式</div>
    <div class="login_way">
      <div class="qq">
        <img src="~assets/img/qq.png" alt="" /> <span>QQ登录</span>
      </div>
      <div class="phone">
        <img src="~assets/img/phone.png" alt="" /> <span>免密登录</span>
      </div>
      <div class="person">
        <img src="~assets/img/person.png" alt="" /> <span>账号登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
};
</script>
<style scoped>
.profile {
  margin: 50px 0;
}
.profile h1 {
  margin: 65px 0 42px;
  text-align: center;
  font-size: 25px;
  font-weight: 500;
  color: #444;
  letter-spacing: 2px;
}
.login {
  width: 300px;
  height: 50px;
  margin: 0 auto;
  line-height: 50px;
  text-align: center;
  background-color: rgb(9, 187, 7);
  border-radius: 50px;
}
.login img {
  width: 25px;
  vertical-align: middle;
}
.login span {
  font-size: 18px;
  color: #fff;
  margin: 0 10px;
}
.login-other {
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  color: #999;
  margin: 100px 0 60px;
}
.login_way {
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 315px;
  height: 122px;
  color: #666;
}
.login_way span {
  font-size: 13px;
  margin-top: 10px;
}
.qq,
.phone,
.person {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login_way img {
  width: 44px;
}
</style>