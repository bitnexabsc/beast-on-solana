# Beast on Solana - cPanel Bootstrap/PHP Site

Production-ready static + PHP website for the Beast on Solana community, built for shared hosting environments (including typical WordPress/cPanel hosting).

## Stack

- Frontend: HTML5, Bootstrap 5, custom CSS/JS
- Backend: PHP 8+
- Data: MySQL (via `db/schema.sql`) + JSON endpoints
- Hosting target: cPanel/InfinityFree-style environments

## Features

- Main landing page with token sections and roadmap (`index.html`)
- Whitepaper page (`whitepaper/index.html`)
- Burns tracker page (`burns/index.html`)
- Rewards page (`rewards/index.html`)
- Admin panel for managing site data (`admin/`)
- API endpoints for config, burns, rewards, and task submissions (`api/`)
- Apache rewrite/security rules (`.htaccess`)

## Project Structure

```text
.
|- index.html
|- whitepaper/
|- burns/
|- rewards/
|- admin/
|- api/
|- assets/
|- db/
|- .htaccess
|- 404.html
```

## Deployment (cPanel / shared hosting)

1. Upload project files to your domain document root (`public_html` or equivalent).
2. Import database schema from `db/schema.sql`.
3. Configure database/app credentials in `db/config.php` on the server.
4. Ensure PHP 8+ is enabled.
5. Verify routes/pages:
   - `/`
   - `/whitepaper/`
   - `/burns/`
   - `/rewards/`
   - `/admin/`

> Note: This repository intentionally ignores local runtime/config-sensitive files such as `db/config.php` and local `data/` storage.

## Local Notes

- This project is plain PHP + static assets, so no Node build step is required.
- For local testing, run it under Apache/PHP (XAMPP, Laragon, cPanel staging, or similar).

## License

License is not specified in this version. Add a `LICENSE` file before public redistribution.
