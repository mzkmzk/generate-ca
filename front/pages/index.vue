<template>
  <div>
    <div class="container">
      <div>
        <h1 class="title">
          Generate-CA
        </h1>
        <h2 class="subtitle">
          Generate Self-Trusted Root Certificate & User Certificate
        </h2>
        <div class="dns">

            <div>
              <el-input style="width: 320px" v-model="dns0" placeholder="输入域名: *.xxx.com"></el-input>
              <el-button
                type="primary"
                :loading="generateStatus === GENERATE_STATUS.SENDING"
                @click="sendGenerateCA"
              >{{ generateStatus === GENERATE_STATUS.SENDING ? '生成证书中' : '生成证书'}}</el-button>
            </div>
            <el-alert
              v-show="generateStatus === GENERATE_STATUS.ERROR"
              style="margin-top: 2px;"
              :closable="false"
              :title="errorMsg"
              type="error"
              center
              show-icon>
            </el-alert>
        </div>
      </div>
    </div>
    <div>
      <h1>My-CA</h1>
      <p>Root-CA-PUBLIC-KEY: <a href="">xxxxx</a></p>
      <p>User-CA-PUBLIC-KEY: <a href="">xxxxx</a></p>
      <p>User-CA-KEY: <a href="">xxxxx</a></p>
    </div>
    <div class="nginx-setting">
      <div>
        <h1 class="nginx-setting-title">证书设置</h1>
        <h3>系统信任根证书</h3>
        <h3 class="nginx-setting-title">Nginx Setting</h3>
        <div class="nginx-setting-code">
          <highlight-code>
server {
  listen          443 ssl;
  server_name     demo.404mzk.com;
  ...
  ssl_certificate /var/www/ssl/demo-404mzk-com/chained.pem;
  ssl_certificate_key /var/www/ssl/demo-404mzk-com/404mzk-com-private.key;
}

          </highlight-code>
        </div>
      </div>

    </div>
  </div>

</template>

<style lang="scss" src="../assets/index.scss"></style>
<style lang="css" src="../assets/index.css"></style>
<script>

import ElementUI from 'element-ui'
import Vue from 'vue'
import VueHighlightJS from 'vue-highlight.js';
import 'highlight.js/styles/github.css';

import { generaCa } from '../api/index'

Vue.use(ElementUI)
Vue.use(VueHighlightJS)

const GENERATE_STATUS = {
  INIT: 0,
  SENDING: 1,
  SUCCESS: 2,
  ERROR: 99
}

export default {
  head: {
    title: 'Generate-CA'
  },
  data () {
    return {
      dns0: '',
      generateStatus: GENERATE_STATUS.INIT,
      errorMsg: '',
      GENERATE_STATUS
    }
  },
  methods: {
    async sendGenerateCA () {
      if ( this.generateStatus === GENERATE_STATUS.SENDING ) return

      this.generateStatus = GENERATE_STATUS.SENDING
      const { code, msg, data } = await generaCa(this.dns0)
      if (code === 0){
        this.generateStatus = GENERATE_STATUS.SUCCESS
      } else {
        this.generateStatus = GENERATE_STATUS.ERROR
        this.errorMsg = msg
      }
    }
  }
}
</script>


<style>

html {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {

  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 40px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.nginx-setting {
  color: #fff;
  background-color: #303133;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
