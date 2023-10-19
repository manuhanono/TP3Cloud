module "vpc" {
  source = "../modules/vpc"
  vpc_name = var.vpc_name
  vpc_cidr = var.vpc_cidr
  availability_zones = ["us-east-1a", "us-east-1b"]
  public_subnet_count  = 1
  private_subnet_count = 2
#  s3_arn = module.s3front.arn
}

module "dynamodb" {
  for_each = var.tables
  source   = "terraform-aws-modules/dynamodb-table/aws"

  name      = each.value
  hash_key  = "pk"
  range_key = "sk"

  billing_mode   = "PROVISIONED"
  read_capacity  = var.read_capacity
  write_capacity = var.write_capacity

  attributes = [
    {
      name = "pk"
      type = "S"
    },
    {
      name = "sk"
      type = "S"
    }
  ]
}

module "website" {
  source = "../modules/static_site"
  domain_name = var.website_name
}