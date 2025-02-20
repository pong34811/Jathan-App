from django.db import models
from django.contrib.auth import get_user_model
from framework.models import BaseModel  # Import BaseModel


class Board(BaseModel):  # Use BaseModel
    title = models.CharField(max_length=255)
    # ทำให้เป็น optional field
    details = models.CharField(max_length=255, blank=True, null=True)
    is_star = models.BooleanField(default=False)
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='boards'
    )

    def __str__(self):
        return self.title


class List(BaseModel):  # Use BaseModel
    board = models.ForeignKey(
        Board,
        on_delete=models.CASCADE,
        related_name="lists"
    )
    title = models.CharField(max_length=255)
    order = models.DecimalField(
        max_digits=30,
        decimal_places=15,
        blank=True,
        null=True
    )

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        """
        Set the order value if it's not set
        """
        if not self.order:
            # Check if there are existing lists under the same board
            filtered_objects = List.objects.filter(board=self.board)
            if filtered_objects.exists():
                # Set the order to the max existing order value plus a constant offset
                self.order = filtered_objects.aggregate(
                    models.Max('order')
                )['order__max'] + 2 ** 16 - 1
            else:
                # Default order value if no lists exist
                self.order = 2 ** 16 - 1
        super().save(*args, **kwargs)


class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Task(BaseModel):
    list = models.ForeignKey(
        List, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=255)
    # Can be a JSON string or plain text
    description = models.TextField(blank=True, null=True)
    order = models.DecimalField(
        max_digits=30,
        decimal_places=15,
        blank=True,
        null=True
    )
    color = models.CharField(max_length=7, default="#FFFFFF")  # เพิ่มฟิลด์สี
    tags = models.ManyToManyField(Tag, blank=True)  # แทน ArrayField

    def save(self, *args, **kwargs):
        """
        Set the order value if it's not set
        """
        if not self.order:
            filtered_objects = Task.objects.filter(list=self.list)
            if filtered_objects.exists():
                # Assign the highest order value plus an offset to maintain order
                self.order = filtered_objects.aggregate(
                    models.Max('order')
                )['order__max'] + 2 ** 16 - 1
            else:
                # Default value if no tasks exist in the list
                self.order = 2 ** 16 - 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
