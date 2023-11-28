pipeline {
  agent any
  stages {
    stage('intofrontend') {
      steps {
        bat 'cd Frontend'
      }
    }

    stage('Docker_Build') {
      steps {
        bat 'docker build -t frontend-assign  .'
      }
    }

    stage('Docker_Tag') {
      steps {
        bat 'docker tag frontend-assign venkatakrishnanraghavan/frontend-assign:latest'
      }
    }

    stage('Docker_push') {
      steps {
        bat 'docker push venkatakrishnanraghavan/Frontend-assign:latest'
      }
    }

  }
}