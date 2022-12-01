"""project_drf URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url

from rest_framework.schemas import get_schema_view
from rest_framework_swagger.renderers import SwaggerUIRenderer, OpenAPICodec

schema_view = get_schema_view(title='Volunteer Management System API', renderer_classes=[OpenAPICodec, SwaggerUIRenderer])

urlpatterns = [
    path('docs/', schema_view, name='swagger'),         # 配置接口文档的url
    path('admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('', include('activity.urls')),        # 将activity子应用中的路由文件加载到总路由文件
    path('', include('apply.urls')),              # 将apply子应用的路由文件加载到总路由文件
    path('', include('users.urls')),            # 将users子应用的路由文件加载到总路由文件

]
