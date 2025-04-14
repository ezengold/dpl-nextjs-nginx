Generate and add these files with the command: `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./certs/selfsigned.key -out ./certs/selfsigned.crt -subj "CN=[domain_name]"`

- `selfsigned.crt`
- `selfsigned.key`
