
import $ from 'jquery';

export default {
    getMsg() {
        return $.request('/test.json').then(res => res);
    }
};
