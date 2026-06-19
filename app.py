from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# MySQL configuration
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"        # your MySQL username
app.config["MYSQL_PASSWORD"] = os.getenv("MYSQL_PASSWORD")  
app.config["MYSQL_DB"] = "home_organiser"

mysql = MySQL(app)

# GET all expenses
@app.route("/expenses", methods=["GET"])
def get_expenses():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM expenses")
    rows = cursor.fetchall()
    cursor.close()

    expenses = []
    for row in rows:
        expenses.append({
            "id": row[0],
            "name": row[1],
            "amount": row[2]
        })
    return jsonify(expenses)

# POST new expense
@app.route("/expenses", methods=["POST"])
def add_expense():
    data = request.get_json()
    name = data["name"]
    amount = data["amount"]

    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO expenses (name, amount) VALUES (%s, %s)", (name, amount))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"name": name, "amount": amount}), 201

# DELETE expense
@app.route("/expenses/<int:id>", methods=["DELETE"])
def delete_expense(id):
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE FROM expenses WHERE id = %s", (id,))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "Deleted successfully!"}), 200


#GET task
@app.route("/tasks", methods=["GET"])
def get_tasks():
    cursor= mysql.connection.cursor()
    cursor.execute("SELECT * FROM tasks")
    rows = cursor.fetchall()
    cursor.close()

    tasks=[]
    for row in rows:
        tasks.append({
            "id":row[0],
            "name":row[1],
            "done":row[2]
        })
    return jsonify(tasks)

#POST all Tasks
@app.route("/tasks", methods=["POST"])
def add_task():
    data=request.get_json()
    name=data["name"]

    cursor=mysql.connection.cursor()
    cursor.execute("INSERT INTO tasks (name,done) VALUES (%s, %s)",(name, False))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"name": name, "done":False}), 201

#DELETE TASK
@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    cursor=mysql.connection.cursor()
    cursor.execute("DELETE FROM tasks WHERE id=%s ", (id,))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message":"Deleted Successfully!"}), 200

# UPDATE task done status
@app.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    data = request.get_json()
    done = data["done"]

    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE tasks SET done=%s WHERE id=%s", (done, id))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "Updated successfully"}), 200


if __name__ == "__main__":
    app.run(debug=True)