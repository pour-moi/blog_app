from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from .models import Blog

# Create your views here.
@api_view(['GET'])
def index(request):
    blogs = Blog.objects.all()
    blog_data = []
    for blog in blogs:
        blog_data.append({
            'id': blog.id,
            'title': blog.title,
            'content': blog.content
        })
    return Response(blog_data)

@api_view(['GET'])
def read_blog(request, id):
    blog = Blog.objects.get(pk=id)
    blog_to_read = []
    if blog:
        blog_to_read.append({
            'title': blog.title,
            'content': blog.content
        })
    return Response(blog_to_read)

@api_view(['POST'])
def add(request):
    if request.method == 'POST':
       data = request.data

       title = data['title']
       content = data['content']

       new_blog = Blog(title=title, content=content)
       new_blog.save()
       
       return Response({'message': "Posted"})

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        user_data = request.data
        user_name = user_data["username"]
        user_password = user_data["password"]
        print(dict(request.data))
        print(user_name, user_password)

        user = authenticate(username=user_name, password=user_password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            print(access_token)
            return Response({'is_authenticated': True, 'accessToken': access_token})
        else:
            return Response({'is_authenticated': False, 'message': 'Invalid credentials'})

        return Response({'message': 'Post requested'})

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        user_data = request.data
        username = user_data['username']
        password = user_data['password']
        
        new_user = User.objects.create_user(username=username, password=password)
        new_user.save()

        return Response({'message': 'User Created'})
