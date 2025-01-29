from fastapi import FastAPI
from api_routes import api_router

app = FastAPI()
app.include_router(api_router, prefix='/products-api/v1')
