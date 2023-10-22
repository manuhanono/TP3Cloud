variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the VPC"
}

variable "vpc_name" {
  type        = string
  description = "Name for the VPC"
}

variable "availability_zones" {
  type    = list(string)
}

variable "public_subnet_count" {
  type = number
}

variable "private_subnet_count" {
  type = number
}

variable "vpc_endpoints" {
  type        = map(any)
  description = "Data to create vpc endpoints"
}