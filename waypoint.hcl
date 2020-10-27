project = "discord-bot"
app "bot-polica" {
  labels = {
    "service" = "discord-bot",
    "env" = "dev"
  }

  build {
    use "docker" {
      dockerfile = "dev.Dockerfile"	
    }
    registry {
      use "docker" {
        image = "kaykelins/polica-bot"
        tag = "waypoint"
        encoded_auth = filebase64("secret.json")
      }
    } 
  }

  deploy { 
    use "nomad" {
      datacenter = "dc1"
      region = "global"
      static_environment = {
        "environment": "dev",
        "LOG_LEVEL": "debug"
      }
      replicas = 1
    }
  }
}
