variable "vpc_name" {
  type        = string
  description = "Name of the main VPC of the aplication"
  default     = "main-vpc"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the main VPC of the application"
  default     = "10.0.0.0/16"
}

variable "vpc_endpoints" {
  type        = map(any)
  description = "Data to create vpc endpoints"
  default = {
    dynamodb = {
      service_name  = "com.amazonaws.us-east-1.dynamodb"
      endpoint_name = "dynamodb-vpc-endpoint"
    }
  }
}
variable "read_capacity" {
  type        = number
  description = "Read Capacity for DynamoDB"
  default     = 5
}

variable "write_capacity" {
  type        = number
  description = "Write Capacity for DynamoDB"
  default     = 5

}

variable "tables" {
  type        = map(string)
  description = "Table names for DynamoDB"
  default = {
    forum = "forum",
    users = "users"
  }
}

variable "website_name" {
  type        = string
  description = "Website domain name for the buckets"
  default     = "manu-lamroth-futbol-central"
}

variable "website_bucket_name" {
  type        = string
  description = "Name of the bucket for the website"
  default     = "manu-lamroth-futbol-itba"
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
  default = [{
    name        = "prueba-lambda-numero-1000"
    description = "Lambda de prueba"
    handler     = "index.lambda_handler"
    runtime     = "python3.8"
    source_path = "python/index.py"
  }]
}

# variable "objects" {
#   type        = list(any)
#   description = "Objects to insert into bucket"
#   default     = []
# }