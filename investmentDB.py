import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func


engine= create_engine("postgresql://postgres:postgres@localhost/InvestmentDB")
connect= engine.connect()

print(engine.table_names())




