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

  }
}