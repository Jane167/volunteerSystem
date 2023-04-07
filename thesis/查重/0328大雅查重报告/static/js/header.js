$(function () {
    var _li = $('.tab_left li');
    _li.on('click', function () {
        $(this).addClass('active_li').siblings().removeClass('active_li')
    });
    percentBar('.active_line', '.line_icon', '.percent');
});

//添加百分比颜色
function percentBar(active_line, line_icon, font) {
    $(line_icon).each(function () {
        var al = $(this).children(active_line);
        var font_el = $(this).siblings(font);
        var percent = font_el.html().replace("%","");
        percent = parseFloat(percent);
        if (percent >= 70) {
            al.css('background', '#fe0000');
            font_el.css('color', '#fe0000');
        } else if (percent <= 30) {
            al.css('background', '#86c282');
            font_el.css('color', '#86c282');
        } else {
            al.css('background', '#ff6600');
            font_el.css('color', '#ff6600');
        }
    });
}