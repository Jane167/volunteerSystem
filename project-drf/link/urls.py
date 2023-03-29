from django.conf.urls import url

from link import views
from rest_framework.routers import DefaultRouter

# 路由列表
urlpatterns = [
    # url(r'^link/$', views.LinkAPIView.as_view()),
    # url(r'^link/(?P<pk>\d+)/$', views.LinkAPIView.as_view()),
]
router = DefaultRouter()  # 可以处理视图的路由器
router.register('link', views.LinkAPIView)  # 向路由器中注册视图集
urlpatterns += router.urls  # 将路由器中的所有路由信息追加到django的路由列表中
