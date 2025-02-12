from django.contrib import admin
from boards.models import Board, List ,Task ,Tag


class BoardAdmin(admin.ModelAdmin):
    search_fields = ('title', 'details', 'user__username')
    list_display = ('title', 'details', 'user', 'is_star', 'created_at', 'updated_at', 'created_by', 'updated_by')
    list_editable = ('user', 'is_star')
    list_filter = ('is_star', 'user')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')
    fieldsets = (
        (None, {
            'fields': ('title', 'details', 'is_star', 'user')
        }),
        ('Timestamps', {
            'classes': ('collapse',),
            'fields': ('created_at', 'updated_at')
        }),
        ('Ownership', {
            'classes': ('collapse',),
            'fields': ('created_by', 'updated_by')
        }),
    )

    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user
        obj.updated_by = request.user
        super().save_model(request, obj, form, change)


class ListAdmin(admin.ModelAdmin):
    list_display = ('title', 'board', 'order', 'created_at', 'updated_at', 'created_by', 'updated_by')
    list_filter = ('board',)  # ฟิลเตอร์ค้นหาตามบอร์ด
    search_fields = ('title',)  # ช่องค้นหาตามชื่อ
    ordering = ('board', 'order')  # เรียงตามบอร์ดและลำดับ
    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')  # ฟิลด์ที่ไม่สามารถแก้ไขได้

    def save_model(self, request, obj, form, change):
        """
        บันทึกข้อมูล พร้อมกำหนดผู้ปรับปรุง
        """
        if not change:  # ถ้าเป็นการสร้างใหม่
            obj.created_by = request.user  # กำหนดผู้สร้าง
        obj.updated_by = request.user  # กำหนดผู้ปรับปรุง
        super().save_model(request, obj, form, change)
        
class TagAdmin(admin.ModelAdmin):
    list_display = ("name",)  # แสดงชื่อของ Tag
    search_fields = ("name",)  # ค้นหา Tag ตามชื่อ       
        
        
class TaskAdmin(admin.ModelAdmin):
    list_display = ("title", "list", "description", "color", "get_tags", "order", "created_at", "updated_at", "created_by", "updated_by")
    search_fields = ("title", "description")  # ค้นหาจากชื่อและคำอธิบาย
    list_filter = ("list", "color", "tags") 
    readonly_fields = ("created_at", "updated_at", "created_by", "updated_by")  # ฟิลด์ที่ไม่สามารถแก้ไขได้
    
    def get_tags(self, obj):
        return ", ".join([tag.name for tag in obj.tags.all()])

    def save_model(self, request, obj, form, change):
        """
        บันทึกข้อมูล พร้อมกำหนดผู้สร้างและผู้ปรับปรุง
        """
        if not change:  # ถ้าเป็นการสร้างใหม่
            obj.created_by = request.user  # กำหนดผู้สร้าง
        obj.updated_by = request.user  # กำหนดผู้ปรับปรุง
        super().save_model(request, obj, form, change)





# ลงทะเบียนโมเดลกับ Django Admin
admin.site.register(Board, BoardAdmin)
admin.site.register(List, ListAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Task, TaskAdmin)

