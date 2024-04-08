"""Use for analyzing sol contract"""

import subprocess
import re
from account import Vunerability, VunerabilityCode
from dataclasses import asdict

# the file path to slither wiki, basically .md file that contains recommendation and description of a given vulnerability
# this file is clone from Slither github page: https://github.com/crytic/slither/wiki/Detector-Documentation
DETECTOR_DOCUMENT_PATH = r"./external/Detector-Documentation.md"

# extracts the Solidity version from the provided file path.


def extract_solidity_version(file_path: str):
    """
    extracts the Solidity version from the provided file path.
    """
    try:
        with open(file_path, "r") as f:
            # read the first 500 characters of the uploaded file
            file_content = f.read(500)

        # regexp match "pragma solidity x.y.z;" or "pragma solidity ^x.y.z;"
        version_pattern = re.search(
            r"pragma solidity \^?(?P<version>\d+\.\d+\.\d+);", file_content)

        # raise an exception if no version is found

        # return the version if found
        return version_pattern.group('version')
    except Exception as e:  # more generic errors handling
        raise e


def analyze_file(filename: str):
    """
    analyses a contract by running Slither commands with the specified Solidity version.
    """
    solidity_version = extract_solidity_version(filename)
    # 3 commands needed to run Slither with the specified Solidity version using subprocess
    # there is no way to check what solidity compiler is this so I just install it directly
    install_cmd = ['solc-select', 'install', solidity_version]
    use_cmd = ['solc-select', 'use', solidity_version]
    slither_cmd = ['slither', filename, '--checklist']

    # run each command, check=True to check for errors
    subprocess.run(install_cmd, check=True)
    subprocess.run(use_cmd, check=True)
    # Create a Slither project and load the file
    # Execute the Slither command in the terminal
    output = subprocess.run(slither_cmd, shell=True,
                            capture_output=True, text=True)

    # Decode the output and convert it to a string
    return output.stdout


def filter_string(string: str):
    """
    filter all of the /t and /n
    """
    return string.replace('\n', '').replace('\t', '')


def find_name(check_name: str):
    """
    Find the actual name, the ## in the .md file for a given check name (i.e., vulnerability).
    """
    try:
        file_path = DETECTOR_DOCUMENT_PATH  # the path to the detector document

        # open the wiki i.e., detector documentation file
        with open(file_path, 'r') as f:
            file_content = f.readlines()  # read the file

        # find the line that contain the check_name
        variable_line_index = None
        for i, line in enumerate(file_content):
            if check_name in line:
                variable_line_index = i
                break

        # Retrieve the line two lines above the matched variable line
        if variable_line_index is not None and variable_line_index >= 2:
            line = file_content[variable_line_index - 2].strip()
            name = line[3:]
            return name

        # return this message if no recommendation was found
        return f'Actual name not found for: {check_name}'
    except Exception as e:  # error handling
        # HTTPException with a 500 status code and the error details
        print(e)


def find_recommendation(check_name: str):
    """
    Find the recommendation for a given check name (i.e., vulnerability).
    """
    try:
        file_path = DETECTOR_DOCUMENT_PATH  # the path to the detector document

        # open the wiki i.e., detector documentation file
        with open(file_path, 'r') as f:
            file_content = f.read()  # read the file

        # regexp pattern with named group for extracting recommendation based on each check name
        # DOTALL to also match \n character
        pattern = re.compile(
            fr'##\s.*?###\sConfiguration\n\* Check: `{check_name}`.*?###\sRecommendation\n(?P<recommendation>.*?)(?=\n##\s|\Z)',
            re.DOTALL
        )

        # search for the pattern in the content
        match = re.search(pattern, file_content)

        # return the recommendation if has a match
        if match:
            # get the named group recommendation match from the regexp
            recommendation = match.group("recommendation").strip()
            return filter_string(recommendation)

        # return this message if no recommendation was found
        return f'Recommendation not found for: {check_name}'
    except Exception as e:  # error handling
        # HTTPException with a 500 status code and the error details
        print(e)


