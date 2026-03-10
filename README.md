# 🚀 Full DevOps CI/CD Project Guide

Complete **Node.js + Jenkins + Docker + DockerHub CI/CD Pipeline** documentation.

This README explains the **entire setup from A → Z** so anyone can reproduce the pipeline.

---

# 📌 Project Overview

This project demonstrates a **CI/CD pipeline** that automatically:

1. Pulls code from GitHub
2. Installs dependencies
3. Runs tests
4. Builds a Docker image
5. Pushes the image to DockerHub
6. (Optional) Deploys the container

---

# 🧱 Tech Stack

| Tool         | Purpose                 |
| ------------ | ----------------------- |
| 🐙 GitHub    | Source Code Repository  |
| 🤖 Jenkins   | CI/CD Automation Server |
| 🐳 Docker    | Containerization        |
| 📦 DockerHub | Container Registry      |
| 🟢 Node.js   | Backend Application     |
| 🧪 Jest      | Testing Framework       |

---

# 🏗 CI/CD Architecture

```
Developer
   │
   ▼
GitHub Push
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
   ├── Push Image → DockerHub
   └── Deploy Container
```

---

# 📂 Project Structure

```
node-jenkins-devops-project
│
├── Dockerfile
├── docker-compose.yml
├── Jenkinsfile
├── package.json
├── server.js
└── tests
    └── user.test.js
```

---

# ⚙️ 1. Install Requirements

Ensure these tools are installed.

```
Docker
Docker Compose
Git
Node.js
```

Verify installation:

```
docker --version
node -v
npm -v
```

---

# 🐳 2. Jenkins Setup using Docker

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

---

# 🔓 3. Unlock Jenkins

Get initial password:

```
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

Open browser:

```
http://localhost:8080
```

Paste password and install **Suggested Plugins**.

---

# 🔌 4. Required Jenkins Plugins

Install the following:

* Git Plugin
* GitHub Integration
* Pipeline
* Docker Pipeline

---

# 🟢 5. Node.js Application

Example server:

```javascript
const express = require("express")

const app = express()

app.get("/", (req,res)=>{
  res.send("DevOps CI/CD Running 🚀")
})

module.exports = app

if (require.main === module) {
  app.listen(3000, ()=>{
    console.log("Server running on port 3000")
  })
}
```

---

# 📦 6. package.json

```json
{
 "name": "jenkins-devops-project",
 "version": "1.0.0",
 "main": "server.js",
 "scripts": {
  "start": "node server.js",
  "test": "jest"
 },
 "dependencies": {
  "express": "^5.2.1"
 },
 "devDependencies": {
  "jest": "^29.7.0",
  "supertest": "^7.0.0"
 }
}
```

---

# 🧪 7. Testing (Jest)

Create file:

```
tests/user.test.js
```

```javascript
const request = require("supertest")
const app = require("../server")

describe("GET /", () => {

 it("should return welcome message", async () => {

  const res = await request(app).get("/")

  expect(res.statusCode).toBe(200)

 })

})
```

Run tests:

```
npm test
```

---

# 🐳 8. Dockerfile

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

# 📦 9. Docker Compose (Deployment)

```
docker-compose.yml
```

```yaml
version: "3"

services:

 app:
  image: kaushik8136/node-devops-app:latest

  ports:
   - "3000:3000"

  restart: always
```

---

# 🔑 10. DockerHub Access Token

Go to:

```
DockerHub → Account Settings → Security
```

Create:

```
New Access Token
```

Permissions:

```
Read & Write
```

---

# 🔐 11. Jenkins Credentials

Go to:

```
Manage Jenkins
→ Credentials
→ Global
→ Add Credentials
```

Select:

```
Username with password
```

Example:

```
Username: kaushik8136
Password: DockerHub Access Token
ID: dockerhub-creds
```

---

---

# 🔗 13. GitHub Webhook

Go to:

```
GitHub Repository
→ Settings
→ Webhooks
→ Add Webhook
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

---

# 🔄 CI/CD Pipeline Flow

```
Developer Push
     │
     ▼
GitHub Repository
     │
     ▼
GitHub Webhook
     │
     ▼
Jenkins Pipeline
     │
     ├── npm install
     ├── run tests
     ├── build docker image
     ├── push docker image
     └── deploy container
```

---

# 📊 DevOps Production Architecture

```
GitHub
   │
   ▼
CI (Jenkins)
   │
   ▼
Docker Build
   │
   ▼
DockerHub Registry
   │
   ▼
Server Deployment
   │
   ▼
Monitoring
(Prometheus + Grafana)
```

---

# 🧠 DevOps Concepts Explained

### Continuous Integration

Automated build and test after each code push.

### Continuous Delivery

Application automatically prepared for deployment.

### Containerization

Docker packages application with dependencies.

### Infrastructure Automation

Jenkins automates build, test, and deployment.

---

# 🎯 Final Result

After setup:

✔ Push code to GitHub

✔ Jenkins pipeline runs automatically

✔ Docker image builds

✔ Image pushed to DockerHub

✔ Container ready for deployment

---

# 🚀 Skills Demonstrated

* Docker
* Jenkins
* GitHub Webhooks
* CI/CD Pipeline
* Node.js Deployment
* DevOps Automation

---

# 🏁 Perfect DevOps Portfolio Project

This repository demonstrates **real DevOps workflow used in production environments.**

It is suitable for:

* DevOps portfolios
* Interviews
* Learning CI/CD

---

# ⭐ Author

Created by **Kaushik Mondal**

DevOps + Software Engineering Project
