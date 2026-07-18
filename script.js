// ===== DATABASE =====
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

// ===== VARIABLES =====
let currentCertificate = null;

// ===== VERIFY CERTIFICATE =====
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

// ===== DISPLAY RESULT =====
function displayResult(certificate) {
    currentCertificate = certificate;
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="result-content">
            <div class="status-badge verified">✅ Verified</div>
            <h3 id="studentName">${certificate.name}</h3>
            <p><strong>Certificate ID:</strong> <span id="certId">${certificate.id}</span></p>
            <p><strong>Internship:</strong> <span id="internship">${certificate.internship}</span></p>
            <p><strong>Duration:</strong> <span id="duration">${certificate.duration}</span></p>
            <p><strong>Completion Date:</strong> <span id="completionDate">${certificate.completionDate}</span></p>
            <div class="certificate-link">
                <a id="certLink" href="${certificate.certificateLink}" target="_blank" class="btn-certificate">📄 View Full Certificate</a>
                <button onclick="downloadCertificate()" class="btn-download">⬇️ Download Certificate</button>
            </div>
            
            <!-- SHARE SECTION - ONLY ONE -->
            <div class="share-section" style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center;">
                <h4 style="margin-bottom: 15px; color: #333;">Share Your Verified Certificate</h4>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="shareOnLinkedIn()" class="btn-share" style="background: #0077b5; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer;">LinkedIn</button>
                    <button onclick="shareOnTwitter()" class="btn-share" style="background: #1da1f2; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer;">Twitter</button>
                    <button onclick="shareOnWhatsApp()" class="btn-share" style="background: #25d366; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer;">WhatsApp</button>
                    <button onclick="shareOnFacebook()" class="btn-share" style="background: #1877f2; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer;">Facebook</button>
                    <button onclick="shareViaEmail()" class="btn-share" style="background: #ea4335; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer;">Email</button>
                    <button onclick="copyVerificationLink()" class="btn-share" style="background: #666; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer;">Copy</button>
                </div>
            </div>
        </div>
    `;
}

// ===== DISPLAY ERROR =====
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

// ===== QR SCANNER =====
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

// ===== SHARE FUNCTIONS =====
function shareOnLinkedIn() {
    const url = window.location.href;
    const text = `✅ I have successfully completed my internship! Verify my certificate here:`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`, '_blank');
}

function shareOnTwitter() {
    const url = window.location.href;
    const text = `✅ I have successfully completed my internship! Verify my certificate here:`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareOnWhatsApp() {
    const url = window.location.href;
    const text = `✅ I have successfully completed my internship! Verify my certificate here: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

function shareOnFacebook() {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function shareViaEmail() {
    const url = window.location.href;
    const subject = 'My Verified Internship Certificate';
    const body = `I have successfully completed my internship! Verify my certificate here: ${url}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function copyVerificationLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('✅ Verification link copied to clipboard!');
    }).catch(() => {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('✅ Verification link copied to clipboard!');
    });
}

// ===== DOWNLOAD CERTIFICATE =====
function downloadCertificate() {
    const name = document.querySelector('#result h3')?.textContent || 'Certificate';
    const certId = document.getElementById('certId')?.textContent || '';
    const internship = document.getElementById('internship')?.textContent || '';
    const duration = document.getElementById('duration')?.textContent || '';
    const date = document.getElementById('completionDate')?.textContent || '';
    
    downloadCertificateAsImage(name, certId, internship, duration, date);
}

