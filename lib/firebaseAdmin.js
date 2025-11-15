import admin from 'firebase-admin';

const serviceAccount = {
  "type": "service_account",
  "project_id": "mao-de-cera-oficial",
  "private_key_id": "20c52196616c0c43880631153cc33f15971ea8ec",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCu17P6jZcjRjTn\n15HUWAHVU5vwDnkcgCRbRCIUbyi03AiJNkFNyV9C4hroZPNHmQABruA+R7CDzn7+\ni909e9hC28E0xJcoJgpWDmqlvzzk831101J8XoYFrOCAD/fC5yj1CYrx3GsEIXcG\n3q4mJ8jKb5mpYHnd9VnGWc0kN/zJHa27nKop6ojkXUl/JNAGWbVi8i7T2ZulgnaI\ngxyvmh9AgSjACQnoomD3QiFtkbjp+DPKlNDxcPGmur1duMzUcW3jIL5p72CI5lSj\n6KspCZqLy6pkjdov6xdpEgmGIKjHlKvRdebj+AGJ4T5HCDuTxDTwcuqw9UHhB6v0\n2I+EM2KvAgMBAAECggEAA05G1l+RMlSUYAmnpu72RyR6W6cWF/lvMZ5oR+8C4MA6\nRnlBZ/z9DuloMiRuLeJWBvcK6L7aLQgdWs5XBi51w4ABLXBtWOijN8bvdwn0CCOy\nk/12ctTXxGcCuBkj9cBP+jOdGn8wvMyaQgW5lb8Fg5h9RlEPJ+PXkGzbs4KRyxpA\nPGKLrpnDSCfo4h6HM+O35xzPMX/eIOdTRgu5vQMAR2rJWsdZCW/mzJOwm0IIBxuH\nRNOs1J39BsESQCmMtwe2wwaOGLkx6aSALV9DsTOqlK4CP11NUuySmpEFdAbIGra+\nGjXdS5VbG6Aov4CN9R9FqOcR9ZzQSPX79Vs+znxeQQKBgQDrWPIqKUWMhgw5MPO5\nqUoX3FW0qC26qe8vKKq+nVguHX/90KKzQGipJWGZrL/qS8hTHfv8c7LIAT/BJYXf\nF8cfGHoasuIXcp/go5LcVGWCujql6i+hloLrkdirNpguZL06az9EPrauDyqsk/qu\nJSf/0/dgQiId/kOAla45iccOwQKBgQC+L4W0H2Y+ZMLYDo3Ag8pwi8eyT0X1mDHg\n4VfcHHuB0hNjPF0ej/Bf0CewiRa8euMAK7TpL6FUD3INhIPUX1Q5CpFNg4A2vb/i\nFte6wf0ohXjL/9YvNThGNX6rm8qH61TzOYPzKpVnda8H0R9BvZhFgfp+GDYZMntR\n+aCm0GA9bwKBgQCyUG8TALhAU2Q5hNx1RE3uLDQHsBENyCmAKqjLyb2BGzrZnVVY\nySlDVx5O6DN0mryKNUKyMRs5LLEYb4yxzntBFTOWvQhOybtW4bipFYzf8qfzA6/Z\nF4fUYmmut6uwIwW4mH+T/ow87yLfJTOe9GoNDJX2qcTdwsN0TnR2Bez7QQKBgQCP\nF7hUXq+R0EQdRU34A/Cjnzff++8aKqmUlleBn9h5Q7McngU+AnSL0lSaaXq20wrK\nTRgvvot2cKySaRq7BgKbbE0I8iDcjwW5ORCVTnGINGw/qLzhBfzSLluhCHVosHJZ\nEfQqV+bTUeMgUYJf9yODYJk0mEjTynyon9X0zKEsdwKBgQC3+1pSrjxXs3w7byQN\noIvNi6UolyH0cCQ7nHvgJ5XaKy+bx7WR+LyyLRp+FNV8XyEkUmYWfvYQZ3D1MH74\nVCv4sJUTIgH05I3Xz+5B5q7OgRXdEavcsGI1rIvsj/pyg5MEa3Hvidh1Z4haHqgM\nKo0XU0Pmd8cUesoh02/Rtg8w/Q==\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
  "client_email": "firebase-adminsdk-fbsvc@mao-de-cera-oficial.iam.gserviceaccount.com",
  "client_id": "117891447413607818418",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40mao-de-cera-oficial.iam.gserviceaccount.com"
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error('Falha ao inicializar o Firebase Admin SDK:', error);
  }
}

const adminAuth = admin.auth();
const adminDb = admin.firestore();

export { adminAuth, adminDb };
