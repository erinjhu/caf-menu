from sqlalchemy import Column, Integer, String, ARRAY, Numeric, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class DBItem(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    price = Column(Numeric)
    location = Column(String)
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    last_updated = Column(TIMESTAMP)