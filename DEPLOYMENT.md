# JScargot Deployment Guide

This document explains the deployment architecture and how to update the production environment.

## Architecture Overview

### Local Development Environment
- **Frontend:** React app runs on `http://localhost:5173` (Vite dev server)
- **Backend:** Django API runs on `http://127.0.0.1:8000`
- **Database:** SQLite (`db.sqlite3`)
- **Configuration:** Uses `.env.development` for API URL

### Production Environment
- **Frontend:** Deployed to GitHub Pages at `https://kystocks.github.io/snail-race-game/`
- **Backend:** Deployed to PythonAnywhere at `https://kstocks.pythonanywhere.com/`
- **Database:** MySQL on PythonAnywhere
- **Configuration:** Uses `.env.production` for API URL

## Production Settings (PythonAnywhere Only)

The following files exist **only on PythonAnywhere** and are **not tracked in Git**:

### `settings_production.py`
Located at: `/home/kstocks/snail-race-backend/snailrace/settings_production.py`

Key production-specific settings:
```python
DEBUG = False
ALLOWED_HOSTS = ['kstocks.pythonanywhere.com']
SECRET_KEY = '[production secret key]'

# MySQL Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'kstocks$snailrace',
        'USER': 'kstocks',
        'PASSWORD': os.environ.get('MYSQL_PASSWORD'),
        'HOST': 'kstocks.mysql.pythonanywhere-services.com',
    }
}

# CORS for production
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    'https://kystocks.github.io',
]
```

### WSGI Configuration
Located at: `/var/www/kstocks_pythonanywhere_com_wsgi.py`

Key settings:
```python
# Set MySQL password as environment variable
os.environ['MYSQL_PASSWORD'] = 'U2isB3st!'

# Point to production settings
os.environ['DJANGO_SETTINGS_MODULE'] = 'snailrace.settings_production'
```

## Deployment Workflows

### Updating the Backend (Django)

1. **Make changes locally** in `snail-race-backend/`
2. **Test locally** with `python manage.py runserver`
3. **Commit to Git:**
   ```bash
   cd ~/Documents/umich/JScargot/snail-race-backend
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
4. **Pull on PythonAnywhere:**
   - Open Bash console on PythonAnywhere
   ```bash
   cd ~/snail-race-backend
   git pull origin main
   ```
5. **Reload web app** on PythonAnywhere Web tab

**Note:** Production-specific files (`settings_production.py`, WSGI config) remain untouched on PythonAnywhere.

### Updating the Frontend (React)

1. **Make changes locally** in `snail-race-frontend/`
2. **Test locally** with `npm run dev`
3. **Commit to Git:**
   ```bash
   cd ~/Documents/umich/JScargot/snail-race-frontend
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
4. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```
   This automatically builds with `.env.production` and deploys to `gh-pages` branch.

## Environment Variables

### Frontend (.env files)

**`.env.development`** (for local dev):
```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

**`.env.production`** (for GitHub Pages):
```
VITE_API_BASE_URL=https://kstocks.pythonanywhere.com
```

These files are tracked in Git and are safe to commit (no secrets).

## Database Management

### Local (SQLite)
```bash
# Reset local database
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

### Production (MySQL on PythonAnywhere)
```bash
# Run migrations
cd ~/snail-race-backend
source ~/.virtualenvs/snailrace/bin/activate
python manage.py migrate

# Access Django shell
python manage.py shell

# View data via Django admin
# Visit: https://kstocks.pythonanywhere.com/admin/
```

## Troubleshooting

### API not working after deployment
1. Check error logs: PythonAnywhere → Web tab → Error log
2. Verify WSGI file points to `settings_production`
3. Ensure MySQL password environment variable is set in WSGI
4. Reload web app

### Frontend can't reach API
1. Check browser console for CORS errors
2. Verify `CORS_ALLOWED_ORIGINS` includes `https://kystocks.github.io`
3. Ensure `.env.production` has correct PythonAnywhere URL
4. Rebuild and redeploy: `npm run deploy`

### Database connection errors
1. Check MySQL credentials in `settings_production.py`
2. Verify MySQL password in WSGI file
3. Check PythonAnywhere MySQL console for database status

## Important Notes

- **Never commit** `settings_production.py` to Git (contains server-specific paths)
- **Never commit** actual passwords to Git
- **Local and production databases are separate** - they don't sync automatically
- **Always test locally** before deploying to production
- **GitHub Pages deployment** automatically uses production environment variables

## Quick Reference

| Environment | Frontend URL | Backend URL | Database |
|-------------|-------------|-------------|----------|
| Local Dev | http://localhost:5173 | http://127.0.0.1:8000 | SQLite |
| Production | https://kystocks.github.io/snail-race-game/ | https://kstocks.pythonanywhere.com | MySQL |

## PythonAnywhere Account Details
- **Username:** kstocks
- **Web app URL:** kstocks.pythonanywhere.com
- **Backend directory:** /home/kstocks/snail-race-backend
- **Virtualenv:** snailrace (Python 3.10)
- **MySQL database:** kstocks$snailrace
