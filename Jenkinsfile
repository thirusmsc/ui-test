pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps chromium'
            }
        }
        stage('Run Cucumber tests') {
            steps {
                sh 'npx cucumber-js --config cucumber.json || true'
            }
        }
        stage('Generate report') {
            steps {
                sh 'node scripts/generate-report.mjs'
            }
        }
        stage('Publish report') {
            steps {
                publishHTML(target: [
                    reportDir: 'reports',
                    reportFiles: 'index.html',
                    reportName: 'Cucumber Test Report History',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])
                archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
            }
        }
    }
}