# Variables
variable "region" {}

variable "cluster_name" {
  type    = string
  default = "hm-verification-cluster"
}

variable "app_image" {
  type = string
}

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.25"
    }
  }
}

provider "aws" {
  region = var.region
}

provider "kubernetes" {
  host                   = module.eks.endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_ca_certificate)
  token                  = module.eks.token
}

module "eks" {
  source       = "./eks"
  cluster_name = var.cluster_name
}

module "k8s" {
  source     = "./k8s"
  app_image  = var.app_image
  depends_on = [module.eks]
}
