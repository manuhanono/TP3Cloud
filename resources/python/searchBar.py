import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.client('dynamodb')

    # Resultado de búsqueda de película
    query_string_pelis = event.get('queryStringParameters', {})
    query_pelis = query_string_pelis.get('buscador', '')
    print(query_pelis)
    tipo = "movies"

    # Nombre del índice secundario global (GSI)
    index_name = 'GeneroIndex'  

    # Queremos, a partir de la palabra que capturamos, traer todo lo que tiene la base de datos en relación a eso
    if tipo == "all" or tipo == "movies":
        # Define los parámetros de consulta para DynamoDB utilizando el GSI
        params = {
            'TableName': 'movies',
            'IndexName': index_name, 
            'KeyConditionExpression': 'Nombre = :Nombre',
            'ExpressionAttributeValues': {
                ':Nombre': {'S': query_pelis}  
            }
        }

        # Realiza la consulta a DynamoDB utilizando el GSI
        try:
            response = dynamodb.query(**params)
            print('Resultado de DynamoDB con GSI:', response)
            items = response.get('Items', [])


            return {
                'statusCode': 200,
                        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Content-Type': 'application/json'
        },
                'body': json.dumps({'html': items}),

            }

        except Exception as e:
            print('Error al realizar la consulta a DynamoDB con GSI:', e)
            return {
                'statusCode': 500,
                'body': json.dumps({'query_pelis': query_pelis,
                    'error': f'Error: {str(e)}'}),
                        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Content-Type': 'application/json'
        }
            }