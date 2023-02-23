//  引入eventbus模块来给组件间事件传递， eventBus.on() 注册事件 .emit() 触发事件 off() 注销事件，重要 注册的事件，组件销毁时必须要销毁
import Vue from 'vue'
export const eventBus = new Vue()