pipeline {
  agent any
  stages {
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