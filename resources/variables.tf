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

variable "read_capacity" {
  type = number
  description = "Read Capacity for DynamoDB"
  default = 5
}

variable "write_capacity" {
  type = number
  description = "Write Capacity for DynamoDB"
  default = 5
  
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
  default     = "manu-lamroth-futbol-itba"
}

variable "website_bucket_name" {
  type        = string
  description = "Name of the bucket for the website"
    default     = "manu-lamroth-futbol-itba"
}
