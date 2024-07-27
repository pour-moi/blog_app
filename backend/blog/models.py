from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=2000000)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blogs")

    def __str__(self) -> str:
        return f"{self.title}: {self.content}"