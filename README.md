# Password Protected Website

A completely free, password-protected website that works on GitHub Pages.

## Features

- ✅ 100% Free hosting on GitHub Pages
- ✅ Password protection system
- ✅ Change password functionality
- ✅ Responsive design
- ✅ No database required
- ✅ Secure session management

## Default Login

- **Password:** `123456`

## Setup Instructions

1. **Create GitHub Repository:**
   - Go to GitHub.com
   - Create new repository named `password-protected-website`
   - Make it public

2. **Upload Files:**
   - Upload all 6 files to the repository
   - Keep the exact file names

3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Click on "Pages" in left sidebar
   - Select "Deploy from a branch"
   - Branch: `main`, Folder: `/ (root)`
   - Click Save

4. **Access Your Website:**
   - Wait a few minutes
   - Visit: `https://yourusername.github.io/password-protected-website`

## Customization

- Change colors in `:root` section of `style.css`
- Modify default password in `login.js`
- Add more pages and link them

## Security Notes

- Passwords are stored in browser's localStorage
- Sessions expire when browser closes
- Change default password after first login
