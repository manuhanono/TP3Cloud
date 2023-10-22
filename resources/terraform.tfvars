vpc_name             = "main-vpc"
vpc_cidr             = "10.0.0.0/16"
website_name         = "pruebas-para-el-tp03-g05-cloud"
availability_zones   = ["us-east-1a", "us-east-1b"]
public_subnet_count  = 1
private_subnet_count = 2
role                 = "arn:aws:iam::824206024463:role/LabRole"
api_name             = "APIGW-G05"
api_description      = "APIGW para la función Lambda, TP3 del G05"
resource_path        = "myresource"
api_stage_name       = "dev3"

