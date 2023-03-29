from django.db import models


# Create your models here.
class Link(models.Model):
    link_name = models.CharField(verbose_name='链接名称', max_length=50)
    link_address = models.CharField(verbose_name='链接地址', max_length=255)
    create_time = models.DateTimeField(verbose_name='创建时间', auto_now_add=True)
    update_time = models.DateTimeField(verbose_name='更新时间', auto_now=True)

    # 表信息
    class Meta:
        verbose_name = '友情链接列表'
        verbose_name_plural = verbose_name
        ordering = ['-create_time']
        db_table = 'link'

    # 模型的操作方法
    def __str__(self):
        return self.link_name
