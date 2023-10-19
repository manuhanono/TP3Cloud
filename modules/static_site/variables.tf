variable "domain_name" {
  type = string
}

variable "bucket_access" {
  description = "Authorized bucket accessors"
  type        = list(string)
  default = [ "*" ]
}