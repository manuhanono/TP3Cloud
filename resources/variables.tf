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
