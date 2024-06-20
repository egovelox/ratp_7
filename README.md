# RATP LIGNE 7 Courneuve > Villejuif DEPARTURES

A web page exposing the next departures in each and every station of RATP Ligne 7

## Infrastructure

### Deploy web content on netlify

[Visit deployed version](https://metro-ligne7.netlify.app)

### Install server.js on EC2

- Log into EC2 instance with SSH
- Install nvm
- nvm use v16.0.0
- npm i -g pm2
- copy server.js into your EC2

Then add into `nginx.conf` :

```
server {
 server_name  example.com;

   location = /ratp/ligne7/departures/courneuve {
     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     proxy_set_header Host $host;
     proxy_pass http://127.0.0.1:3000;
     proxy_http_version 1.1;
     proxy_set_header Upgrade $http_upgrade;
     proxy_set_header Connection "upgrade";
   }
}

## use Certbot to manage SSL
```

Then run

```bash
pm2 start server.js

pm2 startup
pm2 save
```

### Uninstall

- clean nginx.conf and reload nginx

```bash
pm2 unstartup systemd
```
