"""
Main flask-backend-server
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from db import login_db, sign_up_validate, get_history_db, add_history_contract
import json
import os

app = Flask(__name__)
CORS(app)


@app.route('/api/login', methods=['POST'])
def login():
    """
    A sort of wrapper login function that call for login_db
    """
    username = request.json.get("username")
    password = request.json.get("password")
    response_login = login_db(username, password)
    return jsonify(response_login)


@app.route('/api/signup', methods=['POST'])
def signup():
    """
    A sort of wrapper login function that call for sign_up_validate
    """
    data = request.get_json()
    # convert flask json objet into dict
    python_dict = json.loads(json.dumps(data))

    response_signup = sign_up_validate(python_dict)

    return jsonify(response_signup)


@app.route('/api/get_history')
def get_history():
    """
    Get all of the transaction history for a user, can return empty list as new account wont have any history
    """
    # Get the use id
    user_id = request.args.get('userId')
    # get history as a list of dict
    data_list = get_history_db(user_id)

    # Return the list of JSON responses
    return jsonify(data_list)


@app.route('/api/analyze_contract', methods=['POST'])
def analyze_contract():
    """
    Get all of the transaction history for a user, can return empty list as new account wont have any history
    """
    file = request.files["file"]
    user_id = request.form["userId"]
    # Save the file to a temporary location
    temp_dir = 'save'
    # Create the temporary directory if it doesn't exist
    os.makedirs(temp_dir, exist_ok=True)
    file_path = os.path.join(temp_dir, file.filename)
    file.save(file_path)

    add_history_contract(user_id, file_path)
    # this is so that when this return then this should return true
    return jsonify({"allow": True})


if __name__ == '__main__':
    app.run(debug=True)
