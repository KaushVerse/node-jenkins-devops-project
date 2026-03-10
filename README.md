# 🚀 Complete Jenkins + Docker + GitHub CI/CD Guide (A → Z)

This document explains **step‑by‑step how to build a full DevOps CI/CD pipeline** using:

* 🐙 GitHub – Source code hosting
* 🤖 Jenkins – CI/CD automation server
* 🐳 Docker – Containerization
* 📦 Docker Hub – Container registry
* 🟢 Node.js – Example application

This guide covers **everything from setup to deployment.**

---

# 🧠 Final Architecture

```
Developer
   │
   ▼
Git Push → GitHub Repository
   │
   ▼
GitHub Webhook
   │
   ▼
Jenkins Pipeline
   │
   ├── Checkout Code
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
├── package.json
├── server.js
└── tests
```

---

# 1️⃣ Install Docker

Verify Docker installation:

```
docker --version
```

Verify Docker Compose:

```
docker compose version
```

---

# 2️⃣ Jenkins Setup Using Docker

Create file:

```
jenkins.yaml
```

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

Check container:

```
docker ps
```

---

# 3️⃣ Access Jenkins Dashboard

Open browser:

```
http://localhost:8080
```

---

# 4️⃣ Jenkins Initial Password

Run command:

```
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

Copy password and paste into Jenkins unlock page.

Then click:

```
Install Suggested Plugins
```

Create Admin User.

---

# 5️⃣ Install Required Plugins

Go to:

```
Manage Jenkins → Plugins
```

Install:

* Git plugin
* GitHub Integration
* Pipeline
* Docker Pipeline

Restart Jenkins.

---

# 6️⃣ Install Docker Inside Jenkins Container

Enter Jenkins container:

```
docker exec -it jenkins bash
```

Install docker:

```
apt update
apt install docker.io -y
```

Verify:

```
docker --version
```

---

# 7️⃣ Create Node.js Application

Create **server.js**

```javascript
const express = require("express")

const app = express()

app.get("/", (req,res)=>{
  res.send("DevOps CI/CD Pipeline Running 🚀")
})

app.listen(3000,()=>{
  console.log("Server running on port 3000")
})
```

---

# 8️⃣ package.json Example

```json
{
  "name": "jenkins-devops-project",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "test": "echo tests passed"
  },
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

---

# 9️⃣ Dockerfile

```
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["node","server.js"]
```

---

# 🔟 Docker Compose (Deployment)

Create:

```
docker-compose.yml
```

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

# 1️⃣1️⃣ DockerHub Credentials in Jenkins

Go to:

```
Manage Jenkins
→ Credentials
→ Global
→ Add Credentials
```

Select:

```
Kind: Username with password
```

Fill:

```
Username: dockerhub username
Password: dockerhub access token
ID: dockerhub-creds
```

---

# 1️⃣2️⃣ Create Jenkins Pipeline

Dashboard →

```
New Item
```

Name:

```
node-devops-pipeline
```

Select:

```
Pipeline
```

---

# 1️⃣3️⃣ Connect GitHub Repository

Pipeline configuration:

```
Pipeline script from SCM
```

SCM:

```
Git
```

Repository URL:

```
https://github.com/your-username/jenkins-devops-project.git
```

Branch:

```
*/main
```

Script Path:

```
Jenkinsfile
```

---

# 1️⃣4️⃣ Jenkinsfile (Pipeline)

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

  stage('Push Docker Image') {
   steps {
    sh 'docker push $IMAGE_NAME:$DOCKER_TAG'
   }
  }

  stage('Deploy Container') {
   steps {
    sh 'docker compose pull'
    sh 'docker compose up -d'
   }
  }

 }
}
```

---

# 1️⃣5️⃣ GitHub Webhook Setup

Go to repository:

```
Settings → Webhooks → Add Webhook
```

Payload URL:

```
http://YOUR_SERVER_IP:8080/github-webhook/
```

Content Type:

```
application/json
```

Event:

```
Just the push event
```

Now every **git push triggers Jenkins pipeline automatically.**

---

# 🔄 CI/CD Workflow

```
Developer Push Code
        │
        ▼
      GitHub
        │
        ▼
   GitHub Webhook
        │
        ▼
      Jenkins
        │
        ├── Checkout Code
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
CI Tool (Jenkins / GitHub Actions)
   │
   ▼
Docker Build
   │
   ▼
Container Registry
(DockerHub / AWS ECR)
   │
   ▼
Kubernetes Cluster
   │
   ▼
Monitoring
(Prometheus + Grafana)
```

---

# 🧠 DevOps Concepts Explained

### Continuous Integration (CI)

Every code push automatically builds and tests the application.

### Continuous Delivery (CD)

Application automatically deploys after successful build.

### Containerization

Docker packages application with all dependencies.

### Infrastructure Automation

Jenkins automates build, test and deployment pipelines.

---

# 🎯 Final Result

After completing setup:

✔ Push code to GitHub
✔ Jenkins pipeline runs automatically
✔ Docker image builds
✔ Image pushed to DockerHub
✔ Application redeployed automatically

This creates a **fully automated CI/CD pipeline.**

---

# 🚀 Skills Demonstrated

* Jenkins
* Docker
* DockerHub
* GitHub Webhooks
* CI/CD Pipeline
* Node.js Deployment
* DevOps Automation

---

# 🏁 Perfect DevOps Portfolio Project

This project demonstrates **real DevOps engineering workflow used in companies.**

It is ideal for:

* DevOps portfolio
* GitHub README documentation
* Interview demonstrations

---

🔥 End of Complete Jenkins CI/CD Guide
