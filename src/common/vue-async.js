/**
 * @file 扩展vue的data
 * @author

import vue from 'vue';

/**
 * 封装请求函数执行
 *
 * @param {Function} method 要执行的方法
 * @param {?Object} args  方法参数列表
 * @return {Function}     promise结果
 */
function doRequest(method, args) {
    return method.apply(this, args);
}

export default {
    created() {
        // 给异步接口的数据绑定默认值
        if (this.$options.async) {
            for (let key in this.$options.async) {
                let value = this.$options.async[key];
                let defval;
                switch (value.type) {
                    case String:
                        defval = '';
                        break;
                    case Object:
                        defval = {};
                        break;
                    case Array:
                        defval = [];
                        break;
                    case Boolean:
                        defval = false;
                        break;
                }
                vue.util.defineReactive(this, key, defval);
            }
            this.loadAsync();
        }
    },
    methods: {
        loadData(opts, ...args) {
            args = Array.prototype.slice.call(args, 0);
            return doRequest.call(this, opts.func, args).finally(res => {
                this.$set(this, opts.key, res);
            });
        },

        /**
         * 循环调用异步接口
         */
        loadAsync() {
            const asyncData = this.$options.async;
            for (let key in asyncData) {
                this.loadAsyncByName(key);
            }
        },

        /**
         * 根据key值取promise结果并赋值
         *
         * @param {string} name 监测数据项
         */
        loadAsyncByName(name) {
            const method = this.$options.async[name].value;
            doRequest.call(this, method).then(res => {
                this.$set(this, name, res);
            });
        }
    }
};
