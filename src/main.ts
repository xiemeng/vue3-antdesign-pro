import '@ant-design-vue/pro-layout/dist/style.css';
import 'ant-design-vue/dist/antd.variable.min.css';

import { createApp } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout';
import { createPinia } from 'pinia'


import router from './router';
import App from './App.vue';
// import './utils/chatgpt.js'
// mock 打包要关闭
import './mock'
import './permission' // permission control

createApp(App).use(createPinia()).use(router).use(ConfigProvider).use(ProLayout).use(PageContainer).mount('#app');
