from django.db import models

# Create your models here.
class Activity(models.Model):
		# 表字段声明
    # 字段名 = models.数据类型(字段约束)
		name = models.CharField(verbose_name='活动名称', max_length=50)
		desc = models.CharField(verbose_name='活动描述', max_length=255)
		publish_company_name = models.CharField(verbose_name='发布企业', max_length=50)
		address = models.CharField(verbose_name='活动地点', max_length=50)
		start_date = models.DateField(verbose_name='开始日期', auto_now_add=True)
		start_time = models.TimeField(verbose_name='开始时间', auto_now_add=True)
		demand = models.CharField(verbose_name='活动要求', max_length=255)
		need_person_num = models.IntegerField(verbose_name='需要人数', default=0)
		apple_person_num = models.IntegerField(verbose_name='已报名人数', default=0)
		pass_person_num = models.IntegerField(verbose_name='已通过人数', default=0)
		create_time = models.DateTimeField(verbose_name = '创建时间', auto_now_add=True)

		# 表信息
		class Meta:
				verbose_name = '志愿者公益活动列表'
				verbose_name_plural = verbose_name
				ordering = ['-create_time']
				db_table = 'activity'
		
		#模型的操作方法
		def __str__(self):
				return self.name
