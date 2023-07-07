from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from .forms import CustomUserCreationForm, CustomUserChangeForm


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser

    add_fieldsets = (
        *UserAdmin.add_fieldsets, (
            'Custom fields',
            {
                'fields': (
                    'birth_date',
                    'phone_number',
                )

            }


        )
    )

    fieldsets = (
        *UserAdmin.fieldsets, (
            'Custom fields',
            {
                'fields': (
                    'birth_date',
                    'phone_number',
                )

            }


        )
    )

# admin.site.register(Users, UsersAdmin) = @admin.register(Users)
