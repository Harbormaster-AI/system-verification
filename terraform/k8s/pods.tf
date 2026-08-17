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

          # Spring Boot datasource (ignored by non-Spring apps)
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

          # Go / generic DB settings (ignored by Spring apps)
          env {
            name  = "APP_PORT"
            value = "8080"
          }

          env {
            name  = "SERVER_PORT"
            value = "8080"
          }

          env {
            name  = "DB_USER_NAME"
            value = "root"
          }

          env {
            name  = "DB_PASSWORD"
            value = "root"
          }

          env {
            name  = "DB_NAME"
            value = "harbormaster"
          }

          env {
            name  = "DB_HOST"
            value = "127.0.0.1"
          }

          env {
            name  = "DB_PORT"
            value = "3306"
          }

          env {
            name  = "DB_TYPE"
            value = "mysql"
          }

          env {
            name  = "DB_ARGS"
            value = "charset=utf8&parseTime=True&loc=Local"
          }

          env {
            name  = "DB_DISABLE_FK_CONSTRAINTS"
            value = "true"
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
