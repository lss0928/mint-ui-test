/**
 * @file 扩展ajax请求
 * @author
 */
import $ from 'jquery';

// 扩展Promise的finally
if ('Promise' in window) {
    /* eslint-disable no-extend-native */
    Promise.prototype.finally = cb => this.then(
        res => Promise.resolve(cb().then(() => res)),
        res => Promise.resolve(cb()).then(() => {
            throw res;
        })
    );
}

/**
 * 异步请求 fetch封装
 *
 * @param {string} path     请求路径
 * @param {Object} options 参数项
 * @return {Object}         Promise结果集
 */
async function ajaxJSON(path, options) {
    const myHeaders = new Headers({
        'Content-type': options.contentType || 'application/json'
    });
    const opts = {
        method: options.type || 'POST',
        mode: 'cros',
        // 同域请求发送cookie
        credentials: 'same-origin',
        headers: myHeaders,
        body: JSON.stringify(options.data)
    };
    if ('fetch' in window) {
        try {
            const res = await fetch(path, opts);
            const data = await res.json();
            if (res.ok && data.status === 0) {
                return data;
            }
            throw data;
        } catch (res) {
            /* eslint-disable no-console */
            return Promise.reject(res || {
                status: 404,
                statusInfo: '系统错误，请稍候重试！'
            });
        }
    }
    return new Promise(res => {
        if (res.status === 200) {
            return Promise.resolve(res);
        }
        return Promise.reject(res);
    }, res => {
        return Promise.reject(res);
    });
}

/**
 * 挂载到jquery原型上
 */
$.extend({
    request(path, options = {}) {
        return ajaxJSON(path, options);
    }
});
