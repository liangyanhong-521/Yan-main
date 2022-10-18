//使用Vue.use(对象)的时候就必须得有一个install方法。
import ToastComponent from "./toast.vue"

//install方法第一个参数是Vue构造器，第二个参数是一个可选的选项对象，是一个对象。

let currentToast

const toast = {
    install(Vue, options = {}) {
        Vue.prototype.$YToast = function (message, title, props) {
            //创建TempToastConstructor构造器
            let TempToastConstructor = Vue.extend(ToastComponent)
            // 创建 TempToastConstructor 实例vm，并挂载到一个元素上。
            let vm = new TempToastConstructor({
                //注意，在实例化extends组件构造器时，传入属性必须是propsData、而不是props哦
                propsData: props
            })
            vm.$slots.title = [title]
            vm.$slots.default = [message]
            vm.$mount()
            document.body.appendChild(vm.$el)
            //接下来完成确认和取消按钮，然后就是点击确定和取消按钮时的逻辑关系
        }

    }
}

export default toast

