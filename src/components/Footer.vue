<template>
  <div class="footer">
    <div class="footer-container">
      <div class="footerList">
        <div class="footerItem">
          <h4>爱心指南</h4>
          <ul class="footerItemCon">
            <li>爱心流程</li>
            <li>证书介绍</li>
            <li>真伪查询</li>
            <li>常见问题</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>联系我们</h4>
          <ul class="footerItemCon">
            <li>微信搜索:搞点薯条吃</li>
            <li>qq添加：2578731420</li>
            <li>手机联系:12345678</li>
            <li>邮箱地址:1234567@qq.com</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>宠物救助中心</h4>
          <ul class="footerItemCon">
            <li>茂名宠物基地</li>
            <li>吴忠市宠物饱和协会</li>
            <li>哈尔滨猫狗之家</li>
            <li>延吉动物救助站</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>相关保护法</h4>
          <ul class="footerItemCon">
            <li>昌都市养犬保护法2021</li>
            <li>遵义市养犬保护条例2022</li>
            <li>同仁市养犬规定2020</li>
            <li>厦门养犬条例</li>
          </ul>
        </div>
      </div>
      <!-- <div class="copyright">
        <p>地址：哈尔滨市南岗区哈尔滨理工大学新主楼2301</p>
        <p>黑ICP备19006430号</p>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.footer {
  background-color: #eaeaea;

  .footer-container {
    width: 1200px;
    margin: 0 auto;
    padding: 0 15px;

    .footerList {
      padding: 20px;
      border-bottom: 1px solid #e4e1e1;
      border-top: 1px solid #e4e1e1;
      overflow: hidden;
      padding-left: 40px;

      .footerItem {
        width: 25%;
        float: left;

        h4 {
          font-size: 14px;
        }

        .footerItemCon {
          li {
            line-height: 25px;
          }
        }
        li:hover {
            cursor: pointer;
            background-color: gray;
        }

        &:last-child img {
          width: 121px;
        }
      }
    }

    .copyright {
      padding: 20px;

      .helpLink {
        text-align: center;

        li {
          display: inline;

          .space {
            border-left: 1px solid #666;
            width: 1px;
            height: 13px;
            background: #666;
            margin: 8px 10px;
          }
        }
      }

      p {
        margin: 10px 0;
        text-align: center;
      }
    }
  }
}
</style>

