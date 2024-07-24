from django.db import models

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=2000000)

    def __str__(self) -> str:
        return f"{self.title}: {self.content}"