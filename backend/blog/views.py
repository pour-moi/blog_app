from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
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
       
       return Response({'message': "Hello"})
