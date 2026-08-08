terraform {
  required_version = ">= 1.5.0"

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 3.2"
    }
  }
}

provider "kubernetes" {

  host     = var.kubernetes_host
  username = var.kubernetes_username
  password = var.kubernetes_password

}