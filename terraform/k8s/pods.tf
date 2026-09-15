resource "kubernetes_replication_controller" "app-master" {
    metadata {
        name = "app-master"
    }

    spec {
        replicas = 1

        selector = {
            app  = "iotOnDjango"
        }

        template {

            metadata {
                labels = {
                    app  = "iotOnDjango"
                }
            }

            spec {
                container {
                    image = "${dbEngine}:latest"
                    name  = "db-container"

                    port {
                        container_port = ${dbPort}
                    }

                    resources {
                        requests = {
                            cpu    = "100m"
                            memory = "100Mi"
                        }
                    }
                }
                container {
                    image = "#DockerComposePlatformImage()"
                    name  = "app-container"

                    port {
                        container_port = 8080                    }
#DockerComposeDBEnvironment()
                    resources {
                        requests = {
                            cpu    = "100m"
                            memory = "100Mi"
                        }
                    }
                }
            }
        }

    }
}