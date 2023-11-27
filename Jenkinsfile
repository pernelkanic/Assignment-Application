pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        bat 'git clone https://github.com/pernelkanic/Assignment-Application.git'
      }
    }

    stage('intofrontend') {
      steps {
        bat 'cd Frontend'
      }
    }

    stage('Docker_Build') {
      steps {
        bat 'docker build -t Frontend-assign  .'
      }
    }

    stage('Docker_Tag') {
      steps {
        bat 'docker tag Frontend-assign venkatakrishnanraghavan/Frontend-assign:latest'
      }
    }

    stage('Docker_push') {
      steps {
        bat 'docker push venkatakrishnanraghavan/Frontend-assign:latest'
      }
    }

  }
}