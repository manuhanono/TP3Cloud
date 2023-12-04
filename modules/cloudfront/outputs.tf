output "cloudfront_domain_name" {
  description = "Domain to access cloudfront from"
  value       = aws_cloudfront_distribution.this.domain_name
}

output "cloudfront_domain_zone_name" {
  description = "Domain to access cloudfront from"
  value       = aws_cloudfront_distribution.this.hosted_zone_id
}

output "OAI" {
  description = "OAI from cloudfront"
  value       = aws_cloudfront_origin_access_identity.this.iam_arn
}
