









# -------------------------------------------------------
# Specify the provider and access details
# -------------------------------------------------------

provider "aws" {
  region     = "us-east-2"
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  version = "~> 2.0"

}

locals {
  public_key_filename  = "${path.root}/keys/id_rsa.pub"
  private_key_filename = "${path.root}/keys/id_rsa"
}

# Generate an RSA key to be used
resource "tls_private_key" "generated" {
  algorithm = "RSA"
}

# Generate the local SSH Key pair in the directory specified
resource "local_file" "public_key_openssh" {
  content  = "${tls_private_key.generated.public_key_openssh}"
  filename = "${local.public_key_filename}"
}
resource "local_file" "private_key_pem" {
  content  = "${tls_private_key.generated.private_key_pem}"
  filename = "${local.private_key_filename}"
}
resource "aws_key_pair" "generated" {
  key_name   = "pjsk-sshtest-${uuid()}"
  public_key = "${tls_private_key.generated.public_key_openssh}"

  lifecycle {
    ignore_changes = ["key_name"]
  }
}

# -------------------------------------------------------
# create a default VPC is none provided
# -------------------------------------------------------

 
# -------------------------------------------------------
# Default security group to access
# the instances over SSH and HTTP
# -------------------------------------------------------

resource "aws_security_group" "web" {
#  name        = "WealthManagementongolang-security-group-from-terraform" #optional, when omitted, terraform creates a random name
  description = "security group for application WealthManagementongolang created from terraform"
  vpc_id      = "${aws-vpc}"

  # SSH access from anywhere
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP access from the VPC
  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP access from the VPC
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# -------------------------------------------------------
# The default security group for the database
# -------------------------------------------------------

resource "aws_security_group" "mysql" {
  description = "security group for WealthManagementongolang ${dEngine} created from terraform"
  vpc_id      = "${aws-vpc}"

  # mysql access from anywhere
  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "default" {
  depends_on             = ["aws_security_group.rds"]
#  identifier             = "WealthManagementongolang-rds" # Terraform will create a unique id if not assigned
  allocated_storage      = 20
  engine                 = "mysql"
  instance_class         = "db.t3.medium"
  name                   = "WealthManagementongolang"
  username               = "${dbUsername}"
  password               = "${dbPassword}"
  vpc_security_group_ids = ["${aws_security_group.rds.id}"]
}
 

# -------------------------------------------------------
# ec2 instance
# -------------------------------------------------------

resource "aws_instance" "web" {
  # -------------------------------------------------------
  # The connection block tells the provisioner how to
  # communicate with the resource (instance)
  # -------------------------------------------------------

  connection {
    # The default username for our AMI
    user = "ubuntu"
    private_key = "${tls_private_key.generated.private_key_pem}"
  }

  instance_type = "t2.medium"
  
  tags = { Name = "WealthManagementongolang instance" } 

  # -------------------------------------------------------
  # standard harbormaster community AMI with docker pre-installed
  # -------------------------------------------------------

  ami = "99889988998899"

  # -------------------------------------------------------
  # The name of the  SSH keypair you've created and downloaded
  # from the AWS console.
  #
  # https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#KeyPairs:
  #
  # key_name = ""
  # -------------------------------------------------------

  # -------------------------------------------------------
  # use a generate key and share it here
  # -------------------------------------------------------
  key_name = "${aws_key_pair.generated.key_name}"

  # -------------------------------------------------------
  # Our Security group to allow HTTP and SSH access
  # -------------------------------------------------------
  vpc_security_group_ids = ["${aws_security_group.web.id}"]


  # -------------------------------------------------------
  # remote execution commands
  # -------------------------------------------------------

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get -y update",
      "sudo docker login --username tylertravismya --password 69Cutlass",
      "sudo docker pull theharbormaster/WealthManagement-on-golang:latest",
      "sudo docker run -it -p 8000:8000 -p 8080:8080 -e DATABASE_URL=jdbc:mysql://${aws_db_instance.default.endpoint}/WealthManagementongolang theharbormaster/WealthManagement-on-golang:latest"
    ]
  }
}

output "ssh_command" {
  description = "Command to use to SSH into the instance."
  value = "ssh -i ${local.private_key_filename} ubuntu@${aws_instance.web.public_ip}"
}


