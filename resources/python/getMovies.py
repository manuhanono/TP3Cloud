import json
import http.client
import boto3

tmdb_api_key = 'f7217514a52cbe38077b943dca1f538a'  # Reemplaza con tu propia clave de API de TMDb
dynamodb_table_name = 'movies'  # Reemplaza con el nombre real de tu tabla DynamoDB

def lambda_handler(event, context):
    try:
        # Realiza la solicitud a la API de The Movie Database (TMDb) para obtener todas las películas
        # Estamos trayendo mal la info. Hay que buscar bien en la API de que link extraer cada parte para traer toda la info bien.
        tmdb_host = 'api.themoviedb.org'
        tmdb_path = '/3/discover/movie'
        tmdb_path2 = '/3/movie/{}/watch/providers'
        params = f'?api_key={tmdb_api_key}'

        connection = http.client.HTTPSConnection(tmdb_host)
        connection.request('GET', tmdb_path + params)
        tmdb_response = connection.getresponse()
        tmdb_data = json.loads(tmdb_response.read().decode())

        connection.request('GET', tmdb_path2 + params)
        tmdb_response2 = connection.getresponse()
        tmdb_data2 = json.loads(tmdb_response2.read().decode())

        # Selecciona solo dos registros de la lista de resultados
        selected_movies = tmdb_data.get('results', [])

        # Inicializa el cliente DynamoDB
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(dynamodb_table_name)

        for movie in selected_movies:
            movie_id = movie.get('id')
            movie['provider'] = tmdb_data2.get(movie_id, None)

        # Escribe los datos extraídos en la tabla DynamoDB
        for movie in selected_movies:
            # Verificar si el ID de la película ya está en la base de datos
            movie_id = movie.get('id')
            response = table.get_item(Key={'movie_id': movie_id})
            if 'Item' not in response:
                 item = {
                'ID': movie.get('id', ''),
                'Nombre': movie.get('title', ''),
                'Sinopsis': movie.get('overview', ''),
                'Poster Path': movie.get('poster_path', ''),
                'Provider': movie.get('provider', ''),
            }
                 table.put_item(Item=item)
            else: 
                pass
        
        # Retorna una respuesta exitosa si la escritura en DynamoDB es exitosa
        return {
            'statusCode': 200,
            'body': json.dumps('Datos almacenados en DynamoDB exitosamente')
        }

    except Exception as e:
        # Retorna un mensaje de error si hay un problema de conexión o escritura en DynamoDB
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error: {str(e)}")
        }

