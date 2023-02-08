pipeline {

    agent any    

    tools {
        nodejs 'NodeJs'
    }   
    
     stages {

       stage("Checkout Stage") {
           steps {
                git credentialsId: '946e6fc0-970e-480c-9c17-8acb163b4f76', url: 'https://github.com/gmesa/photo-studio-front.git', branch: 'main'
            }
        }
         stage("Install stage") {
            steps {
               sh 'npm config set legacy-peer-deps true'
               sh 'npm install'
            }
        }
        
        stage("Build image"){
            steps {
               sh 'docker build -t photo-studio-front .'
            }            
        } 
        stage("Push to docker hub"){

            steps{
                 withCredentials([usernamePassword(credentialsId: 'hubcredential', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh 'docker tag photo-studio-front gmesac87/photo-studio-front'
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                    sh 'docker push gmesac87/photo-studio-front'
                }
            }
        }
    }
}  
  
