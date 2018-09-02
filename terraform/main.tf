provider "scaleway" {
  region = "par1"
}

resource "scaleway_ip" "ip" {
  server = "${scaleway_server.app.id}"
}

data "scaleway_image" "ubuntu" {
  architecture = "arm"
  name         = "Ubuntu Xenial"
}

resource "scaleway_server" "app" {
  name  = "app"
  image = "${data.scaleway_image.ubuntu.id}"
  type  = "C1"
}

resource "scaleway_volume" "app" {
  name       = "${scaleway_server.app.id}"
  size_in_gb = 50
  type       = "l_ssd"
}

resource "scaleway_volume_attachment" "app" {
  server = "${scaleway_server.app.id}"
  volume = "${scaleway_volume.app.id}"
}

resource "scaleway_security_group" "http" {
  name        = "http"
  description = "allow HTTP and HTTPS traffic"
}

resource "scaleway_security_group_rule" "http_accept" {
  security_group = "${scaleway_security_group.http.id}"

  action    = "accept"
  direction = "inbound"
  ip_range  = "0.0.0.0/0"
  protocol  = "TCP"
  port      = 80
}

resource "scaleway_security_group_rule" "https_accept" {
  security_group = "${scaleway_security_group.http.id}"

  action    = "accept"
  direction = "inbound"
  ip_range  = "0.0.0.0/0"
  protocol  = "TCP"
  port      = 443
}
