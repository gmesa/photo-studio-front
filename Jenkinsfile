pipeline {
  agent any
    
  tools {nodejs "node"}

  pipeline {
     agent any
     stages {
        stage("Checkout Stage") {
            steps {
                git credentialsId: '683a6873-e9d4-4d02-a56a-12aa435ed09d', url: 'https://github.com/gmesa/photo-studio-front.git', branch: 'main'
            }
        }
        stage("Build stage") {
            steps {
               bat 'npm install'
            }
        }
        stage("Deploy stage") {
            steps {
               bat 'npm run start'
            }
        }
    }
}  
  
}