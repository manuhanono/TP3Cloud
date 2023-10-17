variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the VPC"
  default = "10.0.0.0/16"
}

variable "vpc_name" {
  type        = string
  description = "Name for the VPC"
  default = "vpc-pruebas-g05-cloud-tp3"
}

variable "availability_zones" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b"]
}

variable "public_subnet_count" {
  type = number
}

variable "private_subnet_count" {
  type = number
}

# variable "s3_arn" {
#   type = string
# }