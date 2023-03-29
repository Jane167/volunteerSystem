from django.conf.urls import url

from link import views
from rest_framework.routers import DefaultRouter

# 路由列表
urlpatterns = [
    url(r'^link/$', views.LinkListAPIView.as_view()),
    url(r'^link/(?P<pk>\d+)/$', views.LinkDetailAPIView.as_view()),
]