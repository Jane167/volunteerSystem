from . import views
from django.conf.urls import url
from rest_framework.routers import DefaultRouter

# 路由列表
urlpatterns = [
	url(r'^activity/$', views.ActivityListAPIView.as_view()),
	url(r'^activity/(?P<pk>\d+)/$', views.ActivityDetailAPIView.as_view()),
	url(r'^activity/export_excel/$', views.ActivityExportExcelAPIView.as_view()),
	url(r'^activity/download/(\w+)*/$', views.ActivityDownloadAPIView.as_view()),
]
# router = DefaultRouter()                            # 可以处理视图的路由器
# router.register('activity', views.ActivityViewSet)  # 向路由器中注册视图集
# urlpatterns += router.urls                          # 将路由器中的所有路由信息追加到django的路由列表中
