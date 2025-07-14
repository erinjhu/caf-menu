from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

SC_SUPABASE_URL = os.getenv("SUPABASE_URL")
SC_SUPABASE_KEY = os.getenv("SECRET_KEY")

supabase: Client = create_client(SC_SUPABASE_URL, SC_SUPABASE_KEY)