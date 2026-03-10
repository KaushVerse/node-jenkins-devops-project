pipeline {

    agent any

    environment {
        IMAGE_NAME = "node-devops-app"
        DOCKER_TAG = "${BUILD_NUMBER}"
    }

    options {
        skipStagesAfterUnstable()
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/node-jenkins-devops-project.git'
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

        stage('Tag Latest Image') {
            steps {
                sh 'docker tag $IMAGE_NAME:$DOCKER_TAG $IMAGE_NAME:latest'
            }
        }

        stage('Deploy Container') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d --build'
            }
        }
    }

    post {

        success {
            echo 'Deployment Successful 🚀'
        }

        failure {
            echo 'Pipeline Failed ❌'
        }

        always {
            cleanWs()
        }
    }
}