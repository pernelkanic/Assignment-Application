pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        bat 'git clone https://github.com/pernelkanic/Assignment-Application.git'
      }
    }

    stage('buildandpush') {
      parallel {
        stage('buildandpush') {
          steps {
            bat 'cd Assignment-Application'
          }
        }

        stage('intofrontend') {
          steps {
            bat 'cd Frontend'
          }
        }

      }
    }

  }
}