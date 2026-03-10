# 🚀 Jenkins + Docker + GitHub CI/CD Setup (Deep Dive)

A complete step‑by‑step guide to build a **DevOps CI/CD pipeline** using:

* 🐙 GitHub (Source Control)
* 🤖 Jenkins (Automation Server)
* 🐳 Docker (Containerization)
* 📦 Docker Hub (Image Registry)
* 🧩 Node.js App (Example Application)

---

# 🏗 Architecture Overview

```
Developer Push
      │
      ▼
   GitHub Repo
      │
      ▼
 GitHub Webhook
      │
      ▼
     Jenkins
      │
      ├── Install Dependencies
      ├── Run Tests
      ├── Build Docker Image
      ├── Push Image → Docker Hub
      └── Deploy Container
```

---

# 📂 Project Structure

```
jenkins-devops-project
│
├── Dockerfile
├── docker-compose.yml
├── Jenkinsfile
├── server.js
├── package.json
└── tests
```

---

# 🐳 Jenkins Docker Setup

Create a file called **jenkins.yaml**:

```yaml
version: "3"

services:
  jenkins:
    image: jenkins/jenkins:lts
    container_name: jenkins
    user: root

    ports:
      - "8080:8080"
      - "50000:50000"

    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock

volumes:
  jenkins_home:
```

Run Jenkins:

```
docker compose -f jenkins.yaml up -d
```

---

# 🔓 Jenkins Initial Password

Get unlock password:

```
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

Open Jenkins:

```
http://localhost:8080
```

Paste password and install **Suggested Plugins**.

---

# 📦 Node.js Example App

Example **server.js**:

```javascript
const express = require("express")
const app = express()

app.get("/", (req,res)=>{
  res.send("DevOps CI/CD Running 🚀")
})

app.listen(3000, ()=>{
  console.log("Server running on port 3000")
})
```

---

# 🐳 Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["node","server.js"]
```

---

# 🧩 docker-compose (Deploy App)

```yaml
version: "3"

services:
  app:
    image: your-dockerhub-username/node-devops-app:latest
    container_name: node-app

    ports:
      - "3000:3000"

    restart: always
```

---

# 🤖 Jenkins Pipeline (Jenkinsfile)

```groovy
pipeline {

    agent any

    environment {
        IMAGE_NAME = "dockerhub-username/node-devops-app"
        DOCKER_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/jenkins-devops-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$DOCKER_TAG .'
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push $IMAGE_NAME:$DOCKER_TAG'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose pull'
                sh 'docker compose up -d'
            }
        }

    }
}
```

---

# 🔗 GitHub Webhook Setup

Go to:

```
GitHub Repo → Settings → Webhooks → Add Webhook
```

Payload URL:

```
http://YOUR_SERVER_IP:8080/github-webhook/
```

Content type:

```
application/json
```

Event:

```
Just the push event
```

Now every **git push** will trigger Jenkins pipeline.

---

# 🔄 CI/CD Flow

```
Git Push
   │
   ▼
GitHub Webhook
   │
   ▼
Jenkins Pipeline
   │
   ├── Install Dependencies
   ├── Run Tests
   ├── Build Docker Image
   ├── Push Image
   └── Deploy Container
```

---

# 📊 Real DevOps Production Architecture

```
GitHub
   │
   ▼
CI (Jenkins / GitHub Actions)
   │
   ▼
Docker Build
   │
   ▼
Docker Hub / AWS ECR
   │
   ▼
Kubernetes Cluster
   │
   ▼
Monitoring (Prometheus + Grafana)
```

---

# 🧠 Key DevOps Concepts

### CI — Continuous Integration

Code automatically builds and tests after every push.

### CD — Continuous Delivery

Application automatically deploys after successful build.

### Containerization

Docker packages application + dependencies.

### Infrastructure Automation

Tools like Jenkins automate build and deployment.

---

# 🎯 Final Result

After setup:

* Push code to GitHub
* Jenkins triggers automatically
* Docker image builds
* Image pushed to DockerHub
* Container redeployed automatically

✅ Fully automated DevOps pipeline.

---

# 🔥 Skills Demonstrated

* Docker
* Jenkins
* GitHub Webhooks
* CI/CD
* Node.js Deployment
* DevOps Automation

---

**Perfect for DevOps portfolio projects.** 🚀
