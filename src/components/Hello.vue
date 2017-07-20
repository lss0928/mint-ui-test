<template>
    <div class="hello">
        <router-link to="/list">list</router-link>
        <h1>{{ msg }} == {{ mmsg }}</h1>
    </div>
</template>
<script>
// import $ from 'jquery';
import service from './Service';
export default {
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            mmsg: ''
        };
    },
    async: {
        mmsg: {
            type: Object,
            value: service.getMsg
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            // service.getMsg().then(res => {
            //     console.log(res);
            // }).catch(res => {
            //     console.log('catch == ', res);
            // });
        }
    }
};
</script>
