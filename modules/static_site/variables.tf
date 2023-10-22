variable "domain_name" {
  type = string
}

variable "bucket_access" {
  description = "Authorized bucket accessors"
  type        = list(string)
}
variable "cloudfront_domain_name" {
  type        = string
  description = "Name of the CDN"
}
