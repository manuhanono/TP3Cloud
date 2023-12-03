output "cognito_domain" {
    description = "Domain to access Cognito AUTH"
  value       = aws_cognito_user_pool_domain.userpool_domain.domain
}

