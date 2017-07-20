
import $ from 'jquery';

export default {
    getCustomerList(params) {
        return $.request('/web/hint/list.json', params).then(res => res);
    }
};
