## Add self signed certificate to local domain

Generate and add these files with the command: `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./certs/selfsigned.key -out ./certs/selfsigned.crt -subj "CN=[domain_name]"`

- `selfsigned.crt`
- `selfsigned.key`

## Add certbot certificate

- Set the according domain name
- On the vps, navigate to `infra` folder and run the command `docker compose -f stg.docker-compose.yml run --rm certbot`. This will generate the ssl certificate keys inside the `infra/certs` folder.
- Certbot will validate the domain with the certificate keys
