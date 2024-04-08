"""
Use to handle all of the process that is linekd to the database
"""
import firebase_admin
from firebase_admin import credentials, firestore
from account import *
import json
import os
from slither_analyze import analyze_file, filter_report
from dataclasses import asdict

# Initialize the Firebase Admin SDK
cred = credentials.Certificate(r"./external/db_key.json")
app = firebase_admin.initialize_app(cred)
# Create a Firestore client
db = firestore.client()
# Get a reference to the "users" collection
users_ref = db.collection("Users")
# Retrieve all documents from the "users" collection
users = users_ref.get()
# Get the current server timestamp
server_timestamp = firestore.SERVER_TIMESTAMP


def history_collection(user_id):
    """get history collection from the document with user id"""
    return users_ref.document(user_id).collection("History")


def vulnerabilities_collection(history_ref, history_id):
    """get vulnerability collection from the document with history id"""
    return history_ref.document(history_id).collection("Vulnerabilities")


def remove_file_path(file_path: str):
    """
    remove the path except for the file name for file
    """
    file_name = os.path.basename(file_path)
    return file_name


def add_history_contract(user_id: str, file_path):
    """
    This is use to analyze the contract and add it to the history
    """
    vulnerabilities = filter_report(analyze_file(file_path))
    history_instance = History(remove_file_path(file_path), vulnerabilities)
    history_ref = history_collection(user_id)
    history_doc = history_ref.document()

    history_data = {
        "date": server_timestamp,
        "file_name": history_instance.filename,
        "vulnerability_amount": len(vulnerabilities)
    }

    history_doc.set(history_data)

    vulnerability_ref = vulnerabilities_collection(history_ref, history_doc.id)

    for vulnerability_instance in vulnerabilities:
        vulnerability_dict = asdict(vulnerability_instance)
        vulnerability_ref.document().set(vulnerability_dict)


def get_history_db(user_id: str):
    """
    This is use to get all of the history data of the user
    """
    history_ref = history_collection(user_id)
    history_docs = history_ref.get()

    # Check if history exiss in the document, if not then its havent analyze a contract yet
    if len(history_docs) == 0:
        return []

    results = []
    for history_doc in history_docs:
        history_data = history_doc.to_dict()
        vulnerability_ref = vulnerabilities_collection(
            history_ref, history_doc.id)
        vulnerability_docs = vulnerability_ref.get()
        vulnerabilities = []

        for vulnerability_doc in vulnerability_docs:
            vulnerabilities.append(vulnerability_doc.to_dict())

        history_data["vulnerabilities"] = vulnerabilities
        results.append(history_data)

    return results


def login_db(username: str, password: str):
    """
    check the actual account on the db, return a dict of response for the main.py to use
    """
    # respond data
    response = {
        "success": False,
        "error": "",
        "userData": {}
    }

    query = users_ref.where("username", "==", username).limit(1).get()
    if len(query) == 0:
        response["error"] = "User does not exist"
        return response

    # Retrieve the user document based on the provided username
    query = users_ref.where("username", "==", username).limit(1)

    for user in query.stream():
        user_data = user.to_dict()
        user_id = user.id
        stored_password = user_data.get("password")

        # Check if the stored password matches the provided password
        if stored_password == password:
            email = user_data.get("email")
            phone = user_data.get("phone")
            user_type = user_data.get("user_type")
            user_expertise = user_data.get("user_expertise")
            user_dict = asdict(
                User(user_id, username, password, email, phone, user_type))

            if user_expertise is not None:
                user_dict["user_expertise"] = user_expertise

            response["success"] = True
            response["userData"] = user_dict
            return response

    response["error"] = "Wrong username or password"
    return response


def sign_up_db(signup_data: dict):
    """
    Function to signup a new user
    """
    user_doc = users_ref.document()
    user_doc.set(signup_data)

    return "Signup successful"


def sign_up_validate(json_signup_data: dict):
    """
    Function to validate for signup
    """
    signup_validation = SignUpValid(json_signup_data)

    user_error = signup_validation.validate_username()
    email_error = signup_validation.validate_email()
    # Check if username or email already exists
    query = users_ref.where(
        "username", "==", signup_validation.username).limit(1).get()
    if len(query) > 0:
        user_error = "Username already exists"
    query = users_ref.where(
        "email", "==", signup_validation.email).limit(1).get()
    if len(query) > 0:
        email_error = "Email already exists"

    response = {
        "success": False,
        "userError": user_error,
        "passwordError": signup_validation.validate_password(),
        "emailError": email_error,
        "phoneError": signup_validation.validate_phone()
    }

    if response["userError"] == "" and response["passwordError"] == "" and response["emailError"] == "" and response["phoneError"] == "":
        response["success"] = True
        signup_dict = signup_validation.get_signup_dict()
        sign_up_db(signup_dict)

    return response
