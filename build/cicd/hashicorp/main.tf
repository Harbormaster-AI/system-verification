

# Specify the provider and access details
provider "aws" {
  region     = ""
  access_key = "${var.aws-access-key}"
  secret_key = "${var.aws-secret-key}"
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
  content  = tls_private_key.generated.public_key_openssh
  filename = local.public_key_filename
}

resource "local_file" "private_key_pem" {
  content  = tls_private_key.generated.private_key_pem
  filename = local.private_key_filename
}

resource "aws_key_pair" "generated" {
  key_name   = "pjsk-sshtest-0.846201786829724"
  public_key = tls_private_key.generated.public_key_openssh

  lifecycle {
  ignore_changes = [key_name]
  }
}

 # Default vpc
resource "aws_vpc" "default" {
  cidr_block = "10.0.0.0/16"
}

# Default security group to access
# the instances over SSH and HTTP
resource "aws_security_group" "web" {
#  name        = "bankingonapollo-security-group-from-terrorform" #optional, when omitted, terraform creates a random name
  description = "security group for bankingonapollo  created from terraform"
  vpc_id      = "${aws_vpc.default.id}"

  # SSH access from anywhere
  ingress {
    from_port   = 22
    to_port     = 22
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

  # HTTP access from the VPC
  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # mongoose access from anywhere
  ingress {
    from_port   = 4000
    to_port     = 4000
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

# Our default security group to for the database
resource "aws_security_group" "mongo" {
  description = "security group created from terraform"
  vpc_id      = "vpc-c422e2a0"

  # SSH access from anywhere
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # mongodb access from anywhere
  ingress {
    from_port   = 27017
    to_port     = 27017
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

resource "aws_instance" "mongodb" {
  # The connection block tells our provisioner how to
  # communicate with the resource (instance)
  connection {
    # The default username for our AMI
    user = "ubuntu"
    private_key = "${tls_private_key.generated.private_key_pem}"
  }

  instance_type = "t2.micro"
  
  tags = { Name = "mongodb instance" } 

  # standard harbormaster community Amazon Machine Image using MongoDB started on the default port
  ami = "{$amiId}"

  # The name of the  SSH keypair you've created and downloaded
  # from the AWS console.
  #
  # https://console.aws.amazon.com/ec2/v2/home?region=us-west-2#KeyPairs:
  #
  # key_name = ""
  key_name = "${aws_key_pair.generated.key_name}"
  
  # Our Security group to allow HTTP and SSH access
  vpc_security_group_ids = ["${aws_security_group.mongo.id}"]
  
  # To ensure ssh access works
    provisioner "remote-exec" {
    inline = [
      "sudo ls",
    ]
  }

}

resource "aws_instance" "web" {
  # The connection block tells our provisioner how to
  # communicate with the resource (instance)
  connection {
    # The default username for our AMI
    user = "ubuntu"
    private_key = "${tls_private_key.generated.private_key_pem}"
  }
  
  instance_type = ""
  
  tags = { Name = "bankingonapollo instance" } 

  # standard Harbormaster community AMI with docker pre-installed
  ami = "ami-05033408e5e831fb0"

  # The name of the  SSH keypair you've created and downloaded
  # from the AWS console.
  #
  # https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#KeyPairs:
  # key_name = ""
  key_name = "${aws_key_pair.generated.key_name}"

  # Our Security group to allow HTTP and SSH access
  vpc_security_group_ids = ["${aws_security_group.web.id}"]

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get -y update",
      "sudo apt-get -y install docker",
      "sudo docker login --username tylertravismya --password 69Cutlass",
      "sudo docker pull /banking-on-apollo:latest",
      "sudo docker run -it -e MONGOOSE_HOST_NAME=${aws_instance.web.public_ip} -e MONGO_HOST_ADDRESS=mongodb://${aws_instance.mongodb.public_ip}:27017/ -p 4000:4000 -p 8080:8080 -p 8000:8000 /banking-on-apollo:latest"
    ]
  }
}

output "ssh_command" {
  description = "Command to use to SSH into the instance."
  value = "ssh -i ${local.private_key_filename} ec2-user@${aws_instance.web.public_ip}"
}

