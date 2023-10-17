resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = var.vpc_name
  }
}

resource "aws_subnet" "public_subnets" {
  count  = var.public_subnet_count * local.zones_count
  vpc_id = aws_vpc.main.id

  cidr_block              = cidrsubnet(var.vpc_cidr, 8, count.index + 1)
  availability_zone       = var.availability_zones[count.index % local.zones_count]

  tags = {
    Name = "public-${count.index + 1}"
  }
}

resource "aws_subnet" "private_subnets" {
  count  = var.private_subnet_count * local.zones_count
  vpc_id = aws_vpc.main.id

  cidr_block              = cidrsubnet(var.vpc_cidr, 8, var.public_subnet_count * local.zones_count + count.index + 1)
  availability_zone       = var.availability_zones[(var.public_subnet_count * local.zones_count + count.index) % local.zones_count]

  tags = {
    Name = "private-${count.index + 1}"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "main_igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "public_route_table"
  }
}

/* resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "private_route_table"
  }
} */

resource "aws_route_table_association" "public_associations" {
  count          = var.public_subnet_count * local.zones_count
  subnet_id      = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.public.id
}

# resource "aws_route_table_association" "private_associations" {
#  count          = var.private_subnet_count * local.zones_count
#  subnet_id      = aws_subnet.private_subnets[count.index].id
#  route_table_id = aws_route_table.private.id 
#  }

# resource "aws_security_group" "default" {
#   name        = "allow_tls"
#   description = "Allow TLS inbound traffic"
#   vpc_id      = aws_vpc.main.id

#   ingress {
#     description = "TLS from VPC"
#     from_port   = 443
#     to_port     = 443
#     protocol    = "tcp"
#     cidr_blocks = [aws_vpc.main.cidr_block]
#   }

#   tags = {
#     Name = "allow_tls"
#   }
# }