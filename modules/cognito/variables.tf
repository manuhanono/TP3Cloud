variable "userpool" {
  type        = string
  description = "Name of the Cognito User Pool"
}

variable "userpool_domain" {
  type        = string
  description = "Name of the Cognito User Pool Domain"
}

variable "userpool_client" {
  type        = string
  description = "Name of the Cognito User Pool Client"
}


variable "callback_url" {
  type        = string
  description = "Callback URL (a donde quiere acceder)"
}




