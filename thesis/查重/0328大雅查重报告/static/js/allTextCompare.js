$(function () {
    var _p = $('.paragraph').find('.piece'),
        _li = $('.right_tab').find('li');
    _p.on('click', function () {
        $(this).addClass('p_active').siblings().removeClass('p_active');
    });
    _li.on('click', function () {
        $(this).addClass('active_li').siblings().removeClass('active_li');
    });
})

function showNum(rightId) {
    var all_num = $(rightId).find('.similar_paragraph').length;
    var book_num = $(rightId).find('.sp_book').length;
    var magazine_num = $(rightId).find('.sp_magazine').length;
    var newspaper_num = $(rightId).find('.sp_newspaper').length;
    var other_num = $(rightId).find('.sp_other').length;
    var selfdb_num = $(rightId).find('.sp_selfdb').length;
    $('#all').children('span').html(all_num);
    $('#book').children('span').html(book_num);
    $('#magazine').children('span').html(magazine_num);
    $('#newspaper').children('span').html(newspaper_num);
    $('#other').children('span').html(other_num);
    $('#selfdb').children('span').html(selfdb_num);
}