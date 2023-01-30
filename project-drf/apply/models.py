from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from activity.models import Activity

# Create your models here.
class ApplyStatus(models.Model):
    WAIT = 0    # 待审核
    PASS = 1    # 已审核
    FAIL = 2    # 未通过


# 报名表模型类
class Apply(models.Model):
    SEX = [
      (0, '未知'),
      (1, '男'),
      (2, '女')
    ]


    STATUS = [
      (ApplyStatus.WAIT, '待审核'),
      (ApplyStatus.PASS, '已审核'),
      (ApplyStatus.FAIL, '未通过')
    ]

    belonging_activity = models.ForeignKey(Activity, models.CASCADE)    # 级联删除
    name = models.CharField(verbose_name='姓名', max_length=50)
    age = models.IntegerField(verbose_name='年龄')
    sex = models.IntegerField(verbose_name='性别', choices=SEX, default=0)
    address = models.CharField(verbose_name='家庭住址', max_length=50)
    tel = models.CharField(verbose_name='联系方式', max_length=255)
    apply_status = models.IntegerField(verbose_name='报名状态', choices=STATUS, default=ApplyStatus.WAIT)
    apply_time = models.DateTimeField(verbose_name='报名时间', auto_now_add=True)

    class Meta:
        verbose_name = '报名信息表'
        verbose_name_plural = verbose_name
        ordering = ['-apply_time']
        db_table = 'apply'

    def __str__(self):
        return self.name
