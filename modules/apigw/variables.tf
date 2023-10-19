variable "api_name" {
  description = "Nombre de la API Gateway"
  type        = string
}

variable "api_description" {
  description = "Descripción de la API Gateway"
  type        = string
}

variable "resource_path" {
  description = "Ruta de la API"
  type        = string
}

variable "lambda_integration_uri" {
  description = "URI de integración para la función Lambda"
  type        = string
}

variable "api_stage_name" {
  description = "Nombre del stage de la API"
  type        = string
}
