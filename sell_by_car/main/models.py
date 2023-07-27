from django.db import models
from django.core.validators import RegexValidator, ValidationError
# from django.contrib.auth.models import AbstractUser
import re
import datetime

# python manage.py makemigrations
# python manage.py migrate

# International dialing country codes for auto call detection
country_phone_codes = {'Australia': '+61', 'Austria': '+43', 'Azerbaijan': '+994', 'Albania': '+355', 'Algeria': '+213',
                       'Angola': '+244', 'Andorra': '+376', 'Antigua and Barbuda': '+1268', 'Argentina': '+54',
                       'Armenia': '+374', 'Afghanistan': '+93', 'Bahamas': '+1242', 'Bangladesh': '+880',
                       'Barbados': '+1246', 'Bahrain': '+973', 'Belarus': '+375', 'Belize': '+501', 'Belgium': '+32',
                       'Benin': '+229', 'Bulgaria': '+359', 'Bolivia': '+591', 'Bosnia and Herzegovina': '+ 387',
                       'Botswana': '+267', 'Brazil': '+55', 'Brunei': '+673', 'Burkina Faso': '+226',
                       'Burundi': '+257', ' Bhutan': '+975', 'Vanuatu': '+678', 'Vatican City': '+39',
                       'Great Britain': '+44', 'Hungary': '+36',
                       'Venezuela': '+ 58', 'East Timor': '+670', 'Vietnam': '+84', 'Gabon': '+241', 'Haiti': '+509',
                       'Guyana': '+592', ' Gambia': '+220', 'Ghana': '+233', 'Guatemala': '+502', 'Guinea': '+224',
                       'Guinea-Bissau': '+245', 'Germany': '+49', 'Honduras': '+504', 'Grenada': '+1473',
                       'Greece': '+30',
                       'Georgia': '+995', 'Denmark': '+45', 'Djibouti': '+253', 'Dominica': '+1767',
                       'Dominican Republic': '+1809', 'Egypt': '+20', 'Zambia': '+260', 'Zimbabwe': '+263',
                       'Israel': '+972', 'India': '+91', 'Indonesia': '+62', 'Jordan': '+962', 'Iraq': '+964',
                       'Iran': '+98', 'Ireland': '+353', 'Iceland': '+354', 'Spain': '+34', 'Italy': '+39',
                       'Yemen': ' +967', 'Cape Verde': '+238', 'Kazakhstan': '+77', 'Cambodia': '+855',
                       'Cameroon': '+237',
                       'Canada': '+1', 'Qatar': '+974', 'Kenya': '+254', 'Cyprus': '+357', 'Kyrgyzstan': '+996',
                       'Kiribati': '+686', 'China': '+86', 'Colombia': '+57', 'Comoros': '+269',
                       'Congo, Democratic Republic': '+243', 'Congo, Republic': '+242', 'Costa Rica ': '+506',
                       'Ivory Coast': '+225', 'Cuba': '+53', 'Kuwait': '+965', 'Laos': '+856', 'Latvia': '+371',
                       'Lesotho': '+266', 'Liberia': '+231', 'Lebanon': '+961', 'Libya': '+218', 'Lithuania': '+370',
                       'Liechtenstein': '+423', 'Luxembourg': '+352', 'Mauritius': '+230', 'Mauritania': '+222',
                       'Madagascar': '+261', 'Macedonia': '+389', 'Malawi': '+265', 'Malaysia': '+60', 'Mali': '+223',
                       'Maldives': '+960', 'Malta': '+356', 'Morocco': '+212', 'Marshall Islands': '+692',
                       'Mexico': '+52', 'Mozambique': '+259', 'Moldova': '+373', 'Monaco': '+377', 'Mongolia': '+976',
                       'Myanmar': '+95', 'Namibia': '+264', 'Nauru': '+674', 'Nepal': '+977', 'Niger': '+227',
                       'Nigeria': '+234', 'Netherlands': '+31', 'Nicaragua': '+505', 'New Zealand': '+64',
                       'Norway': '+47', 'United Arab Emirates': '+971', 'Oman': '+968', 'Pakistan': '+92',
                       'Palau': '+680', 'Panama': '+507', 'Papua New Guinea': '+675', 'Paraguay': '+595',
                       'Peru': '+51', 'Poland': '+48', 'Portugal': '+351', 'Russia': '+7', 'Rwanda': '+250',
                       'Romania': '+40', 'El Salvador': '+503', 'Samoa': '+685', 'San Marino': '+378',
                       'Sao Tome and Principe': '+239', 'Saudi Arabia': '+966', 'Swaziland': '+268',
                       'North Korea': '+850', 'Seychelles ': '+248', 'Senegal': '+221',
                       'Saint Vincent and the Grenadines': '+1784', 'Saint Kitts and Nevis': '+1869',
                       'Saint Lucia': '+ 1758',
                       'Serbia': '+381', 'Singapore': '+65', 'Syria': '+963', 'Slovakia': '+421', 'Slovenia': '+986',
                       'United States of America': '+1', 'Solomon Islands': '+677', 'Somalia': '+252', 'Sudan': '+249',
                       'Suriname': '+597', 'Sierra Leone': '+232', 'Tajikistan': '+992', 'Thailand': '+66',
                       'Tanzania': '+255', 'Togo': '+228', 'Tonga': '+676', 'Trinidad and Tobago': '+1868',
                       'Tuvalu': '+688', 'Tunisia': '+216', 'Turkmenistan': '+993', 'Turkey': '+90', ' Uganda': '+256',
                       'Uzbekistan': '+998', 'Ukraine': '+380', 'Uruguay': '+598',
                       'Federated States of Micronesia': '+691', 'Fiji': '+679', 'Philippines': '+63',
                       'Finland': '+358', 'France': '+33', 'Croatia': '+385', 'Central African Republic': '+ 236',
                       'Chad': '+235', 'Montenegro': '+381', 'Czech Republic': '+420', 'Chile': '+56',
                       'Switzerland': '+41', 'Sweden ': '+46', 'Sri Lanka': '+94', 'Ecuador': '+593',
                       'Equatorial Guinea': '+240', 'Eritrea': '+291', 'Estonia': '+372', 'Ethiopia': '+251',
                       'South Korea': '+82', 'South Africa': '+27', 'Jamaica': '+1876', 'Japan': ' +81'}


