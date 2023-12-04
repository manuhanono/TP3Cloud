import json
import http.client

tmdb_api_key = 'f7217514a52cbe38077b943dca1f538a'  # Reemplaza con tu propia clave de API de TMDb

def lambda_handler(event, context):
    try:
        # Realiza la solicitud a la API de The Movie Database (TMDb) para obtener todas las películas
        tmdb_host = 'api.themoviedb.org'
        tmdb_path = '/3/discover/movie'
        params = f'?api_key={tmdb_api_key}'

        connection = http.client.HTTPSConnection(tmdb_host)
        connection.request('GET', tmdb_path + params)
        tmdb_response = connection.getresponse()
        tmdb_data = json.loads(tmdb_response.read().decode())

        # Retorna los datos de la API si la conexión es exitosa
        return {
            'statusCode': 200,
            'body': json.dumps(tmdb_data, indent=2)
        }

    except Exception as e:
        # Retorna un mensaje de error si hay un problema de conexión
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error: {str(e)}")
        }
