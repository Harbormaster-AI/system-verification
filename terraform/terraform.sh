#!/usr/bin/env bash

set -euo pipefail

TERRAFORM_VERSION="${TERRAFORM_VERSION:-1.15.8}"
TERRAFORM_ZIP="terraform_${TERRAFORM_VERSION}_linux_amd64.zip"
TERRAFORM_URL="https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/${TERRAFORM_ZIP}"

providerEnvVarsForTerraform="${providerEnvVarsForTerraform:-}"

REGION="${AWS_DEFAULT_REGION:-${AWS_REGION:-}}"
CLUSTER_NAME="${CLUSTER_NAME:-hm-verification-cluster}"
APP_IMAGE="${APP_IMAGE:-}"

tf_vars() {
    # shellcheck disable=SC2086
    echo -var "region=${REGION}" \
         -var "cluster_name=${CLUSTER_NAME}" \
         -var "app_image=${APP_IMAGE}" \
         ${providerEnvVarsForTerraform}
}

# Usage:
#   ./terraform.sh install

if [[ "${1:-}" == "install" ]]; then
    if ! command -v terraform >/dev/null 2>&1; then
        echo "Updating apt package index..."
        sudo apt-get update

        echo "Installing required packages..."
        sudo apt-get install -y curl unzip

        echo "Downloading Terraform ${TERRAFORM_VERSION}..."
        curl -fsSLO "${TERRAFORM_URL}"

        echo "Installing Terraform ${TERRAFORM_VERSION}..."
        sudo unzip -o "${TERRAFORM_ZIP}" -d /usr/local/bin/
        sudo chmod +x /usr/local/bin/terraform

        echo "Cleaning up..."
        rm -f "${TERRAFORM_ZIP}"
    fi
fi

if [[ -z "${REGION}" ]]; then
    echo "ERROR: AWS region is not set (AWS_DEFAULT_REGION / AWS_REGION)."
    exit 1
fi

if [[ -z "${APP_IMAGE}" ]]; then
    echo "ERROR: APP_IMAGE is not set (e.g. org/repo:tag pushed by delivery)."
    exit 1
fi

echo "Terraform version:"
terraform version

echo "Initializing Terraform..."
terraform init -input=false

echo "Validating Terraform configuration..."
terraform validate

# EKS first, then k8s workloads (kubernetes provider needs a live cluster)
echo "Applying EKS/VPC (region=${REGION}, cluster=${CLUSTER_NAME})..."
# shellcheck disable=SC2046
terraform apply -input=false -auto-approve -target=module.eks $(tf_vars)

echo "Applying k8s workloads..."
# shellcheck disable=SC2046
terraform apply -input=false -auto-approve $(tf_vars)

echo "Terraform provisioning completed successfully."