# Format phone number: +7 800 555 35 35 (without spaces) -> +78005553535 (in this form will be in the database)
# No dividers - to save memory and lightly search.
# Separators for convenience can be inserted when extracting the phone number.
def validate_phone_number(value: str):
    if not re.match(r'^\+\d{11,13}', value) or value[:-10] not in country_phone_codes.values():
        raise ValidationError("Invalid phone number")


# Format email address:
def validate_email(value: str):
    temporary_domains = ("dispostable.com", "guerrillamail.com", "mailinator.com", "10minutemail.com", "tempmail.net",
                         "yopmail.com", "temp-mail.org", "trashmail.com", "getnada.com", "burnermail.io", "maildrop.cc",
                         "fakeinbox.com", "mytrashmail.com", "10mails.net", "mailnesia.com", "sharklasers.com",
                         "mailcatch.com", "wegwerfmail.de", "spamgourmet.com", "mailinator.net", "discard.email",
                         "getairmail.com", "owlymail.com", "jetable.org", "throwawaymail.com", "tempail.com",
                         "mailsac.com", "tempmailo.com", "mailtemp.uk", "gettempmail.com", "trashmail.ws",
                         "maildrop24.com", "temp-mail.io", "throwawaymail.com", "guerrillamail.net", "example.com"
                         )

    if not re.match(rf"^[A-Za-z0-9._%+-]+@(?!({'|'.join(temporary_domains)})).*$", value):
        raise ValidationError("Invalid email address")


# Format date day of birth: dd.mm.yyyy or dd/mm/yyyy
def validate_dob(value: str):
    def is_leap_year(_value):
        if _value % 4 != 0:
            return False
        elif _value % 100 != 0:
            return True
        elif _value % 400 != 0:
            return False
        else:
            return True

    try:
        if not re.match(r"(0[1-9]|[12][0-9]|3[01])[/.](0[1-9]|1[012])[/.]((19|20)\d{2})", value):  # dd.mm.yyyy
            raise ValidationError("Invalid date of birth")

        validate_dob_day, validate_dob_month, validate_dob_year = map(int, re.split(r'[/.]', value))

        if validate_dob_month == 2:  # # Verification for the number of February
            if validate_dob_day > 29 or (validate_dob_day == 29 and not is_leap_year(validate_dob_year)):
                raise ValidationError("Invalid date of birth")

        # If younger than 16, then without the consent of the parents of this person we have no right
        # to process his personal data. And the upper bar in 120 is necessary to check the correctness of the input.
        if 16 <= int(str(datetime.datetime.today())[:4]) - validate_dob_year >= 120:
            raise ValidationError("Invalid date of birth")

    except ValueError:
        raise ValidationError("wtf with year")


