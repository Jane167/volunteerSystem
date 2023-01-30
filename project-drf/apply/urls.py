from . import views
from rest_framework.routers import DefaultRouter
from django.conf.urls import url

# 路由列表
urlpatterns = [
	url(r'^apply/$', views.ApplyListAPIView.as_view()),
	url(r'^apply/(?P<pk>\d+)/$', views.ApplyDetailAPIView.as_view())

]

# router = DefaultRouter()                            # 可以处理视图的路由器
# router.register('apply', views.ApplyViewSet)        # 向路由器中注册视图集
# urlpatterns += router.urls                          # 将路由器中的所有路由信息追加到django的路由列表中
