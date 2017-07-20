<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>
<style lang="less">
body {
    margin: 0;
}

a {
    text-decoration: none;
    color: inherit;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
}

.layout-right-breadcrumb {
    height: 55px;
    line-height: 55px!important;
    background: #eee;
    padding-left: 20px;
    .el-breadcrumb__item:last-child .el-breadcrumb__item__inner {
        color: #4990e2;
    }
}

.layout-right-content {
    padding: 14px;
}

.el-pagination {
    .el-icon {
        display: none!important;
    }
    .number {
        margin-left: 5px;
    }
    .btn-prev {
        border: 1px solid #d1dbe5;
        &:before {
            content: '上一页';
        }
    }
    .btn-next {
        margin-left: 5px;
        border: 1px solid #d1dbe5;
        &:before {
            content: '下一页';
        }
    }
}
</style>
