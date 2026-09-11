# 🚀 Deploying Textile Color-Matching & QC System to Render

This project is configured with a unified multi-stage **Docker** build that bundles the **React (Vite) Frontend** and **Java (Spring Boot 3.2) Backend** into a single container optimized for **Render**.

---

## 🌟 Method 1: 1-Click Render Web Service (Recommended)

1. Push your repository to **GitHub** or **GitLab**.
2. Log into [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** → **Web Service**.
4. Connect your **GitHub / GitLab repository**.
5. Configure the service:
   - **Name**: `textile-color-qc` (or your preferred name)
   - **Region**: Oregon (or nearest to your users)
   - **Branch**: `main`
   - **Runtime**: **`Docker`**
   - **Dockerfile Path**: `./Dockerfile`
   - **Instance Type**: `Free` (or `Starter`)
6. **Environment Variables**:
   - `PORT`: `8080` (Render will map this automatically)
   - `JAVA_OPTS`: `-Xms128m -Xmx512m -XX:+UseG1GC`
7. Click **Create Web Service**.
8. Render will build the Docker container and deploy your live URL (e.g. `https://textile-color-qc.onrender.com`).

---

## 🛠️ Method 2: Render Blueprint (`render.yaml`)

Because this repo includes `render.yaml`, you can use Render Blueprints:

1. In Render Dashboard, click **Blueprints** → **New Blueprint Instance**.
2. Select your repository.
3. Render will read `render.yaml` and configure everything automatically with zero manual input!

---

## 🐳 Local Docker Testing

To test the Docker container locally before deploying to Render:

### Build the Docker image:

```bash
docker build -t textile-qc-app .
```

### Run the Docker container:

```bash
docker run -p 8080:8080 -e PORT=8080 textile-qc-app
```

### Open in Browser:

Open [http://localhost:8080](http://localhost:8080).

### Using Docker Compose:

```bash
docker compose up --build
```
