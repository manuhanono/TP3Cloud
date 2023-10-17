output "vpc_main_data" {
  description = "Main VPC data"
  value = {
    id         = aws_vpc.main.id,
    cidr_block = aws_vpc.main.cidr_block,
  }
}

# output "default_security_group_id" {
#   description = "ID of the default security group"
#   value       = aws_security_group.default.id
# }
