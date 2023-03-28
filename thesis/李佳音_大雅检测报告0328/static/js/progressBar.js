$(function () {
    cInitViewLine();
});

/* 初始化横条 */
function cInitViewLine() {
    var everyPartWidth = cGetEveryPWidth();
    var everyPartPercent = parseFloat(everyPartWidth / 100); //将每段文章相似度分为100份

    $(".distribute_module p").each(function () {
        var segmentsNum = parseInt($(this).attr("value")); //value标记的是第几段
        var partPercent = parseFloat($(this).attr("long"));	//long标记的是每段重复相似度
        var realWidth = parseFloat(partPercent * everyPartPercent) + "px";	//根据相似度获取宽度
        var realPosition = parseFloat((segmentsNum - 1) * everyPartWidth) + "px";	//相对左边的位置,段落是从1开始
        $(this).css({left: realPosition, width: realWidth});
    });
}

/* 获取每段内容在横条处所占宽度 */
function cGetEveryPWidth() {
    var lineWidth = $(".distribute_module").width();
    var totalnum = $("#totalsegmentsnum").val();
    var everyPartWidth = parseFloat(lineWidth / totalnum); //每段文章所占宽度
    return everyPartWidth;
}