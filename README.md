# Smart Contract Audit System

This project implements a web platform for auditing Solidity smart contracts using Slither static analysis.

## Architecture

- **Frontend**: React
- **Backend**: Flask
- **Smart Contract Analysis**: Slither API
- **Database**: Firebase

## Setup

### Prerequisites

- Node.js
- Python 3.11.5

#### Frontend

```bash
cd web-server
npm install
npm start
```

#### Backend

cd flask-server
pip install virtualenv
pip install firebase-admin Flask Flask-CORS
pip install slither-analyzer
python main.py

```

### Usage

The frontend will be available at http://localhost:3000

Use the upload form to submit a solidity smart contract file (.sol) for auditing.

The backend will run static analysis via Slither and save results to the database.

Audit reports for each submission can be viewed on the **Report History** page for the user.

Note that due to technical limitation, the speed to retrieve the data is quite slow

### Running Slither

Slither analyse cmd in CLI

```

solc-select install 0.8.4
solc-select use 0.8.4
slither contract.sol --checklist

```

```