function downloadCertificateAsImage(name, certId, internship, duration, date) {
    const certDiv = document.createElement('div');
    certDiv.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: 800px;
        padding: 40px;
        background: white;
        border: 20px solid #d4af37;
        border-radius: 20px;
        font-family: 'Georgia', serif;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 9999;
    `;
    
    certDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 4rem;">🎓</div>
            <h1 style="font-size: 2.5rem; color: #d4af37; text-transform: uppercase; letter-spacing: 5px; margin: 10px 0;">Certificate of Internship</h1>
            <p style="font-size: 1.2rem; color: #666;">This certifies that</p>
        </div>
        
        <div style="padding: 20px 0;">
            <h2 style="font-size: 2.8rem; color: #2c3e50; margin: 20px 0; border-bottom: 2px dashed #d4af37; display: inline-block; padding-bottom: 10px;">${name}</h2>
            <p style="font-size: 1.2rem; margin: 20px 0;">has successfully completed the</p>
            <h3 style="font-size: 1.8rem; color: #2c3e50; margin: 10px 0;">${internship}</h3>
            <p style="font-size: 1.1rem; margin: 10px 0;">program at <strong>InternVerify</strong></p>
            
            <div style="display: inline-block; background: #27ae60; color: white; padding: 5px 20px; border-radius: 50px; font-size: 0.9rem; font-weight: bold; margin: 10px 0;">✅ Verified Certificate</div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 20px 0; max-width: 400px; margin-left: auto; margin-right: auto; text-align: left;">
                <div style="padding: 5px 0;"><strong>Certificate ID:</strong> ${certId}</div>
                <div style="padding: 5px 0;"><strong>Duration:</strong> ${duration}</div>
                <div style="padding: 5px 0;"><strong>Completion Date:</strong> ${date}</div>
                <div style="padding: 5px 0;"><strong>Status:</strong> <span style="color: #27ae60; font-weight: bold;">Verified ✓</span></div>
            </div>
            
            <div style="margin: 15px 0;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${certId}" alt="QR Code" style="border: 2px solid #d4af37; border-radius: 10px; padding: 5px;">
            </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #d4af37; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div style="text-align: center;">
                <div style="width: 150px; height: 2px; background: #333; margin: 0 auto 10px;"></div>
                <p style="font-size: 0.9rem; color: #666;"><strong>Authorized Signatory</strong></p>
                <p style="font-size: 0.8rem; color: #999;">InternVerify</p>
            </div>
            <div style="text-align: center;">
                <p style="font-size: 0.9rem; color: #666;"><strong>Date of Issue</strong></p>
                <p style="font-size: 0.9rem; color: #333;">${date}</p>
            </div>
        </div>
        
        <div style="margin-top: 20px; font-size: 0.8rem; color: #999; border-top: 1px solid #eee; padding-top: 10px;">
            This certificate is digitally verified. Scan the QR code to verify.
        </div>
    `;
    
    document.body.appendChild(certDiv);
    
    if (typeof html2canvas !== 'undefined') {
        html2canvas(certDiv, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `Certificate-${name.replace(/\s/g, '_')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            document.body.removeChild(certDiv);
        }).catch(() => {
            downloadCertificateAsHTML(name, certId, internship, duration, date);
            document.body.removeChild(certDiv);
        });
    } else {
        downloadCertificateAsHTML(name, certId, internship, duration, date);
        document.body.removeChild(certDiv);
    }
}

function downloadCertificateAsHTML(name, certId, internship, duration, date) {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Certificate - ${name}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f5f7fa; font-family: 'Georgia', serif; padding: 20px; }
                .certificate { max-width: 800px; width: 100%; background: white; padding: 40px; border: 20px solid #d4af37; border-radius: 20px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
                .certificate h1 { font-size: 2.5rem; color: #d4af37; text-transform: uppercase; letter-spacing: 5px; }
                .certificate h2 { font-size: 2.8rem; color: #2c3e50; margin: 20px 0; border-bottom: 2px dashed #d4af37; display: inline-block; padding-bottom: 10px; }
                .certificate .details { background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 20px auto; max-width: 400px; text-align: left; }
                .certificate .details div { padding: 5px 0; }
                .certificate .verified { display: inline-block; background: #27ae60; color: white; padding: 5px 20px; border-radius: 50px; font-weight: bold; }
                .certificate .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #d4af37; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
                .certificate .signature-line { width: 150px; height: 2px; background: #333; margin: 10px auto; }
                @media print { body { padding: 0; } .certificate { box-shadow: none; border: 20px solid #d4af37; } }
            </style>
        </head>
        <body>
            <div class="certificate">
                <div style="font-size: 4rem;">🎓</div>
                <h1>Certificate of Internship</h1>
                <p style="font-size: 1.2rem; color: #666; margin: 10px 0;">This certifies that</p>
                <h2>${name}</h2>
                <p style="font-size: 1.2rem; margin: 20px 0;">has successfully completed the</p>
                <h3 style="font-size: 1.8rem; color: #2c3e50;">${internship}</h3>
                <p style="font-size: 1.1rem; margin: 10px 0;">program at <strong>InternVerify</strong></p>
                <div class="verified">✅ Verified Certificate</div>
                <div class="details">
                    <div><strong>Certificate ID:</strong> ${certId}</div>
                    <div><strong>Duration:</strong> ${duration}</div>
                    <div><strong>Completion Date:</strong> ${date}</div>
                    <div><strong>Status:</strong> <span style="color: #27ae60; font-weight: bold;">Verified ✓</span></div>
                </div>
                <div style="margin: 15px 0;">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${certId}" alt="QR Code" style="border: 2px solid #d4af37; border-radius: 10px; padding: 5px;">
                </div>
                <div class="footer">
                    <div style="text-align: center;">
                        <div class="signature-line"></div>
                        <p><strong>Authorized Signatory</strong></p>
                        <p style="color: #999;">InternVerify</p>
                    </div>
                    <div style="text-align: center;">
                        <p><strong>Date of Issue</strong></p>
                        <p>${date}</p>
                    </div>
                </div>
                <div style="margin-top: 20px; font-size: 0.8rem; color: #999; border-top: 1px solid #eee; padding-top: 10px;">
                    This certificate is digitally verified. Scan the QR code to verify.
                </div>
            </div>
        </body>
        </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `Certificate-${name.replace(/\s/g, '_')}.html`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

// ===== AUTO-VERIFY FROM URL =====
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