# AWS Cluster
data "aws_eks_cluster" "WealthManagementongolang-cluster" {
  name = "WealthManagementongolang-cluster"
}

output "endpoint" {
  value = "${data.aws_eks_cluster.WealthManagementongolang-cluster.endpoint}"
}

output "kubeconfig-certificate-authority-data" {
  value = "${data.aws_eks_cluster.WealthManagementongolang-cluster.certificate_authority.0.data}"
}

# Output for K8S
