from django.conf.urls import url

from users import views
from rest_framework.routers import DefaultRouter

# 路由列表
urlpatterns = [
	url(r'^users/', views.UserViewSet.as_view())
]
router = DefaultRouter()  # 可以处理视图的路由器
# router.register('users', views.UserViewSet)  # 向路由器中注册视图集
router.register('group', views.GroupViewSet)  # 向路由器中注册视图集

urlpatterns += router.urls  # 将路由器中的所有路由信息追加到django的路由列表中
