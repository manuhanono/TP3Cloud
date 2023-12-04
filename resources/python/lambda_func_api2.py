import json
import boto3
import requests

dynamodb = boto3.resource('dynamodb') 
table = dynamodb.Table('movies')  # Reemplaza con el nombre real de tu tabla DynamoDB (no estan creadas)
tmdb_api_key = 'f7217514a52cbe38077b943dca1f538a'  # Reemplaza con tu propia clave de API de TMDb

def lambda_handler(event, context):
    try:
        # Realiza la solicitud a la API de The Movie Database (TMDb) para obtener todas las películas
        tmdb_url = 'https://api.themoviedb.org/3/discover/movie'
        params = {'api_key': tmdb_api_key}
        tmdb_response = requests.get(tmdb_url, params=params)
        tmdb_data = tmdb_response.json()

        # Itera sobre las películas y almacena la información en DynamoDB
        for movie in tmdb_data.get('results', []):
            movie_id = str(movie['id'])

            # Obtiene información detallada de la película
            movie_details_url = f'https://api.themoviedb.org/3/movie/{movie_id}'
            movie_details_params = {'api_key': tmdb_api_key}
            movie_details_response = requests.get(movie_details_url, params=movie_details_params)
            movie_details = movie_details_response.json()

            # Obtiene información de plataformas de transmisión
            streaming_url = f'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers'
            streaming_params = {'api_key': tmdb_api_key}
            streaming_response = requests.get(streaming_url, params=streaming_params)
            streaming_data = streaming_response.json()

            platforms = streaming_data.get('results', {}).get('US', {}).get('flatrate', [])

            # Almacena la información en DynamoDB
            table.put_item(
                Item={
                    'id': movie_id,
                    'title': movie['title'],
                    'overview': movie_details.get('overview'),
                    'platforms': platforms,
                    # Agrega más campos según tus necesidades
                }
            )

        return {
            'statusCode': 200,
            'body': json.dumps('Data stored successfully')
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps('Error storing data')
        }