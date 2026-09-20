"""
Configuración de la aplicación y conexión con Supabase
"""

import os
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client, Client

# Cargar variables desde backend/.env
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_SECRET_KEY") or os.getenv("SUPABASE_KEY", "")


def get_supabase_client() -> Client | None:
    """Crea y retorna un cliente de Supabase si las credenciales están configuradas y no está en modo TESTING."""
    if os.getenv("TESTING") == "true":
        return None

    if not SUPABASE_URL or not SUPABASE_KEY:
        return None

    try:
        return create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"Advertencia al conectar cliente Supabase: {e}")
        return None
