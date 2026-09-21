pipeline {
    agent any
    parameters {
       
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Which browser engine to run the UI tests against')
        booleanParam(name: 'HEADLESS', defaultValue: true, description: 'Run headless (uncheck to debug with a visible browser on the Jenkins agent)')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
                sh "npx playwright install --with-deps ${params.BROWSER}"
            }
        }
        stage('Run Cucumber tests') {
            steps {
                sh "BROWSER=${params.BROWSER} HEADLESS=${params.HEADLESS} npx cucumber-js --config cucumber.json || true"
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