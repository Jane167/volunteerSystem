from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
USER_TYPE_CHOICE = [
    (1, '普通用户'),
    (2, '公益企业'),
    (3, '管理员')
]


class User(AbstractUser):
    nickname = models.CharField(max_length=150)
    usertype = models.IntegerField(choices=USER_TYPE_CHOICE)

    def __str__(self):
        return self.nickname

    class Meta:
        # 默认id升序排序
        ordering = ['-id']
        # 数据库表名
        db_table = 'user'