def find_description(check_name: str):
    """
    Find description for a given check (i.e., vulnerability) name.
    """
    try:
        file_path = DETECTOR_DOCUMENT_PATH  # the path to the detector document

        # open the wiki file
        with open(file_path, 'r') as f:
            file_content = f.read()  # read the file

        # regexp pattern with named group for extracting description based on each check name
        pattern = re.compile(
            fr'##\s.*?###\sConfiguration\n\* Check: `{check_name}`.*?###\sDescription\n(?P<description>.*?)(?=\n###\sExploit Scenario:|\n##|$)',
            re.DOTALL
        )

        # Search for the pattern in the content
        match = re.search(pattern, file_content)

        # return the description if a match is found
        if match:
            # get the description named group from the regexp
            description = match.group("description").strip()
            return filter_string(description)

        # return this message if no description was found
        return f'Description not found for check: {check_name}'
    except Exception as e:
        # HTTPException with a 500 status code and the error details
        print(e)


def filter_report(analyze_result: str):
    """
    filter report file and extract vulnerability information from it
    """
    try:
        # patterns to match vulnerability types, impact, confidence, and results.
        vulnerability_pattern = re.compile(
            r"##\s*(?P<vulnerability_type>[\w-]+)\nImpact:\s*(?P<impact>\w+)\nConfidence:\s*(?P<confidence>\w+)(?P<results>[\s\S]+?)(?=\n##|$)"
        )

        # one vulnwrability can have many results with different locations within the contract
        result_pattern = re.compile(
            r'- \[ \] ID-(?P<id>\d+)\n(?P<code_description>.*?)(?=\n\S+#(?P<location>L\d+(?:-L\d+)?|$))', re.DOTALL)

        # find matches for each vulnerability from the pattern in the md file content
        vulnerability_matches = re.finditer(
            vulnerability_pattern, analyze_result)

        vulnerabilities = []  # initialise the list of vulnerabilities to be returned

        # for each match in the matches list
        for vulnerability_match in vulnerability_matches:
            # convert the match to a dictionary with key value pair
            result_dict = vulnerability_match.groupdict()
            # initialize variable for vunerabilities
            vulnerability_codes = []
            vulnerability_type = result_dict["vulnerability_type"]
            name = find_name(vulnerability_type)
            impact = result_dict["impact"]
            confidence = result_dict["confidence"]
            description = find_description(vulnerability_type)
            recommendation = find_recommendation(vulnerability_type)

            # find matches for each result within the vulnerability
            results_matches = re.finditer(
                result_pattern, result_dict["results"])
            for result_match in results_matches:
                # convert the result match to a dictionary with key value pairs
                result = result_match.groupdict()
                # append the result to the list of results
                vulnerability_code = VunerabilityCode(
                    result["code_description"].strip(), result["location"].replace("L", "Line "))
                vulnerability_codes.append(vulnerability_code)

            # prepare the vulnerability format to be returned
            vulnerability_info = Vunerability(
                name, impact, confidence, description, recommendation, vulnerability_codes)

            # append the vulnerability info to the list
            vulnerabilities.append(vulnerability_info)

        # return the list of vulnerabilities
        return vulnerabilities
    except Exception as e:
        print(e)


def print_vulnerabilities(vulnerabilities):
    """
    Test function to printout all vulnerabilities
    """
    for vulnerability_instance in vulnerabilities:
        vulnerability = asdict(vulnerability_instance)
        print("-----")
        print("Vulnerability Information:")
        print("Vulnerability Type:", vulnerability["vulnerability_type"])
        print("Impact:", vulnerability["impact"])
        print("Confidence:", vulnerability["confidence"])
        print("Description: ", vulnerability["description"])
        print("Recommendation: ", vulnerability["recommendation"])
        print()
        print("Results:")
        for result in vulnerability["vulnerability_codes"]:
            print("Error Description:", result["code_desc"])
            print("Location:", result["location"])
            print()
