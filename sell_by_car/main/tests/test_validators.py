from django.core.exceptions import ValidationError
from django.test import TestCase
from ..models import validate_phone_number, validate_email, validate_dob, validate_password

# python manage.py test


class ExtraUserTestCase(TestCase):

    # Phone Number
    def test_phone_number_validation_1(self):
        self.assertFalse(self._check_test_phone_number_validation("+7-800-555-35-35"))

    def test_phone_number_validation_2(self):
        self.assertFalse(self._check_test_phone_number_validation("+88005553535"))

    def test_phone_number_validation_3(self):
        self.assertFalse(self._check_test_phone_number_validation("+7 800 555 35 35"))

    def test_phone_number_validation_4(self):
        self.assertFalse(self._check_test_phone_number_validation("8 800 555 35 35"))

    def test_phone_number_validation_5(self):
        self.assertTrue(self._check_test_phone_number_validation("+18448724681"))

    def test_phone_number_validation_6(self):
        self.assertFalse(self._check_test_phone_number_validation("+(254)0204920000"))

    def test_phone_number_validation_7(self):
        self.assertFalse(self._check_test_phone_number_validation("+(254)-020-492-00-00"))

    def test_phone_number_validation_8(self):
        self.assertFalse(self._check_test_phone_number_validation("8448724681"))

    def test_phone_number_validation_9(self):
        self.assertFalse(self._check_test_phone_number_validation("88005506576"))

    def test_phone_number_validation_10(self):
        self.assertTrue(self._check_test_phone_number_validation("+78005506576"))

    def test_phone_number_validation_11(self):
        self.assertTrue(self._check_test_phone_number_validation("+2540204920000"))

    @staticmethod
    def _check_test_phone_number_validation(value):
        try:
            validate_phone_number(value)
        except ValidationError:
            return False
        return True

    # E-mail
    def test_email_validation_1(self):
        self.assertTrue(self._check_test_email_validation("alexeyPopov1234@gmail.com"))

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
    def test_dob_validation_1(self):
        self.assertTrue(self._check_test_dob_validation("01.01.2000"))

    def test_dob_validation_2(self):
        self.assertFalse(self._check_test_dob_validation("00.00.1995"))

    def test_dob_validation_3(self):
        self.assertFalse(self._check_test_dob_validation("30.02.1990"))

    def test_dob_validation_4(self):
        self.assertTrue(self._check_test_dob_validation("23.05.1962"))

    def test_dob_validation_5(self):
        self.assertTrue(self._check_test_dob_validation("12.01.1985"))

    def test_dob_validation_6(self):
        self.assertFalse(self._check_test_dob_validation("01.01.2120"))

    def test_dob_validation_7(self):
        self.assertFalse(self._check_test_dob_validation("12.6.2001"))

    def test_dob_validation_8(self):
        self.assertTrue(self._check_test_dob_validation("01.01.2000"))

    def test_dob_validation_9(self):
        self.assertTrue(self._check_test_dob_validation("29.02.2020"))

    def test_dob_validation_10(self):
        self.assertFalse(self._check_test_dob_validation("29.02.2021"))

    def test_dob_validation_11(self):
        self.assertFalse(self._check_test_dob_validation("31.02.2003"))

    def test_dob_validation_12(self):
        self.assertFalse(self._check_test_dob_validation("23.05.0123"))

    def test_dob_validation_13(self):
        self.assertFalse(self._check_test_dob_validation("32.05.1999"))

    def test_dob_validation_14(self):
        self.assertFalse(self._check_test_dob_validation("23.05.1899"))

    def test_dob_validation_15(self):
        self.assertTrue(self._check_test_dob_validation("31.07.1985"))

    def test_dob_validation_16(self):
        self.assertFalse(self._check_test_dob_validation("6.05.2001"))

    def test_dob_validation_17(self):
        self.assertFalse(self._check_test_dob_validation("6.5.2001"))

    @staticmethod
    def _check_test_dob_validation(value):
        try:
            validate_dob(value)
        except ValidationError:
            return False
        return True

    # Password
    def test_password_validation_1(self):
        self.assertTrue(self._check_test_password_validation("Qw36erREYEtYY234"))

    def test_password_validation_2(self):
        self.assertFalse(self._check_test_password_validation("123"))

    @staticmethod
    def _check_test_password_validation(value):
        try:
            validate_password(value)
        except ValidationError:
            return False
        return True
