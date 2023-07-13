from django.core.exceptions import ValidationError
from django.test import TestCase
from ..models import validate_phone_number, validate_email, validate_dob

# python manage.py test


class ExtraUserTestCase(TestCase):

    # Phone Number
    def test_phone_number_validation_1(self):
        self.assertFalse(self._check_test_phone_number_validation("+7-800-555-35-35"))

    def test_phone_number_validation_2(self):
        self.assertTrue(self._check_test_phone_number_validation("+88005553535"))

    def test_phone_number_validation_3(self):
        self.assertFalse(self._check_test_phone_number_validation("+7 800 555 35 35"))

    def test_phone_number_validation_4(self):
        self.assertFalse(self._check_test_phone_number_validation("8 800 555 35 35"))

    @staticmethod
    def _check_test_phone_number_validation(value):
        try:
            validate_phone_number(value)
        except ValidationError:
            return False
        return True

    # E-mail
    def test_email_validation_1(self):
        self.assertTrue(self._check_test_email_validation("fedorv1234@gmail.com"))

    def test_email_validation_2(self):
        self.assertTrue(self._check_test_email_validation("createsuperuser@mail.ru"))

    def test_email_validation_3(self):
        self.assertFalse(self._check_test_email_validation("JackMichael@maildrop.cc"))

    @staticmethod
    def _check_test_email_validation(value):
        try:
            validate_email(value)
        except ValidationError:
            return False
        return True

    # Date of Birth
    # def test_dob_validation_1(self):
    #     self.assertTrue(self._check_test_dob_validation("01.01.2000"))

    # def test_dob_validation_2(self):
    #     self.assertFalse(self._check_test_dob_validation("00.00.1995"))
    #
    # def test_dob_validation_3(self):
    #     self.assertFalse(self._check_test_dob_validation("30.02.1990"))
    #
    # def test_dob_validation_4(self):
    #     self.assertTrue(self._check_test_dob_validation("23.05.1950"))
    #
    # def test_dob_validation_5(self):
    #     self.assertFalse(self._check_test_dob_validation("12.01.1940"))
    #
    # def test_dob_validation_6(self):
    #     self.assertFalse(self._check_test_dob_validation("01.01.2120"))

    # def test_dob_validation_7(self):
    #     self.assertFalse(self._check_test_dob_validation("12.6.2001"))

    def test_dob_validation_8(self):
        self.assertFalse(self._check_test_dob_validation("01.01.2020"))

    @staticmethod
    def _check_test_dob_validation(value):
        try:
            validate_dob(value)
        except ValidationError:
            return False
        return True

