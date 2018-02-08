# Setup

```bash
docker run --name adaweb -p 8080:80 -v <path-to-ada-page>:/usr/share/nginx/html:ro --restart=always -d nginx

```

Browser goto
[localhost:8080](http://localhost:8080)
