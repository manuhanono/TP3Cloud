// Importa el SDK de AWS
const AWS = require('aws-sdk');

// Crea un objeto DynamoDB
const dynamodb = new AWS.DynamoDB();

// Resultado de búsqueda de película
let queryStringPelis = location.search;
let OLPelis = new URLSearchParams(queryStringPelis);
let queryPelis = OLPelis.get('buscador');
let tipo = OLPelis.get('media');

// Queremos a partir de la palabra que capturamos traer todo lo que tiene la base de datos en relación a eso
if (tipo == "all" || tipo == "movies") {
  // Define los parámetros de consulta para DynamoDB
  const params = {
    TableName: 'movies',
 //   IndexName: 'IndicePorNombre', // El nombre de tu índice en DynamoDB
    KeyConditionExpression: 'nombre = :nombre',
    ExpressionAttributeValues: {
      ':nombre': { S: queryPelis } // Asume que el nombre de la película es de tipo cadena (String)
    }
  };

  // Realiza la consulta a DynamoDB
  dynamodb.query(params, function(err, data) {
    if (err) {
      console.error('Error al realizar la consulta a DynamoDB:', err);
    } else {
      console.log('Resultado de DynamoDB:', data);

      let info = data.Items; // Asume que la respuesta contiene un array de ítems

      // Resto del código para mostrar los resultados en la interfaz de usuario
      // ...

      let capturo = document.querySelector('.padre-de-peli-resultados');
      capturo.innerHTML = articulosBuscados;

      let capturo2 = document.querySelector('h1');
      capturo2.innerText = `Resultados de búsqueda: ${queryPelis}`;
    }
  });
}
