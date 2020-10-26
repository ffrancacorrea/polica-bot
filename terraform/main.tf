provider "aws" {}

variable "blueprint_id" {
  type        = string
  description = "os"
  default     = "centos_7_1901_01"
}
variable "az" {
  type        = string
  description = "(optional) describe your variable"
  default     = "eu-west-3a"
}
variable "bundle_id" {
  type        = string
  description = "(optional) describe your variable"
  default     = "nano_2_0"
}

locals {
  key_name          = join("-", ["key", random_pet.main.id])
  instance_name     = join("-", ["instance", random_pet.main.id])
  availability_zone = random_pet.main.keepers.az
  blueprint_id      = random_pet.main.keepers.blueprint_id
  bundle_id         = random_pet.main.keepers.bundle_id
  key_pair_name     = aws_lightsail_key_pair.main.id
  ip_name           = join("-", ["ip",random_pet.main.id])
}

resource "random_pet" "main" {
  keepers = {
    blueprint_id = var.blueprint_id
    az           = var.az
    bundle_id    = var.bundle_id
  }
}

resource "tls_private_key" "main" {
  algorithm = "RSA"
}

resource "aws_lightsail_key_pair" "main" {
  name       = local.key_name
  public_key = tls_private_key.main.public_key_openssh
}

resource "aws_lightsail_instance" "main" {
  name              = local.instance_name
  availability_zone = local.availability_zone
  blueprint_id      = local.blueprint_id
  bundle_id         = local.bundle_id
  key_pair_name     = local.key_pair_name
  tags = {
    project   = "discord-bot"
    terraform = "true"
  }
}

resource "aws_lightsail_static_ip" "main" {
  name = local.ip_name
}

resource "aws_lightsail_static_ip_attachment" "main" {
  static_ip_name = aws_lightsail_static_ip.main.id
  instance_name  = aws_lightsail_instance.main.id
}

resource "local_file" "key" {
  sensitive_content = tls_private_key.main.private_key_pem
  filename          = "${path.module}/key.pem"
  file_permission   = "0600"
}

data "template_file" "ssh_config" {
  template = file("./ssh_config.tpl")
  vars = {
    ip  = aws_lightsail_static_ip.main.ip_address
  }
}

resource "local_file" "ssh_config"{
  content = data.template_file.ssh_config.rendered
  filename = "../ansible/ssh_config"
}

output "ssh" {
  value = join("", ["ssh -i key.pem centos@",aws_lightsail_static_ip.main.ip_address])
}