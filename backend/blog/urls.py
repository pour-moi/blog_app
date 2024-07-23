from django.urls import path
from . import views

urlpatterns =[
    path("", views.index, name="index"),
    path("post", views.add, name="post"),
    path("post/<int:id>", views.read_blog, name="read")
]