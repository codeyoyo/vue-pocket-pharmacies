<template>
    <footer>
        <ul class="footer-nav">
            <li>
            <a rel="nofollow">欢迎您：131689*****</a>|
                <a rel="nofollow">退出</a>
            </li>
            <li>
                <a href="//m.jianke.com/about.html" rel="nofollow" >
                关于药居士</a>|
                <a href="//m.jianke.com/help.html" rel="nofollow" >
                帮助中心
                </a>
            </li>   
        </ul>
        <dl class="footer-list">
            <dd>药居士全国免费专线
                <a href="tel:4006666800" rel="nofollow" >400-6666-800</a>
            </dd>
            <dd>药品交易资格证：粤C20140009</dd>
            <dd>Copyright©2006-2017 健客 版权所有</dd>
        </dl>
    </footer>
</template>

<script>
export default {};
</script>


<style lang="scss">
@import "../../sass/_func.scss";
footer {
  -webkit-box-flex: 0;
  -webkit-flex: 0 1;
  -ms-flex: 0 1;
  flex: 0 1;
  background: #fff;
  padding-bottom: pxToRem(30px);
}

.footer-nav {
  padding: pxToRem(28px) 0 pxToRem(24px);
  overflow: hidden;
  li {
    text-align: center;
    font-size: pxToRem(22px);
    line-height: 1.5;
    float: left;
    a {
      color: #888;
      &:nth-of-type(n + 1) {
        padding: 0 pxToRem(5px) 0 pxToRem(10px);
      }
      &:nth-of-type(n + 2) {
        padding: 0 pxToRem(10px) 0 pxToRem(5px);
      }
    }
    &:last-of-type {
      float: right;
    }
  }
}

.footer-list {
  color: #666;
  font-size: pxToRem(22px);
  text-align: center;
}

dd {
  font-size: pxToRem(22px);
  line-height: pxToRem(34px);
  color: #888;
  a {
    text-decoration: none;
    color: #888;
  }
}
</style>

