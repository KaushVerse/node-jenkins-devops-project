pipeline {

   agent {
        docker {
            image 'node:20'
        }
    }

    environment {
        IMAGE_NAME = "kaushverse/node-devops-app"
        DOCKER_TAG = "${BUILD_NUMBER}"
        DOCKER_CREDS = "dockerhub-creds"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/KaushVerse/node-jenkins-devops-project'
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
                sh '/usr/bin/docker build -t $IMAGE_NAME:$DOCKER_TAG .'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "$DOCKER_CREDS", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                   sh '''
                    echo $PASSWORD | /usr/bin/docker login -u $USERNAME --password-stdin
                      '''
                }
            }
        }

      stage('Push Image') {
          steps {
        sh '''
        /usr/bin/docker tag $IMAGE_NAME:$DOCKER_TAG $IMAGE_NAME:latest
        /usr/bin/docker push $IMAGE_NAME:$DOCKER_TAG
        /usr/bin/docker push $IMAGE_NAME:latest
        '''
     }
    }

        stage('Deploy Container') {
            steps {
                sh 'docker compose down'
                sh 'docker compose pull'
                sh 'docker compose up -d'
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