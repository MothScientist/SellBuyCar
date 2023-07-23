import os
import hashlib

# os.urandom(max_len)
# hashlib.pbkdf2_hmac(hash_name, password, salt, iterations, dklen=None)


class PasswordHash:
    def __init__(self, _password):
        self._password = _password
        self._salt = os.urandom(16)

    def get_salt_password(self):
        return self._salt

    def get_hash_password(self):
        return hashlib.pbkdf2_hmac('sha256', self._password.encode('utf-8'), self._salt, 500, 32).hex()


# p = PasswordHash('qwerty')
# print(p.get_salt_password())
# print(p.get_hash_password())
