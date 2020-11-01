job "bott" {
  datacenters = ["dc1"]

  group "polica" {
    volume "shots" {
      type = "host"
      read_only = true
      source = "shots"
    }
    task "nodejs" {
      env {
        POLICA_BOT_TOKEN = "<POLICA_BOT_TOKEN>"
      }
      driver = "docker"
      volume_mount {
        volume      = "shots"
        destination = "/bot/data.json"
      }
      config {
        image = "kaykelins/polica-bot:<GIT_COMMIT>"
      }
      resources {
        cpu    = 500
        memory = 256
      }
    }
  }
}
