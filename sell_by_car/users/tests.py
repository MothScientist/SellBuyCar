# from django.test import TestCase
# from django.core.exceptions import ValidationError
# from .models import Users
#
#
# class MyModelValidationTests(TestCase):
#     def test_email_validator(self):  # # Email address validation check
#         valid_email = 'test@example.com'  # Creating a Model Instance with a Valid Address
#         my_model_valid = Users(email=valid_email)
#
#         my_model_valid.full_clean()  # We expect the model instance to pass validation without errors
#
#         invalid_email = 'invalid_email'  # Creating an Instance of a Model with an Invalid Address
#         my_model_invalid = Users(email=invalid_email)
#
#         with self.assertRaises(ValidationError):  # Expecting a ValidationError when calling full_clean()
#             my_model_invalid.full_clean()


# To run tests: python manage.py test
