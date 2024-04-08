"""Use for account"""

from typing import List
from dataclasses import dataclass
import re


@dataclass
class VunerabilityCode:
    """
    The code problems of the file
    """
    code_desc: str
    location: str


@dataclass
class Vunerability:
    """
    Define the vulnerability of the file
    """
    vulnerability_type: str
    impact: str
    confidence: str
    description: str
    recommendation: str
    vulnerability_codes: List[VunerabilityCode]


@dataclass
class History:
    """
    History entry for user. 
    Although the history is linked to user, in reality, it is easier to get the user id then get that from db 
    rather than getting the entire list in one go
    """
    filename: str
    vunerabilities: List[Vunerability]


@dataclass
class User:
    """
    User class
    """
    user_id: str
    username: str
    password: str
    email: str
    phone: int
    user_type: str


class SignUpValid:
    """
    Use for validating each attribure of the signup data that was given
    """

    def __init__(self, signup_dict: dict):
        self.username: str = signup_dict["username"]
        self.password1: str = signup_dict["password1"]
        self.password2: str = signup_dict["password2"]
        self.email: str = signup_dict["email"]
        self.phone: int = signup_dict["phone"]
        self.user_type: str = signup_dict["user_type"]
        self.user_expertise: str = signup_dict.get("user_expertise")

    def validate_username(self):
        pattern = r'^[a-zA-Z0-9]+$'
        if self.username == "":
            return "Username cannot be empty"
        if not re.match(pattern, self.username):
            return "Username must only contain characters and numbers"
        return ""

    def validate_password(self):
        pattern = r'^[a-zA-Z0-9]+$'
        if len(self.password1) < 3:
            return "Password must have at least 3 characters"
        if not re.match(pattern, self.password1):
            return "Password must only contain characters and numbers"
        if self.password1 != self.password2:
            return "Re-entering password must be the same"
        return ""

    def validate_email(self):
        pattern = r'^[A-Za-z0-9_!#$%&\'*+=?{|}~^.-]+@[A-Za-z0-9.-]+$'
        if self.email == "":
            return "Email cannot be empty"
        if not re.match(pattern, self.email):
            return "Email must be in the right format"
        return ""

    def validate_phone(self):
        if len(self.phone) < 3 or len(self.phone) > 15:
            return "Phone must be between 3 and 15 digits"
        return ""

    def get_signup_dict(self):
        """
        Get the signup data to put on the database after all of the validation check
        """
        signup_dict = {
            "username": self.username,
            "password": self.password1,
            "email": self.email,
            "phone:": self.phone,
            "user_type": self.user_type
        }

        if self.user_expertise is not None:
            signup_dict["user_expertise"] = self.user_expertise

        return signup_dict
