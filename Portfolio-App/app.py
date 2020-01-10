from flask import Flask, render_template, request
from sqlalchemy import create_engine
from sqlConfig import user, password
import pandas as pd
import numpy as np

# FLASK APP
app = Flask(__name__)

connURL = user + ":" + password + "@localhost:5432/investmentDB"
# print("connURL: postgresql://" + connURL)
engine = create_engine(f'postgresql://{connURL}')
# print(f"Tables: {engine.table_names()}")

monthReturn = pd.read_sql_query('SELECT * FROM "12M_Return"', con=engine)
# print(monthReturn.head())

dataSummary = pd.read_sql_query('SELECT * FROM "data_summary"', con=engine)
# print(dataSummary.head())

sim = pd.DataFrame()  # <------ IS THERE A REASON TO USE DataFrame() INSTEAD OF pd.DataFrame()?
iterations = 100

for x in range(iterations):

    expected_return = .0867  # Value based on selection
    volatility = .17  # Value based on selection
    time_horizon = 30  # Input Value
    pv = 10000  # Input Value
    annual_investment = 10000  # Input Value
    stream = []

    for i in range(time_horizon):
        end = round(pv * (1 + np.random.normal(expected_return, volatility)) + annual_investment, 2)

        stream.append(end)

        pv = end

    sim[x] = stream

first_ten = list(range(10))
finalSim = sim[first_ten]

dataSummary=dataSummary.set_index("index")
dataSummary = dataSummary[['Very_Conservative','Conservative','Moderate','Aggressive','Very_Aggressive']]
dataSummary

mean_list = dataSummary.loc['mean',['Very_Conservative','Conservative','Moderate','Aggressive','Very_Aggressive']]
mean_list = mean_list.tolist()
print(mean_list)

std_list = dataSummary.loc['std',['Very_Conservative','Conservative','Moderate','Aggressive','Very_Aggressive']]
std_list = std_list.tolist()
print(std_list)

max_list =dataSummary.loc['max',['Very_Conservative','Conservative','Moderate','Aggressive','Very_Aggressive']]
max_list = max_list.tolist()
print(max_list)

# ROUTE TO RENDER INDEX.HTML
@app.route("/")
def home():

    # RENDER INDEX.HTML AND RETURN
    return render_template("index.html")

@app.route("/portfolio")
def chart():
    pv = int(request.args.get('pv'))
    iv = int(request.args.get('iv'))
    yr = int(request.args.get('yr'))
    print(f"=> pv: {pv}")
    print(f"=> iv: {iv}")
    print(f"=> yr: {yr}")

    Portfolios = ['Very_Conservative', 'Conservative', 'Moderate', 'Aggressive', 'Very_Aggressive']
    big_lst = []
    for x in range(0, 5):
        pv = pv
        time_horizon = yr
        i = mean_list[x]
        additions = iv
        lst = []
        for year in range(time_horizon):
            ending = pv * (1 + i) + additions
            # print(locale.currency(ending, grouping=True))
            pv = ending
            lst.append(pv)

        high_value = lst[-1]
        low_value = high_value * (1 - max_list[x])
        new_lst = [Portfolios[x], high_value, low_value]
        big_lst.append(new_lst)
    data = pd.DataFrame(big_lst)

    data = data.rename(columns={0: 'Portfolios', 1: 'High_Value', 2: 'Low_Value'})

    data = data.set_index('Portfolios')
    print(data)

    return data.to_json()

if __name__ == "__main__":
    app.run(debug= True)