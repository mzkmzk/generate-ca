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
              <el-input style="width: 320px" v-model="dns0" placeholder="input url: *.xxx.com"></el-input>
              <el-button
                type="primary"
                :loading="generateStatus === GENERATE_STATUS.SENDING"
                @click="sendGenerateCA"
              >{{ generateStatus === GENERATE_STATUS.SENDING ? 'Generrating' : 'Generate'}}</el-button>
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
        <div v-if="caInfo" class="ca-download">
          <h1 class="subtitle">Your-CA</h1>
          <p>Root-CA-Public-Key: <a :href="caInfo.rootCrt">{{ caInfo.rootCrt }}</a></p>
          <p>User-CA-Public-Key: <a :href="caInfo.userChain">{{ caInfo.userChain }}</a></p>
          <p>User-CA-Key: <a :href="caInfo.userKey">{{ caInfo.userKey }}</a></p>
        </div>
      </div>
    </div>

    <div class="ca-setting">
      <h1 class="ca-setting-title">CA-Setting</h1>
      <ul class="ca-setting-setp">
        <li><h3>1. 系统信任根证书</h3></li>
        <li><h3 class="nginx-setting-title">2. Nginx Setting</h3></li>
        <li>
          <div class="nginx-setting-code">
            <highlight-code lang="nginx">
  server {
    listen          443 ssl;
    server_name     demo.404mzk.com;
    ...
    ssl_certificate /var/www/ssl/demo-404mzk-com/chained.pem;
    ssl_certificate_key /var/www/ssl/demo-404mzk-com/404mzk-com-private.key;
  }
            </highlight-code>
          </div>
        </li>
      </ul>

    </div>
  </div>

</template>

<style lang="scss" src="../assets/index.scss"></style>

<script>

import ElementUI from 'element-ui'
import Vue from 'vue'
import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/atom-one-light.css'

import { generaCa } from '../api/index'
import nginx from 'highlight.js/lib/languages/nginx'

Vue.use(ElementUI)
Vue.use(VueHighlightJS, {
  languages: {
    nginx
  }
})

const GENERATE_STATUS = {
  INIT: 0,
  SENDING: 1,
  SUCCESS: 2,
  ERROR: 99
}
const CA_NAME_KEY = 'CA_NAME_KEY'

export default {
  head: {
    title: 'Generate-CA'
  },
  data () {
    return {
      dns0: '',
      generateStatus: GENERATE_STATUS.INIT,
      errorMsg: '',
      GENERATE_STATUS,
      caInfo: null
    }
  },
  mounted () {
    this.caInfo = this.safeGetLocalStorage(CA_NAME_KEY)
  },
  methods: {
    async sendGenerateCA () {
      if ( this.generateStatus === GENERATE_STATUS.SENDING ) return

      this.generateStatus = GENERATE_STATUS.SENDING
      const { code, msg, data } = await generaCa(this.dns0)
      if (code === 0){
        this.generateStatus = GENERATE_STATUS.SUCCESS
        this.safeSetLocalStorage(CA_NAME_KEY, data)
        this.caInfo = data
      } else {
        this.generateStatus = GENERATE_STATUS.ERROR
        this.errorMsg = msg
      }
    },
    safeSetLocalStorage (key, value) {
      value = encodeURIComponent(JSON.stringify(value))
      try {
        localStorage.setItem(key, value)
      } catch (e) {
        window[`localStorageItem${key}`] = value
      }
    },
    safeGetLocalStorage (key) {
      let result
      try {
        result = localStorage.getItem(key)
      } catch (e) {
        result = window[`localStorageItem${key}`]
      }
      result = JSON.parse(decodeURIComponent(result))
      return result
    }
  }
}
</script>
