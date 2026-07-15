// Database - You can edit this to add/remove students
const database = {
    // Edit this array to add new students
    // To add a new student, copy the format below and paste it inside the array
    certificates: [
        {
            id: "INT-2024-001",
            name: "John Doe",
            internship: "Web Development Intern",
            duration: "3 months",
            completionDate: "December 15, 2024",
            verified: true,
            certificateLink: "https://example.com/certificates/john-doe.pdf"
        },
        {
            id: "INT-2024-002",
            name: "Jane Smith",
            internship: "Data Science Intern",
            duration: "6 months",
            completionDate: "November 30, 2024",
            verified: true,
            certificateLink: "https://example.com/certificates/jane-smith.pdf"
        },
        {
            id: "INT-2024-003",
            name: "Mike Johnson",
            internship: "UI/UX Design Intern",
            duration: "4 months",
            completionDate: "October 20, 2024",
            verified: true,
            certificateLink: "https://example.com/certificates/mike-johnson.pdf"
        }
        // Add more certificates here following the same format
        // Example:
        // {
        //     id: "INT-2024-004",
        //     name: "New Student Name",
        //     internship: "Your Internship Role",
        //     duration: "Duration of Internship",
        //     completionDate: "Completion Date",
        //     verified: true,
        //     certificateLink: "Link to their certificate"
        // }
    ]
};

// QR Scanner instance
let html5QrCode = null;

// Function to verify certificate
function verifyCertificate() {
    const input = document.getElementById('certificateId');
    const id = input.value.trim();
    
    if (!id) {
        alert('Please enter a certificate ID');
        return;
    }
    
    // Show loading state
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div class="loading"></div><p>Verifying...</p>';
    
    // Simulate verification process
    setTimeout(() => {
        const certificate = database.certificates.find(cert => cert.id === id);
        
        if (certificate && certificate.verified) {
            displayResult(certificate);
        } else {
            displayError('Certificate not found or not verified');
        }
    }, 1000);
}

// Function to display result
function displayResult(certificate) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="result-content">
            <div class="status-badge verified">✅ Verified</div>
            <h3>${certificate.name}</h3>
            <p><strong>Certificate ID:</strong> ${certificate.id}</p>
            <p><strong>Internship:</strong> ${certificate.internship}</p>
            <p><strong>Duration:</strong> ${certificate.duration}</p>
            <p><strong>Completion Date:</strong> ${certificate.completionDate}</p>
            <div class="certificate-link">
                <a href="${certificate.certificateLink}" target="_blank">📄 View Full Certificate</a>
            </div>
        </div>
    `;
}

// Function to display error
function displayError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="result-content">
            <div class="status-badge invalid">❌ Invalid</div>
            <p style="color: #721c24;">${message}</p>
        </div>
    `;
}

// Function to start QR scanner
function startScanner() {
    const readerDiv = document.getElementById('qr-reader');
    readerDiv.style.display = 'block';
    
    if (html5QrCode) {
        html5QrCode.clear();
        html5QrCode = null;
    }
    
    html5QrCode = new Html5Qrcode("qr-reader");
    
    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
    };
    
    html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        onScanError
    ).catch(err => {
        console.error('Error starting scanner:', err);
        alert('Unable to start camera. Please check permissions.');
    });
}

// Function when QR code is scanned successfully
function onScanSuccess(decodedText, decodedResult) {
    // Stop the scanner
    if (html5QrCode) {
        html5QrCode.stop();
        html5QrCode.clear();
    }
    
    // The QR code should contain the certificate ID
    const id = decodedText.trim();
    document.getElementById('certificateId').value = id;
    verifyCertificate();
}

// Function when QR scan fails
function onScanError(errorMessage) {
    // This is called when scanning is in progress but no QR code is found
    // You can ignore this or log it
}

// Function to generate QR code for a certificate (for admin use)
function generateQRCode(certificateId) {
    // This would be used by the admin to generate QR codes for certificates
    // You can use a QR code library or API to generate QR codes
    alert('QR Code generation feature coming soon!');
}

// Initialize - Add enter key support
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('certificateId');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verifyCertificate();
        }
    });
    
    // Pre-fill with example ID
    input.value = 'INT-2024-001';
    
    // Auto-verify on load (optional)
    // verifyCertificate();
});

// Function to add new certificate (for admin use)
function addNewCertificate(certificateData) {
    // This function allows you to add new certificates programmatically
    database.certificates.push(certificateData);
    console.log('Certificate added successfully!');
    console.log('Current certificates:', database.certificates);
}

// Example of how to add a new certificate (uncomment and modify to use)
/*
addNewCertificate({
    id: "INT-2024-004",
    name: "Alice Wonderland",
    internship: "Frontend Development Intern",
    duration: "2 months",
    completionDate: "January 15, 2025",
    verified: true,
    certificateLink: "https://example.com/certificates/alice-wonderland.pdf"
});
*/