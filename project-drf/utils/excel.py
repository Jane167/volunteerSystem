import xlwt, datetime
from xlwt import *


# 写入excel文件函数
def write_to_excel(n, head_data, records, download_url):
	# 获取时间戳
	timestr = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
	
	# 工作表
	wbk = xlwt.Workbook()
	sheet1 = wbk.add_sheet('sheet1', cell_overwrite_ok=True)
	
	# 写入表头
	for filed in range(0, len(head_data)):
		sheet1.write(0, filed, head_data[filed], excel_head_style())
	
	# 写入数据记录
	for row in range(1, n + 1):
		for col in range(0, len(head_data)):
			sheet1.write(row, col, records[row - 1][col], excel_record_style())
			# 设置默认单元格宽度
			sheet1.col(col).width = 300 * 20
	
	wbk.save(download_url + 'New-' + timestr + '.xls')
	return timestr


# 定义导出文件表头格式
def excel_head_style():
	# 创建一个样式
	style = XFStyle()
	# 设置背景色
	pattern = Pattern()
	pattern.pattern = Pattern.SOLID_PATTERN
	pattern.pattern_fore_colour = Style.colour_map['light_green']  # 设置单元格背景色
	style.pattern = pattern
	# 设置字体
	font0 = xlwt.Font()
	font0.name = u'微软雅黑'
	font0.bold = True
	font0.colour_index = 0
	font0.height = 240
	style.font = font0
	# 设置文字位置
	alignment = xlwt.Alignment()  # 设置字体在单元格的位置
	alignment.horz = xlwt.Alignment.HORZ_CENTER  # 水平方向
	alignment.vert = xlwt.Alignment.VERT_CENTER  # 竖直方向
	style.alignment = alignment
	# 设置边框
	borders = xlwt.Borders()  # Create borders
	borders.left = xlwt.Borders.THIN  # 添加边框-虚线边框
	borders.right = xlwt.Borders.THIN  # 添加边框-虚线边框
	borders.top = xlwt.Borders.THIN  # 添加边框-虚线边框
	borders.bottom = xlwt.Borders.THIN  # 添加边框-虚线边框
	style.borders = borders
	
	return style


# 定义导出文件记录格式
def excel_record_style():
	# 创建一个样式
	style = XFStyle()
	# 设置字体
	font0 = xlwt.Font()
	font0.name = u'微软雅黑'
	font0.bold = False
	font0.colour_index = 0
	font0.height = 200
	style.font = font0
	# 设置文字位置
	alignment = xlwt.Alignment()  # 设置字体在单元格的位置
	alignment.horz = xlwt.Alignment.HORZ_CENTER  # 水平方向
	alignment.vert = xlwt.Alignment.VERT_CENTER  # 竖直方向
	style.alignment = alignment
	# 设置边框
	borders = xlwt.Borders()  # Create borders
	borders.left = xlwt.Borders.THIN  # 添加边框-虚线边框
	borders.right = xlwt.Borders.THIN  # 添加边框-虚线边框
	borders.top = xlwt.Borders.THIN  # 添加边框-虚线边框
	borders.bottom = xlwt.Borders.THIN  # 添加边框-虚线边框
	style.borders = borders
	
	return style
