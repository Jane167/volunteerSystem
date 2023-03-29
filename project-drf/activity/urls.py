from . import views
from django.conf.urls import url
from rest_framework.routers import DefaultRouter

# 路由列表
urlpatterns = [
	url(r'^activity/$', views.ActivityListAPIView.as_view()),
	url(r'^activity/(?P<pk>\d+)/$', views.ActivityDetailAPIView.as_view()),
	url(r'^activity/export_excel/$', views.ActivityExportExcelAPIView.as_view()),
]
