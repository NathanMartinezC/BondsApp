import uuid
from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator, MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User

class Bond(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=40, validators=[MinLengthValidator(3)])
    price = models.DecimalField(max_digits=13, decimal_places=4, validators=[MinValueValidator(0), MaxValueValidator(100000000)], default=0)
    number = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10000)])
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seller')
    buyer = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='buyer', null=True)

    class Meta:
        db_table = 'bonds'
    
    def __str__(self):
        return self.name