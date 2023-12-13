import json
import http.client
import boto3
import io

tmdb_api_key = 'f7217514a52cbe38077b943dca1f538a'  # Reemplaza con tu propia clave de API de TMDb
dynamodb_table_name = 'movies'  # Reemplaza con el nombre real de tu tabla DynamoDB

def lambda_handler(event, context):
    try:
        # Realiza la solicitud a la API de The Movie Database (TMDb) para obtener todas las películas
        # Estamos trayendo mal la info. Hay que buscar bien en la API de que link extraer cada parte para traer toda la info bien.
        tmdb_host = 'api.themoviedb.org'
        tmdb_path = '/3/discover/movie'
        tmdb_path2 = '/3/movie/{}/watch/providers'
        tmdb_path3 = '/3/movie/{movie_id}/release_dates'

        params = f'?api_key={tmdb_api_key}'

        connection = http.client.HTTPSConnection(tmdb_host)
        connection.request('GET', tmdb_path + params)
        tmdb_response = connection.getresponse()
        tmdb_data = json.loads(tmdb_response.read().decode())

        connection.request('GET', tmdb_path2 + params)
        tmdb_response2 = connection.getresponse()
        tmdb_data2 = json.loads(tmdb_response2.read().decode())

        connection.request('GET', tmdb_path3 + params)
        tmdb_response3 = connection.getresponse()
        tmdb_data3 = json.loads(tmdb_response3.read().decode())

        # Selecciona solo dos registros de la lista de resultados
        selected_movies = tmdb_data.get('results', [])
        s3_bucket_name = 'tp-final-cloud-movies-g03'
        
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table(dynamodb_table_name)

          #      image_url = f'https://image.tmdb.org/t/p/original/{poster_path}'

        for movie in selected_movies:
            movie_id = movie.get('id')


        # Escribe los datos extraídos en la tabla DynamoDB
        for movie in selected_movies:
            # Verificar si el ID de la película ya está en la base de datos
            movie_id = movie.get('id')
            FechaEstreno = tmdb_data3.get(movie_id, None)
            poster_path = movie.get('poster_path')
            if len(movie.get('title')) < 20:
                provider = 'Netflix'
            else:
                provider = 'Star+'
            item = {
                'id': str(movie.get('id', '')),
                'Nombre': movie.get('title', '').title(),
                'Sinopsis': movie.get('overview', ''),
                'Fecha de estreno': FechaEstreno,
                'Poster Path': f'https://d1i2ps8v0vw7sh.cloudfront.net/img/{movie_id}.jpeg',
                'Provider': provider
                    
   #             'Poster Path': f'https://{s3_bucket_name}.s3.amazonaws.com/img/{movie_id}.jpg'
            }
            table.put_item(Item=item)     
        
        return {
            'statusCode': 200,
            'body': json.dumps('Datos almacenados en DynamoDB exitosamente')
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error: {str(e)}")
        }