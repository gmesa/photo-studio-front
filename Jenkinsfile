pipeline {
    agent {
        docker {
            image 'node:19-alpine3.16' 
            args '-p 3000:3000' 
        }
    }

    enviroment{
        dockerhub=credentials('hubCredentials')
    }   
    
     stages {
        stage("Checkout Stage") {
           steps {
                git credentialsId: '683a6873-e9d4-4d02-a56a-12aa435ed09d', url: 'https://github.com/gmesa/photo-studio-front.git', branch: 'main'
            }
        }
         stage("Install stage") {
            steps {
               sh 'npm config set legacy-peer-deps true'
               sh 'npm install'
            }
        }
        stage("Build image"){

            sh 'docker build -t photo-studio-front .'
        }

        
    }
}  
  
