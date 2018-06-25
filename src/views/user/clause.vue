<template>
    <div class="clause">
        <helmet title="用户协议" show-right="true"></helmet>
        <div  class="clause-box"><div  class="clause-content"><h3  class="title">药居士使用协议：</h3><p  class="para">
        一、药居士服务条款的确认和接纳<br > 药居士提供的服务将完全按照其发布的章程、服务条款和操作规则严格执行。会员必须完全同意所有服务条款并完成注册程序，才能成为药居士的正式会员。
      </p><p  class="para">二、服务简介<br > 药居士运用自己的操作系统通过国际互联网络为会员提供网络服务。同时，会员必须:
        <br > (1)提供详尽、准确的个人资料。
        <br > (2)不断更新注册资料，符合及时、详尽、准确的要求。
        <br > 药居士对会员不公开会员的姓名、地址、电子邮箱和联系方式， 除以下情况外：<br > (1)会员授权药居士透露这些信息。
        <br > (2)相应的法律及程序要求药居士提供会员的个人资料。 如果会员提供的资料包含有不正确的信息，药居士保留结束会员使用网络服务资格的权利。</p><p class="para">三、服务条款的修改和服务修订<br > 药居士有权在必要时修改服务条款，药居士服务条款一旦发生变动，将会在重要页面上提示修改内容。如果不同意所改动的内容，会员可以主动取消获得的网络服务。如果会员继续享用网络服务，则视为接受服务条款的变动。药居士保留随时修改或中断服务而不需知照会员的权利。药居士行使修改或中断服务的权利，不需对会员或第三方负责。
      </p><p  class="para">四、会员隐私制度<br > 尊重会员个人隐私是药居士的一项基本政策。所以，作为对以上第二点会员注册资料分析的补充，药居士一定不会在未经合法会员授权时公开、编辑或透露其注册资料及保存在药居士中的非公开内容，除非有法律许可要求或药居士在诚信的基础上认为透露这些信件在以下四种情况是必要的：
        <br > (1)遵守有关法律规定，遵从药居士合法服务程序。
        <br > (2)保持维护药居士的商标所有权。
        <br > (3)在紧急情况下竭力维护会员个人和社会大众的隐私安全。
        <br > (4)符合其他相关的要求。
      </p><p  class="para">五、会员的帐号，密码和安全性<br > 会员一旦注册成功，成为药居士的合法会员，将得到一个密码和会员名。会员将对会员名和密码安全负全部责任。另外，每个会员都要对以其会员名进行的所有活动和事件负全责。会员若发现任何非法使用会员帐号或存在安全漏洞的情况，请立即告知药居士。
      </p><p  class="para">六、对会员信息的存储和限制<br > 药居士不对会员所发布信息的删除或储存失败负责。药居士有判定会员的行为是否符合药居士服务条款的要求和精神的保留权利，如果会员违背了服务条款的规定，药居士有中断对其提供网络服务的权利。
      </p><p  class="para">七、会员管理<br > 会员单独承担发布内容的责任。会员对服务的使用是根据所有适用于药居士的国家法律、地方法律和国际法律标准的。 会员必须遵循：<br > (1)从中国境内向外传输技术性资料时必须符合中国有关法规。
        <br > (2)使用网络服务不作非法用途。
        <br > (3)不干扰或混乱网络服务。
        <br > (4)遵守所有使用网络服务的网络协议、规定、程序和惯例。
        <br > 会员须承诺不传输任何非法的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽等信息资料。另外，会员也不能传输任何教唆他人构成犯罪行为的资料；不能传输助长国内不利条件和涉及国家安全的资料；不能传输任何不符合当地法规、国家法律和国际法律的资料。未经许可而非法进入其它电脑系统是禁止的。若会员的行为不符合以上提到的服务条款，药居士将作出独立判断立即取消会员服务帐号。会员需对自己在网上的行为承担法律责任。会员若在药居士上散布和传播反动、色情或其他违反国家法律的信息，药居士的系统记录有可能作为会员违反法律的证据。
      </p><p class="para">八、法律<br > 如发生药居士服务条款与中华人民共和国法律相抵触时，则这些条款将完全按法律规定重新解释，而其它条款则依旧保持对会员产生法律效力和影响。
      </p></div><footer  class="footer"><p class="tel">药居士全国免费专线 400-6666-800</p><p ></p><p >药品交易资格证 粤C2014009</p><p  class="copyright">©2006-2018 药居士 版权所有</p></footer></div>
    </div>
</template>
<script>
import helmet from "../../components/public/helmet.vue";
export default {
  components: {
    helmet
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_func.scss";
.clause-content {
  padding: 0 pxToRem(34px);
  background-color: #ffffff;
  overflow: hidden;
}

.title {
  font-size: pxToRem(34px);
  margin-top: pxToRem(26px);
  font-weight: 700;
}

.para {
  margin-top: pxToRem(17px);
  font-size: pxToRem(22px);
  line-height: pxToRem(41px);
  color: #777;
}

.footer {
  font-size: pxToRem(24px);
  text-align: center;
  margin-top: pxToRem(20px);
  padding: pxToRem(24px) 0;
  p {
    margin: pxToRem(17px) 0;
  }
}

.tel {
  width: pxToRem(440px);
  height: pxToRem(51px);
  -webkit-border-radius: 4px;
  border-radius: 4px;
  line-height: pxToRem(51px);
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  background: #0d75ae;
  text-align: center;
  color: #fff;
  margin: 0 auto !important;
}
.copyright {
  font-size: pxToRem(22px);
  color: #666;
  margin-bottom: 0;
}
</style>
