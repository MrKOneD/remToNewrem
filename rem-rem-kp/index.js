'use strict';
let through = require('through2');
module.exports = function(opt) {
    var oldPice = opt.oldPice || 40,
        newPice = opt.newPice || 75,
        valid_num = 6;
    let ignore_px = [0];
    var ignore_selector = [];

    function remRem(file, encoding, callback) {
        if (file.isNull()) return callback(null, file);
        if (file.isStream()) return callback(createError(file, 'Streaming not supported'));
        var s_file = file.contents.toString();
        var reg = /([^\{]*)\{([^\}]*)\}/g; //匹配css类中的内容
        var array_style = s_file.match(reg);
        var new_array = [];
        if (!array_style) return callback(null, file);
        array_style.forEach(function(value) {
            if (ignore_selector.indexOf(value.split('{')[0].replace(/(^\s*)|(\s*$)/g, '')) > -1) {

            } else {
                value = value.replace(/\s+[0]\s+|((\s*)(-?)(\d*)(\.*)(\d+)(rem+))/g, function(word) {
                    var px_num = parseFloat(word);
                    if (ignore_px.indexOf(px_num) > -1) return word;
                    var rem_num = (px_num * oldPice) / newPice;
                    return ' ' + new Number(rem_num).toFixed(valid_num) + 'rem';
                })
            }
            console.log(value);
            new_array.push(value);
        });
        file.contents = new Buffer(new_array.join(''));
        this.push(file);
        callback(null, file);
    }
    return through.obj(remRem);
}