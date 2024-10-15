from import_export import resources, fields
from import_export.widgets import BooleanWidget
from .models import User
from django.core.exceptions import ValidationError

class UserResource(resources.ModelResource):
    # Use BooleanWidget to correctly interpret TRUE/FALSE values
    is_alumni = fields.Field(attribute='is_alumni', column_name='is_alumni', widget=BooleanWidget())
    is_student = fields.Field(attribute='is_student', column_name='is_student', widget=BooleanWidget())

    class Meta:
        model = User
        # Specify the fields that you want to include in the import
        fields = (
            'is_alumni', 'is_student', 'email', 'About', 
            'Work', 'Branch', 'mobile', 
            'linkedin', 'Github', 'instagram', 'skills', 
            'first_name', 'last_name'
        )
        
    def import_field(self, field, obj, data, is_m2m=False, **kwargs):
        """
        Overriding import_field to ensure only fields that exist in the model
        are considered. Fields not defined in the model will be ignored.
        If a field is missing in the Excel data, it is set to a blank value.
        """
        print("i am running")
        if field.column_name in data:
            # If the field is in the data, import its value
            super().import_field(field, obj, data, is_m2m, **kwargs)
        else:
            # If the field is missing in the data, set it to a blank value
            setattr(obj, field.attribute, '')
