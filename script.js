// ========================================
// SHARE FUNCTIONS
// ========================================

function shareOnLinkedIn() {
    const name = document.querySelector('#result h3')?.textContent || 'a student';
    const certId = document.querySelector('#result p strong')?.nextSibling?.textContent || '';
    const url = window.location.href;
    
    const shareText = `🎓 I just verified my internship certificate! 
Name: ${name}
Certificate ID: ${certId}
Verified at: ${url}
#Internship #Certificate #Verification`;
    
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(shareText)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=600');
}

function shareOnTwitter() {
    const name = document.querySelector('#result h3')?.textContent || 'a student';
    const certId = document.querySelector('#result p strong')?.nextSibling?.textContent || '';
    const url = window.location.href;
    
    const shareText = `✅ I just verified my internship certificate on InternVerify! 🎓
Name: ${name}
Certificate ID: ${certId}
Verify yours at: ${url}
#Internship #CertificateVerification`;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

function shareOnWhatsApp() {
    const name = document.querySelector('#result h3')?.textContent || 'a student';
    const certId = document.querySelector('#result p strong')?.nextSibling?.textContent || '';
    const url = window.location.href;
    
    const shareText = `✅ Verified Certificate! 🎓
Name: ${name}
Certificate ID: ${certId}
Verify here: ${url}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank', 'width=600,height=600');
}

function shareOnFacebook() {
    const url = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent('I just verified my internship certificate! 🎓')}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
}

function shareViaEmail() {
    const name = document.querySelector('#result h3')?.textContent || 'a student';
    const certId = document.querySelector('#result p strong')?.nextSibling?.textContent || '';
    const url = window.location.href;
    
    const subject = '🎓 Internship Certificate Verification';
    const body = `Hello,

I would like to share my verified internship certificate details:

Name: ${name}
Certificate ID: ${certId}
Verification Link: ${url}

Thank you,
${name}`;
    
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
}

function shareViaCopy() {
    const name = document.querySelector('#result h3')?.textContent || 'a student';
    const certId = document.querySelector('#result p strong')?.nextSibling?.textContent || '';
    const url = window.location.href;
    
    const shareText = `✅ Verified Certificate! 🎓
Name: ${name}
Certificate ID: ${certId}
Verification Link: ${url}`;
    
    navigator.clipboard.writeText(shareText).then(() => {
        // Show success message
        const btn = document.querySelector('.btn-share-copy');
        const originalText = btn.textContent;
        btn.textContent = '✅ Copied!';
        btn.style.background = '#27ae60';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(() => {
        alert('Copy failed. Please copy the text manually.');
    });
}







// Database
const database = {
    certificates: [
        {
            id: "INT-2024-001",
            name: "John Doe",
            internship: "Web Development Intern",
            duration: "3 months",
            completionDate: "December 15, 2024",
            verified: true,
            certificateLink: "https://drive.google.com/file/d/1Tin2gET6LZ8LnAkshNZVPfXznTWLlie8/preview"
        },
        {
            id: "INT-2024-002",
            name: "Jane Smith",
            internship: "Data Science Intern",
            duration: "6 months",
            completionDate: "November 30, 2024",
            verified: true,
            certificateLink: "https://drive.google.com/file/d/1Tin2gET6LZ8LnAkshNZVPfXznTWLlie8/preview"
        },
        {
            id: "INT-2024-003",
            name: "Mike Johnson",
            internship: "UI/UX Design Intern",
            duration: "4 months",
            completionDate: "October 20, 2024",
            verified: true,
            certificateLink: "https://drive.google.com/file/d/1Tin2gET6LZ8LnAkshNZVPfXznTWLlie8/preview"
        }
    ]
};

// Verify Certificate Function
function verifyCertificate() {
    const input = document.getElementById('certificateId');
    const id = input.value.trim();
    
    if (!id) {
        alert('Please enter a certificate ID');
        return;
    }
    
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = '<div class="loading"></div><p>Verifying...</p>';
    
    setTimeout(() => {
        const certificate = database.certificates.find(cert => cert.id === id);
        
        if (certificate && certificate.verified) {
            displayResult(certificate);
        } else {
            displayError('Certificate not found or not verified');
        }
    }, 1000);
}

// Display Result Function
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
                <a href="${certificate.certificateLink}" target="_blank" class="btn-certificate">
                    📄 View Full Certificate
                </a>
            </div>
            <!-- SHARE BUTTONS -->
            <div class="share-section">
                <p style="margin: 15px 0 10px 0; color: #666; font-weight: 600;">Share Your Verified Certificate</p>
                <div class="share-buttons">
                    <button onclick="shareOnLinkedIn()" class="btn-share-linkedin" title="Share on LinkedIn">
                        <span>🔗</span> LinkedIn
                    </button>
                    <button onclick="shareOnTwitter()" class="btn-share-twitter" title="Share on Twitter">
                        <span>🐦</span> Twitter
                    </button>
                    <button onclick="shareOnWhatsApp()" class="btn-share-whatsapp" title="Share on WhatsApp">
                        <span>💬</span> WhatsApp
                    </button>
                    <button onclick="shareOnFacebook()" class="btn-share-facebook" title="Share on Facebook">
                        <span>👍</span> Facebook
                    </button>
                    <button onclick="shareViaEmail()" class="btn-share-email" title="Share via Email">
                        <span>✉️</span> Email
                    </button>
                    <button onclick="shareViaCopy()" class="btn-share-copy" title="Copy Verification Details">
                        <span>📋</span> Copy
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Display Error Function
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

// QR Scanner Function
let html5QrCode = null;

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

function onScanSuccess(decodedText, decodedResult) {
    if (html5QrCode) {
        html5QrCode.stop();
        html5QrCode.clear();
    }
    document.getElementById('certificateId').value = decodedText.trim();
    verifyCertificate();
}

function onScanError(errorMessage) {
    // Ignore - scanning in progress
}

// Auto-verify from URL
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const verifyId = urlParams.get('verify');
    
    if (verifyId) {
        const certificate = database.certificates.find(cert => cert.id === verifyId);
        if (certificate && certificate.verified) {
            setTimeout(() => {
                document.getElementById('certificateId').value = verifyId;
                displayResult(certificate);
                document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
});