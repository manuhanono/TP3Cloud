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
  for_each = local.dynamodb.tables
  source   = "terraform-aws-modules/dynamodb-table/aws"

  name      = each.value.name
  hash_key  = "pk"
  range_key = "sk"

  billing_mode   = "PROVISIONED"
  read_capacity  = local.dynamodb.read_capacity
  write_capacity = local.dynamodb.write_capacity

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

module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = "my-s3-bucket"
  acl    = "private"

  control_object_ownership = true
  object_ownership         = "ObjectWriter"

  versioning = {
    enabled = true
  }
}