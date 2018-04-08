import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import app from './components/app';
import plugins from './plugins';
import routes from './routes';
import * as filters from 'utils/filters';

Vue.use(VueRouter);
Vue.use(VueResource);

var pluginOptions = {
    vblForm: {
        isMail: {
            getMessage: field => '邮件格式不正确',
            validate: value => value.indexOf('@') > 0
        }
    }
};
Object.keys(plugins).forEach((key) => {
    Vue.use(plugins[key], pluginOptions[key]);
});

Object.keys(filters).forEach(function (key) {
    Vue.filter(key, filters[key]);
});

/*
 * loading
 * 比如：
 * 多个异步
 * var request1 = this.$http.post(url, () => {});
 * var request2 = this.$http.post(url, () => {});
 * this._initLoading([request1, request2]);
 * 多个同步
 * var request1 = this.$http.post(url)
 * .then(() => {
 *      return this.$http.post(url, () => {});
 * })
 * .then(() => {
 *      // ...
 * });
 * this._initLoading([request1]);
 * 
 */
Vue.mixin({
    data() {
        return {
            _loading: null
        };  
    },
    methods: {
        _initLoading(funcs) {
            this._showLoading();
            return Promise.all(funcs)
                .then(() => {
                    this._hideLoading();
                })
                .catch(() => {
                    this._hideLoading();
                });
        },
        _showLoading() {
            this._loading = this.$loading.open();
        },
        _hideLoading() {
            this._loading.destroy();
        }
    }
});

Vue.http.options.root = '';
Vue.http.interceptors.push(function (request, next) {
    function isFormData(obj) {
        return typeof FormData !== 'undefined' && obj instanceof FormData;
    }
    function isObject(obj) {
        return obj !== null && typeof obj === 'object';
    }
    // Vue.http.options.emulateJSON = true
    if (!isFormData(request.body) && isObject(request.body)) {
        request.body = Vue.url.params(request.body);
        request.headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
    next(function (response) {
        if (response.body && response.body.hasErrors && response.body.errorMessage) {
            this.$alert.error(response.body.errorMessage);
            return {
                ...response.body,
                ok: false
            };
        }
        if (!response.ok) {
            this.$alert.error('服务器错误！');
        }
        return response;
    });
});

var router = new VueRouter({
    linkActiveClass: 'active',
    routes
});
router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    next();
});

new Vue({
    el: '#app',
    router,
    template: '<app/>',
    components: {
        app
    }
});
