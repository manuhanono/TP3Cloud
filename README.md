# TP3Cloud - Grupo 5

# Objetivo
El objetivo del trabajo es centralizar el contenido de las diferentes plataformas de Streaming con el fin de que los usuarios puedan identificar rapidamente donde se encuentra el contenido que es de su interés.

# Módulos

Los modulos utilizados son:
- VPC (modulo custom): el modulo VPC crea una VPC con dos AZ. En cada AZ crea una subnet publica y dos subnets privadas. Se crean tambien los security groups y VPC endpoints.
- DynamoDB (modulo externo): el modulo de DynamoDB se implemento con un modulo externo ............... (incluir link del modulo)
- S3 (modulo externo): el modulo de S3 se implemento con un modulo externo .............(incluir link del modulo). El mismo se utiliza para crear el sitio web estatico. Para ello se crea un bucket para los logs, uno para la web estatica y otro para el www.
- Cloudfront (modulo custom):
- Lambda (modulo externo): el modulo de Lambda se implemento con un modulo externo .............(incluir link del modulo). La lambda creada es getCont. Esta dentro de una subnet privada y se conecta al API Gateway para actualizar el contenido (en caso de haber modificaciones en la oferta de las plataformas de streaming). Aunque la logica no esta realizada, se pueden ver las conexiones que la misma implica.  
- API Gateway (modulo custom):
- Eventbridge():

# Componentes a evaluar
Los componenetes a evaluar son:
1. VPC
2. DynamoDB
3. S3
4. Cloudfront
5. Lambda
6. API Gateway y Eventbridge (los consideramos juntos como el equivalente a un servicio a evaluar)

# Funciones utilizadas
Las funciones utilizadas son:
- F
- F
- F
- F

# Meta argumentos
Los meta argumentos utilizados son:
- M
- M
- M
- M

# Diagrama de arquitecura
Se arma un diagrama de arquitectura con los componentes deployados
(insertar diagrama)
![image](arquitectura_modificada.png) (guardar imagen en esta branch y con ese codigo se pega)



