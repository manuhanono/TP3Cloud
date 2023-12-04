output "vpc_main_data" {
  description = "Main VPC data"
  value = {
    id         = aws_vpc.main.id,
    cidr_block = aws_vpc.main.cidr_block,
  }
}

output "default_security_group_id" {
  description = "ID of the default security group"
  value       = aws_security_group.default.id
}

output "lambda_security_group_id" {
  description = "ID of the LAMBDA security group"
  value       = aws_security_group.lambda_sg.id
}


output "private_subnets_id" {
  description = "Map of subnet ids"
  value = {
    for subnet in aws_subnet.private_subnets : subnet.tags["Tier"] => subnet.id...
  }
}

output "vpc_endpoints" {
  description = "Information about the vpc_endpoints"
  value       = [for e in aws_vpc_endpoint.this : e]
}

