module "dynamodb" {
  for_each       = var.tables
  source         = "terraform-aws-modules/dynamodb-table/aws"
  name           = each.value
  hash_key       = "Provider"
  range_key      = "Nombre"
  # billing_mode   = "PROVISIONED"
  # read_capacity  = var.read_capacity
  # write_capacity = var.write_capacity

  attributes = [
    {
      name = "Provider"
      type = "S"
    },
    {
      name = "Nombre"
      type = "S"
    },
        {
      name = "Género"
      type = "S"
    }
  ]

    global_secondary_indexes = [
    {
      name               = "GeneroIndex"
      hash_key           = "Provider"
      range_key          = "Género"
      projection_type    = "INCLUDE"
      non_key_attributes = ["Nombre"]
    }
  ]

  tags = {
    Terraform   = "true"
    Environment = "staging"
  }

}