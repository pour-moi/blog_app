from django.urls import path
from . import views

urlpatterns =[
    path("", views.index, name="index"),
    path("post", views.add, name="post"),
    path("post/<int:id>", views.read_blog, name="read"),
    path("login", views.login, name="login"),
    path("logout", views.logout, name="logout"),
    path("register", views.register, name="register"),
    path("delete/<int:id>", views.delete, name="delete")
]