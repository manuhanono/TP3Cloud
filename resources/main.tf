module "vpc" {
  source               = "../modules/vpc"
  vpc_name             = var.vpc_name
  vpc_cidr             = var.vpc_cidr
  availability_zones   = ["us-east-1a", "us-east-1b"]
  public_subnet_count  = 1
  private_subnet_count = 2
  vpc_endpoints = var.vpc_endpoints
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
  source      = "../modules/static_site"
  domain_name = var.website_name
}

module "lambda" {
  count  = length(var.lambda_functions)
  source = "terraform-aws-modules/lambda/aws"

  function_name = var.lambda_functions[count.index].name
  description   = var.lambda_functions[count.index].description
  handler       = var.lambda_functions[count.index].handler
  runtime       = var.lambda_functions[count.index].runtime
  source_path   = var.lambda_functions[count.index].source_path
  create_role            = false
  lambda_role            = "arn:aws:iam::824206024463:role/LabRole"
  vpc_subnet_ids         = module.vpc.private_subnets_id["1"]
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  #  attach_network_policy  = var.attach_network_policy

}