def validate_username(value):
    pass


# Django automatically adds the primary key if it hasn't been added manually
# or use this: id = models.BigAutoField(primary_key=True)

class Cars(models.Model):
    brand = models.CharField(max_length=15,
                             )  # Renault

    model = models.CharField(max_length=30,
                             )  # Logan

    # a four-digit number, such as 2021 ->
    year = models.PositiveIntegerField(validators=[RegexValidator(r'^\d{4}$',
                                                                  message="four-digit number")
                                                   ],
                                       )

    # Either None or up to 7 digits not starting with 0 (for example, None or 315000, but not 015000 -> 15000)
    mileage = models.PositiveIntegerField(validators=[
        RegexValidator(r'(^(?!0)\d{1,7}$)|(^None$)',
                       message="Either None or up to 7 digits not starting with 0")
    ],
    )

    # 3 to 8 digits not starting with 0 and without char $ (for example, 40000)
    price = models.PositiveIntegerField(validators=[
        RegexValidator(r'(^(?!0)\d{3,8}$)|(^None$)',
                       message="3-8 digits, not starting with 0 and without char $")
    ],
    )

    warranty = models.DateField()  # 15.05.2025

    # For example, 1240 (without 'kg')
    weight = models.IntegerField(validators=[
        RegexValidator(r'(^(?!0)\d{3,4}$)|(^None$)', message="3-4 digits, not starting with 0")
    ],
    )

    accident = models.BooleanField(default=False)

    car_owners = models.PositiveIntegerField(validators=[
        RegexValidator(r'(^(?!0)\d{1,2}$)|(^None$)', message="1-2 digits, not starting with 0")
    ],
    )

    # 0-100 km/h in sec (for example, 3.96, 0.34, 185.65, 12.65)
    to_100 = models.DecimalField(max_digits=5,
                                 decimal_places=2,
                                 validators=[RegexValidator(r'^\d{1,3}\.\d{2}$',
                                                            message="1-3 digits before dot and 2 digits after dot")
                                             ],
                                 )

    # V - v-shaped engine, I - in-line engine, F - boxer engine
    engine = models.CharField(
        max_length=2,
        validators=[RegexValidator(r'^(V|I|F)[1-9]|1[0-6]$',
                                   message="V, I or F and number of cylinders (example: V8 or I4)")
                    ],
    )

    # horsepower, or kWh
    power = models.CharField(
        max_length=4,
        validators=[RegexValidator(r'^[1-9]\d{1,3}$', message="2-4 digits, not starting with 0")
                    ],
    )

    # Nm
    torque = models.CharField(
        max_length=4,
        validators=[RegexValidator(regex=r'^[1-9]\d{1,3}$', message="2-4 digits, not starting with 0")
                    ],
    )

    # Car image
    # car_image = models.ImageField(upload_to='sell_by_car/frontend/static/images/car.png')


class ExtraUser(models.Model):
    first_name = models.CharField(max_length=250,
                                  blank=False,
                                  null=False,
                                  unique=False,
                                  validators=[validate_username],
                                  )

    last_name = models.CharField(max_length=250,
                                 blank=False,
                                 null=False,
                                 unique=False,
                                 validators=[validate_username],
                                 )

    email = models.EmailField(max_length=50,
                              blank=False,
                              null=False,
                              unique=True,
                              validators=[validate_email],
                              )

    # salt = models.CharField(max_length=64,
    #                         blank=False,
    #                         null=False,
    #                         )
    #
    # password_hash = models.CharField(max_length=16,
    #                                  blank=False,
    #                                  null=False,
    #                                  )  # set parameters

    phone_number = models.CharField(max_length=17,
                                    blank=True,
                                    null=True,
                                    unique=True,
                                    validators=[validate_phone_number],
                                    )

    # Date of Birth
    DOB = models.CharField(max_length=10,
                           blank=False,
                           null=True,
                           unique=False,
                           validators=[validate_dob],
                           )

    country = models.CharField(max_length=50,
                               blank=True,
                               null=True,
                               unique=False,
                               )

    city = models.CharField(max_length=50,
                            blank=True,
                            null=True,
                            unique=False,
                            )
