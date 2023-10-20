module "vpc" {
  source               = "../modules/vpc"
  vpc_name             = var.vpc_name
  vpc_cidr             = var.vpc_cidr
  availability_zones   = ["us-east-1a", "us-east-1b"]
  public_subnet_count  = 1
  private_subnet_count = 2
  vpc_endpoints        = var.vpc_endpoints
}
