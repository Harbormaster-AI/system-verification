resource "kubernetes_replication_controller" "app-master" {
    metadata {
        name = "app-master"
    }

    spec {
        replicas = 1

        selector = {
            app  = "bankingonapollo"
        }

        template {

            metadata {
                labels = {
                    app  = "bankingonapollo"
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
                        container_port = 4000
                    }
                    env {
                        name  = "MONGO_INITDB_ROOT_USERNAME"
                        value = "root"
                    }
                    env {
                        name  = "MONGO_INITDB_ROOT_PASSWORD"
                        value = "letmein2"
                    }
                    env {
                        name  = "MONGOOSE_HOST_NAME"
                        value = "kubernetes_service.app-master.load_balancer_ingress.0.ip"
                    }
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