# 🚀 Drupal 11 + Next.js Integration

This project demonstrates how to integrate a **Drupal 11** backend with a **Next.js** frontend using DDEV for local development.

---

## 🛠 Prerequisites

Before getting started, make sure you have the following installed:

- [DDEV](https://ddev.com/get-started/)
- [Node.js](https://nodejs.org/) and npm

---

## 📦 Setup Drupal Backend

### 1. Clone the Repository
### 2. Set Up Drupal with DDEV
Start and configure the Drupal backend:
```bash
ddev composer install
ddev composer drupal:recipe-unpack
ddev start
ddev launch
```
### 3. Import the Database
```bash
ddev import-db --src=db/db.sql.gz
```
### 4. Admin Login Credentials
Use the following credentials to log into the Drupal admin interface:
```bash
Username: admin
Password: admin
```

##
## 📦 Setup the Next.js Frontend

### 1. Navigate to the Next.js App Directory
```bash
cd nextjs-drupal-auth
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Configure Environment Variables
Create a `.env.local` file in the nextjs-drupal-auth directory with the following content:
```bash
NEXT_PUBLIC_DRUPAL_API_URL=https://drupal-nextjs.ddev.site
```
### 4. Start the Development Server
```bash
npm run dev
```

##
## 📦 Project is Now Running!
Drupal: https://drupal-nextjs.ddev.site

Next.js: http://localhost:3000

##
## 📦 Tech Stack
1. Drupal 11 – Headless CMS
2. Next.js – React framework for the frontend
3. DDEV – Local development environment

##
## 📝 License
This project is licensed under the MIT License.
