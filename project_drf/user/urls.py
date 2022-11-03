
from django.utils import path

from . import views

urlpatterns = [
    path('user/signup', views.UserSignupAPIView.as_view()),
    path('user/signin', views.UserSigninAPIView.as_view()),
]