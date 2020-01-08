from flask import Flask, render_template, redirect
import os

# FLASK APP
app = Flask(__name__)

# ROUTE TO RENDER INDEX.HTML
@app.route("/")
def home():

    # RENDER INDEX.HTML AND RETURN
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug= True)