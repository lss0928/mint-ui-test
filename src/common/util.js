/**
 * @file 全局工具方法
 *
 * @author
 */

// 'use strict';

/**
 * 格式化时间
 *
 * @param {Object} date 日期对象
 * @param {string} fmt 格式
 * @return {string} value
 */
exports.formatDate = function (date, fmt) {
    var o = {
        'M+': date.getMonth() + 1,
        // 日
        'd+': date.getDate(),
        // 小时
        'h+': date.getHours(),
        // 分
        'm+': date.getMinutes(),
        // 秒
        's+': date.getSeconds(),
        // 季度
        'q+': Math.floor((date.getMonth() + 3) / 3),
        // 毫秒
        'S': date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};

/**
 * 动态加载 js 文件
 *
 * @param {string} url js文件地址
 * @param {Function} callback 回调函数
 */
exports.loadJS = function (url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.callback = false;

    script.onreadystatechange = function () {
        if (this.readyState === 'complete' && !script.callback) {
            script.callback = true;
            callback();
        }
    };
    script.onload = function () {
        if (!script.callback) {
            script.callback = true;
            callback();
        }
    };

    script.src = url;
    head.appendChild(script);
};

/**
 * 简易渲染 Mustache 语法模板
 *
 * @param {string} tpl 模板
 * @param {Object} opts 数据
 * @return {string} value
 */
exports.renderMustache = function (tpl, opts) {
    var reg = /{{\s*(.+?)\s*}}/mg;
    var result;
    while ((result = reg.exec(tpl)) !== null) {
        if (result.length === 2 && typeof opts[result[1]] !== 'undefined') {
            tpl = tpl.replace(result[0], opts[result[1]]);
        }
    }
    return tpl;
};

/**
 * 获取字符串长度，中文字符按两位计算
 *
 * @param {string} str 字符串
 * @return {number} len 长度
 */
exports.getLength = function (str) {
    var len = str.length;
    str.replace(/[\u0080-\ufff0]/g, function () {
        len++;
    });
    return len;
};

/**
 * iframe 中模拟 position:fixed
 *
 * @param {string|jquery} selector 选择器或jquery对象
 * @param {number} offsetY 偏移量
 */
// exports.simulaIframeFixed = function (selector, offsetY) {
//     typeof selector === 'string' && (selector = $(selector));
//     if (!selector.length) {
//         return;
//     }

//     $(parent.window).scroll(function () {
//         var top = Math.max($(parent.window).scrollTop() + offsetY, 0);
//         selector.css({
//             top: top
//         });
//     });
// };

/**
 * 去除字符串首尾空格
 *
 * @param {string} str 字符串
 * @return {string} 字符串
 */
exports.trim = function (str) {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
};

/**
 * 初始化suggest
 *
 * @param {string} dataObj 数据
 * @param {string} name 字符串
 * @param {string} contentType 字符串
 * @return {string} 字符串
 */
exports.initSuggest = function (dataObj, name, contentType) {
    return {
        loader: this.loaderSuggest(contentType),
        onSelect: function (val) {
            dataObj[name] = val.id;
        },
        onChange: function (value) {
            dataObj[name] = '';
        }
    };
};

/**
 * 加载suggest
 *
 * @param {number} contentType 数字
 * @return {string} 字符串
 */
// exports.loaderSuggest = function (contentType) {
//     return function (param, onSucc, onFail) {
//         var q = param.q || '';
//         if (q.length <= 0) {
//             return;
//         }
//         $.request('./record/suggest?contentType=' + contentType + '&value=' + q).then(function (json) {
//             if (!json.data) {
//                 return;
//             }
//             onSucc(json.data);
//         }, function (res) {
//             $.messager.alert('加载失败', res.statusInfo || '加载数据失败', 'error');
//         });
//     };
// };

/**
 * select 选中获取text
 *
 * @param {number} datalist 列表
 * @param {number} value 值
 * @param {string} id 值str
 * @param {string} name 字面str
 * @return {string} 字符串
 */
exports.getHtml = function (datalist, value, id, name) {
    if (value === null) {
        return '';
    }
    for (var i = 0; i < datalist.length; i++) {
        var item = datalist[i];
        if (item[id] + '' === value + '') {
            return item[name];
        }
    }
    return '';
};

/**
 * 获取行号
 *
 * @param {string} target 源
 * @return {string} 字符串
 */
// exports.getRowIndex = function (target) {
//     var tr = $(target).closest('tr.datagrid-row');
//     return parseInt(tr.attr('datagrid-row-index'), 10);
// };

/**
 * 获取行
 *
 * @param {target} target 源
 * @param {string} tabName 表格id
 * @param {string} me 表格所在this
 * @return {row} 行
 */
// exports.getCurRow = function (target, tabName, me) {
//     var index = this.getRowIndex(target);
//     if (index === -1 || isNaN(index)) {
//         return false;
//     }
//     var row = $(me.$els[tabName]).datagrid('getData').rows[index];
//     return row;
// };

/**
 * 设置title
 *
 * @param {string} val 值
 * @return {string} 字符串
 */
exports.setTitle = function (val) {
    val = val || '';
    return '<div title="' + val + '">' + val + '</div>';
};

/**
 * suggest设值和字面
 *
 * @param {ele} ele suggest元素
 * @param {string} text 字面
 * @param {string} val 值
 */
exports.setSuggest = function (ele, text, val) {
    ele.combobox('setValue', val);
    ele.combobox('setText', text);
};

/**
 * sel根据值获取字面
 *
 * @param {list} list 数组
 * @param {string} val 值
 * @return {string} text 字面
 */
// exports.getSelText = function (list, val) {
//     var text;
//     var textList = [];
//     if (!val) {
//         return '';
//     }
//     val = val + '';
//     var valList = val ? val.split(',') : [];
//     $(valList).each(function (i, item) {
//         $(list).each(function (j, jItem) {
//             if (item + '' === jItem.id + '') {
//                 textList.push(jItem.name);
//                 return false;
//             }
//         });
//     });
//     text = textList.join(',');
//     return text;
// };

/**
 * 设置时间默认格式
 *
 * @param {string} val 值
 * @return {string} text 字面
 */
exports.defFormatDate = function (val) {
    return this.formatDate(new Date(Number(val)), 'yyyy-MM-dd');
};

/**
 * 提交后禁用按钮
 *
 * @param {context} context 上下文
 * @param {string} btnList 按钮数组
 * @param {string} flag 按钮是否禁用
 */
// exports.changeBtnStatus = function (context, btnList, flag) {
//     var btnFlagStr = flag ? 'disable' : 'enable';
//     $(btnList).each(function (i, item) {
//         $(context.$els[item]).linkbutton(btnFlagStr);
//     });
// };

/**
 * 判断是否为空对象
 *
 * @param {context} param 对象
 * @return {string} key 布尔值
 */
exports.isEmptyObj = function (param) {
    var flag = true;
    for (var key in param) {
        if (param.hasOwnProperty(key)) {
            flag = false;
        }
    }
    return flag;
};

/**
 * 生成url参数
 *
 * @param {context} param 对象
 * @return {string} key 字符串
 */
exports.parseParam = function (param) {
    if (this.isEmptyObj(param)) {
        return '';
    }
    var paramStr = '';
    for (var key in param) {
        if (param.hasOwnProperty(key) && key) {
            paramStr += '&' + key + '=' + param[key];
        }
    }
    paramStr = '?' + paramStr.substr(1);
    return paramStr;
};
