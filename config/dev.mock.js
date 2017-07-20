/**
 * @file mock服务
 * @author
 */

module.exports = function proxyServer(req, res, next) {
    var path = req.path;
    if (/\/web\/[a-zA-Z\/]+\.json/g.test(path)) {
        path = '../mock' + path.replace('/web/', '/').replace('.json', '.js');
        console.log(req.path, ' => ', path);
        res.end(JSON.stringify(require(path)(req)));
        return true;
    }
    return next();
};
