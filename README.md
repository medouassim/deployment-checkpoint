# MERN Deployment Checkpoint

A minimal MERN stack app (Express + MongoDB + React) deployed to Microsoft
Azure, with MongoDB Atlas as the database.

## What This App Does

A single-page app where users can submit short text messages, which are
saved to MongoDB and displayed in a list — enough to prove the full stack
(React frontend → Express API → MongoDB) is connected and working live.

---

## Deployment Steps (follow in order)

### 1. Set up MongoDB Atlas
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and sign up (free tier is fine).
2. Create a free M0 cluster.
3. Under **Database Access**, create a user with a username/password.
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) — fine for a checkpoint.
5. Click **Connect → Drivers**, copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority
   ```
6. Save this — it goes in your `.env` as `MONGO_URI`.

### 2. Prepare the app locally
```bash
# In /server
npm install
# Create a .env file (copy .env.example) and paste your real MONGO_URI

# In /client (assuming create-react-app or vite)
npm install
npm run build
```

### 3. Copy the built frontend into the server
```bash
# from the client build output (e.g. "build" or "dist" folder)
cp -r client/build/* server/public/
```
(Your `server.js` already serves `server/public` as static files.)

### 4. Create the Azure Web App
1. Sign up / log into [portal.azure.com](https://portal.azure.com).
2. **Create a resource → Web App**.
3. Fill in: App name (must be globally unique), Resource Group (create new), Runtime stack: **Node 20 LTS**, Region: closest to you.
4. Choose the **Free (F1)** pricing tier.
5. Click **Review + Create**, then **Create**.

### 5. Set environment variables in Azure
1. Go to your new Web App → **Settings → Environment variables**.
2. Add:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `PORT` = `8080` (Azure expects this)

### 6. Deploy your code
Easiest method — deploy directly from GitHub:
1. Push this project (server + public folder with built frontend) to a GitHub repo.
2. In Azure → your Web App → **Deployment Center**.
3. Choose **GitHub** as the source, authorize, select your repo/branch.
4. Azure will build and deploy automatically on every push.

### 7. Test it
Visit `https://<your-app-name>.azurewebsites.net` — you should see the app,
be able to submit a message, and see it saved (refresh to confirm it
persisted in MongoDB Atlas).

---

## Local Development

```bash
cd server
npm install
npm start
```

Server runs on `http://localhost:5000`. Point your React dev server's proxy
to it, or serve the built frontend directly via Express as described above.
