pipeline {

    agent any

    environment {
        IMAGE_NAME = "mydockerhub12/weather-app"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Faiz-official/weather-app-devops.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'SonarQube skipped'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Trivy FS Scan') {
            steps {
                sh '''
                trivy fs --severity HIGH,CRITICAL .
                '''
            }
        }

        stage('Trivy Image Scan') {
            steps {
                sh '''
                trivy image --severity HIGH,CRITICAL $IMAGE_NAME:${BUILD_NUMBER}
                '''
            }
        }

        stage('DockerHub Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                    echo $DOCKER_PASS | docker login \
                    -u $DOCKER_USER \
                    --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                docker push $IMAGE_NAME:${BUILD_NUMBER}
                '''
            }
        }
    }
}