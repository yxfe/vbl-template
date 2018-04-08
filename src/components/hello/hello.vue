<template>
    <div class="hello">
        <img src="~assets/images/logo.png" />
        <h1 class="title">{{msg}}</h1>
        <p class="time">{{time | formatDate}}</p>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {
                 msg: 'hello world!'
            };
        },
        computed: {
            time() {
                return Date.now();
            }
        }
    };
</script>

<style lang="less">
    .hello {
        padding: 30px;
        text-align: center;
    
        .title {
            font-size: 30px;
        }
        .time {
            font-size: 12px;
        }
    
    }
</style>

