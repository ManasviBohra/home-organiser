# Home Organiser

A full stack web app to manage daily household expenses and tasks.

## Features
- Add and delete daily expenses
- Track total monthly expenditure
- Add tasks and mark them as done
- Data persists permanently via MySQL database

## Tech Used
- HTML, CSS, JavaScript — Frontend
- Python, Flask — Backend API
- MySQL — Database

## Project Structure
home-organiser/
├── index.html        # frontend structure
├── style.css         # styling
├── script.js         # frontend logic and API calls
├── app.py            # Flask backend and API endpoints
├── database.sql      # database setup file
├── requirements.txt  # Python dependencies
└── README.md

## Setup and Installation

### 1. Clone the repository
git clone https://github.com/yourusername/home-organiser.git
cd home-organiser

### 2. Set up the database
Make sure MySQL is installed and running, then:
mysql -u root -p < database.sql

### 3. Install Python dependencies
pip install -r requirements.txt

### 4. Configure database credentials
Open app.py and update these lines with your MySQL credentials:
app.config["MYSQL_USER"] = "your_username"
app.config["MYSQL_PASSWORD"] = "your_password"

### 5. Run the Flask server
python app.py

### 6. Open the app
Open index.html in your browser.
Make sure Flask is running whenever you use the app.

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /expenses | Get all expenses |
| POST | /expenses | Add new expense |
| DELETE | /expenses/<id> | Delete an expense |
| GET | /tasks | Get all tasks |
| POST | /tasks | Add new task |
| PUT | /tasks/<id> | Update task status |
| DELETE | /tasks/<id> | Delete a task |
