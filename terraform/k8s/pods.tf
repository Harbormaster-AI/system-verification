resource "kubernetes_deployment_v1" "app_master" {
  wait_for_rollout = false

  metadata {
    name = "app-master"
    labels = {
      app = "hm-app"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "hm-app"
      }
    }

    template {
      metadata {
        labels = {
          app = "hm-app"
        }
      }

      spec {
        container {
          name  = "db-container"
          image = "mysql:8.0"

          port {
            container_port = 3306
          }

          env {
            name  = "MYSQL_ROOT_PASSWORD"
            value = "root"
          }

          env {
            name  = "MYSQL_DATABASE"
            value = "harbormaster"
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "256Mi"
            }
          }
        }

        container {
          name  = "app-container"
          image = var.app_image

          port {
            container_port = 8080
          }

          env {
            name  = "SPRING_DATASOURCE_URL"
            value = "jdbc:mysql://127.0.0.1:3306/harbormaster"
          }

          env {
            name  = "SPRING_DATASOURCE_USERNAME"
            value = "root"
          }

          env {
            name  = "SPRING_DATASOURCE_PASSWORD"
            value = "root"
          }

          env {
            name  = "SPRING_DATASOURCE_DRIVER_CLASS_NAME"
            value = "com.mysql.cj.jdbc.Driver"
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "256Mi"
            }
          }
        }
      }
    }
  }
}
