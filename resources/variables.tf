variable "vpc_name" {
  type        = string
  description = "Name of the main VPC of the aplication"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the main VPC of the application"
}

variable "vpc_endpoints" {
  type        = map(any)
  description = "Data to create vpc endpoints"

}
variable "read_capacity" {
  type        = number
  description = "Read Capacity for DynamoDB"
}

variable "write_capacity" {
  type        = number
  description = "Write Capacity for DynamoDB"

}

variable "tables" {
    type = list(object({
    name        = string
    hash_key = string
    range_key     = string
    attributes     = list(object({
      name = string
      type = string
    }))
    global_secondary_indexes     = list(object({
      name               = string
      hash_key           = string
      range_key          = string
      projection_type    = string
      non_key_attributes = list(string)
    }))
  }))
  description = "Table names for DynamoDB"
}

variable "website_name" {
  type        = string
  description = "Website domain name for the buckets"
}

variable "lambda_functions" {
  description = "List of Lambda functions to create"
  type = list(object({
    name        = string
    description = string
    handler     = string
    runtime     = string
    source_path = string
  }))
}

variable "availability_zones" {
  type        = list(string)
  description = "Availability Zones for the VPC"
}

variable "public_subnet_count" {
  type        = number
  description = "Number of public subnets"
}

variable "private_subnet_count" {
  type        = number
  description = "Number of public subnets"
}

variable "role" {
  type        = string
  description = "Role for the Lambda"
}

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

variable "api_stage_name" {
  description = "Nombre del stage de la API"
  type        = string
}