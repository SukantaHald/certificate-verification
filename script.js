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
            certificateLink: "NOT AVAILABLE"
        },
        {
            id: "INT-2024-003",
            name: "Mike Johnson",
            internship: "UI/UX Design Intern",
            duration: "4 months",
            completionDate: "October 20, 2024",
            verified: true,
            certificateLink: "NOT AVILABLE"
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

// ===== DOWNLOAD CERTIFICATE (Direct from Google Drive) =====
function downloadCertificate() {
    // Get the current certificate data
    const certId = document.getElementById('certId')?.textContent || '';
    
    if (!certId) {
        alert('No certificate to download. Please verify first.');
        return;
    }
    
    // Find the certificate in the database
    const certificate = database.certificates.find(cert => cert.id === certId);
    
    if (!certificate || !certificate.certificateLink) {
        alert('Certificate link not found.');
        return;
    }
    
    // Get the Google Drive link
    let driveLink = certificate.certificateLink;
    
    // Convert preview link to download link
    // Example: https://drive.google.com/file/d/XXXXX/preview
    // becomes: https://drive.google.com/uc?export=download&id=XXXXX
    const fileIdMatch = driveLink.match(/\/file\/d\/([^\/]+)/);
    if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        driveLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
    } else {
        // If it's already a download link, use it as is
        // If it's a view link, try to convert it
        if (driveLink.includes('view')) {
            const idMatch = driveLink.match(/id=([^&]+)/);
            if (idMatch) {
                driveLink = `https://drive.google.com/uc?export=download&id=${idMatch[1]}`;
            }
        }
    }
    
    // Open the download link in a new tab
    window.open(driveLink, '_blank');
    
    // Show a message
    showNotification('📥 Downloading your certificate...');
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
// ===== SHOW NOTIFICATION =====
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.5s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}
// ========================================
// DARK MODE FUNCTIONALITY
// ========================================

// Check for saved dark mode preference
function checkDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');
    const toggle = document.getElementById('darkModeToggle');
    
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        if (toggle) {
            toggle.querySelector('.dark-mode-icon').textContent = '☀️';
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (toggle) {
            toggle.querySelector('.dark-mode-icon').textContent = '🌙';
        }
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const icon = toggle.querySelector('.dark-mode-icon');
    
    if (document.body.classList.contains('dark-mode')) {
        // Switch to light mode
        document.body.classList.remove('dark-mode');
        icon.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled');
    } else {
        // Switch to dark mode
        document.body.classList.add('dark-mode');
        icon.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled');
    }
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', function() {
    checkDarkModePreference();
    
    // Add keyboard shortcut (Ctrl+Shift+D) for dark mode
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
            e.preventDefault();
            toggleDarkMode();
        }
    });
});

// Also update the logo animation in dark mode
function updateLogoForDarkMode() {
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        if (document.body.classList.contains('dark-mode')) {
            logoText.style.setProperty('--gradient-color1', '#8a9cf0');
            logoText.style.setProperty('--gradient-color2', '#9b6fc0');
        } else {
            logoText.style.setProperty('--gradient-color1', '#667eea');
            logoText.style.setProperty('--gradient-color2', '#764ba2');
        }
    }
}
// ===== SEARCH BY NAME =====
function searchByName() {
    const searchInput = document.getElementById('searchName');
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        alert('Please enter a name to search.');
        return;
    }
    
    const results = database.certificates.filter(cert => 
        cert.name.toLowerCase().includes(query)
    );
    
    const resultsDiv = document.getElementById('searchResults');
    
    if (results.length === 0) {
        resultsDiv.innerHTML = `
            <div style="background: #f8d7da; padding: 20px; border-radius: 12px; color: #721c24; text-align: center;">
                <p>❌ No certificates found for "<strong>${query}</strong>"</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div style="background: #d4edda; padding: 15px; border-radius: 12px; margin-bottom: 15px;">
            <p style="color: #155724; font-weight: 600;">✅ Found ${results.length} certificate(s) for "<strong>${query}</strong>"</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
    `;
    
    results.forEach(cert => {
        html += `
            <div style="background: white; padding: 15px 20px; border-radius: 12px; border-left: 4px solid #27ae60; box-shadow: 0 2px 10px rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div>
                    <strong style="font-size: 1.1rem;">${cert.name}</strong>
                    <p style="margin: 2px 0; color: #666; font-size: 0.9rem;">ID: ${cert.id} | ${cert.internship}</p>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button onclick="viewCertificate('${cert.id}')" style="padding: 6px 16px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">Verify</button>
                    <span style="background: #27ae60; color: white; padding: 4px 12px; border-radius: 50px; font-size: 0.8rem;">✅ Verified</span>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    resultsDiv.innerHTML = html;
}

function viewCertificate(certId) {
    document.getElementById('certificateId').value = certId;
    verifyCertificate();
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}

function clearSearch() {
    document.getElementById('searchName').value = '';
    document.getElementById('searchResults').innerHTML = '';
}
// ===== PRINT CERTIFICATE =====
function printCertificate() {
    const certId = document.getElementById('certId')?.textContent || '';
    const name = document.querySelector('#result h3')?.textContent || '';
    
    if (!certId || !name) {
        alert('Please verify a certificate first.');
        return;
    }
    
    // Get the certificate data
    const certificate = database.certificates.find(cert => cert.id === certId);
    if (!certificate) {
        alert('Certificate not found.');
        return;
    }
    
    // Create print-friendly version
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Certificate - ${certificate.name}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: white;
                    font-family: 'Georgia', serif;
                    padding: 20px;
                }
                .certificate-print {
                    max-width: 800px;
                    width: 100%;
                    background: white;
                    padding: 40px;
                    border: 20px solid #d4af37;
                    border-radius: 20px;
                    text-align: center;
                }
                .certificate-print h1 { font-size: 2.5rem; color: #d4af37; text-transform: uppercase; letter-spacing: 5px; }
                .certificate-print h2 { font-size: 2.8rem; color: #2c3e50; margin: 20px 0; border-bottom: 2px dashed #d4af37; display: inline-block; padding-bottom: 10px; }
                .certificate-print .details { background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 20px auto; max-width: 400px; text-align: left; }
                .certificate-print .details div { padding: 5px 0; }
                .certificate-print .verified { display: inline-block; background: #27ae60; color: white; padding: 5px 20px; border-radius: 50px; font-weight: bold; }
                .certificate-print .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #d4af37; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
                .certificate-print .signature-line { width: 150px; height: 2px; background: #333; margin: 10px auto; }
                @media print {
                    body { padding: 0; }
                    .certificate-print { box-shadow: none; border: 20px solid #d4af37; }
                    .no-print { display: none !important; }
                }
            </style>
        </head>
        <body>
            <div class="certificate-print" id="printArea">
                <div style="font-size: 4rem;">🎓</div>
                <h1>Certificate of Internship</h1>
                <p style="font-size: 1.2rem; color: #666; margin: 10px 0;">This certifies that</p>
                <h2>${certificate.name}</h2>
                <p style="font-size: 1.2rem; margin: 20px 0;">has successfully completed the</p>
                <h3 style="font-size: 1.8rem; color: #2c3e50;">${certificate.internship}</h3>
                <p style="font-size: 1.1rem; margin: 10px 0;">program at <strong>InternVerify</strong></p>
                <div class="verified">✅ Verified Certificate</div>
                <div class="details">
                    <div><strong>Certificate ID:</strong> ${certificate.id}</div>
                    <div><strong>Duration:</strong> ${certificate.duration}</div>
                    <div><strong>Completion Date:</strong> ${certificate.completionDate}</div>
                    <div><strong>Status:</strong> <span style="color: #27ae60; font-weight: bold;">Verified ✓</span></div>
                </div>
                <div style="margin: 15px 0;">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${certificate.id}" alt="QR Code" style="border: 2px solid #d4af37; border-radius: 10px; padding: 5px;">
                </div>
                <div class="footer">
                    <div style="text-align: center;">
                        <div class="signature-line"></div>
                        <p><strong>Authorized Signatory</strong></p>
                        <p style="color: #999;">InternVerify</p>
                    </div>
                    <div style="text-align: center;">
                        <p><strong>Date of Issue</strong></p>
                        <p>${certificate.completionDate}</p>
                    </div>
                </div>
                <div style="margin-top: 20px; font-size: 0.8rem; color: #999; border-top: 1px solid #eee; padding-top: 10px;">
                    This certificate is digitally verified. Scan the QR code to verify.
                </div>
                <div class="no-print" style="margin-top: 20px;">
                    <button onclick="window.print()" style="padding: 12px 30px; background: #2d3436; color: white; border: none; border-radius: 10px; font-size: 1rem; cursor: pointer;">🖨️ Print</button>
                    <button onclick="window.close()" style="padding: 12px 30px; background: #e74c3c; color: white; border: none; border-radius: 10px; font-size: 1rem; cursor: pointer; margin-left: 10px;">Close</button>
                </div>
            </div>
        </body>
        </html>
    `;
    
    // Open in new window
    const win = window.open('', '_blank', 'width=800,height=900');
    win.document.write(printContent);
    win.document.close();
}
// ===== MULTI-LANGUAGE FUNCTIONS =====
let currentLanguage = 'en';

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    updatePageLanguage(lang);
}

function updatePageLanguage(lang) {
    const t = languages[lang] || languages.en;
    
    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
    
    // Update placeholder texts
    document.querySelectorAll('[data-placeholder-lang]').forEach(el => {
        const key = el.getAttribute('data-placeholder-lang');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });
    
    // Update title
    if (t.title) {
        document.title = t.title;
    }
    
    // Update specific elements by ID
    updateElementById('heroTitle', t.heroTitle);
    updateElementById('heroSubtitle', t.heroSubtitle);
    updateElementById('verifySectionTitle', t.certificateVerification);
    updateElementById('aboutSectionTitle', t.aboutSystem);
    updateElementById('aboutText', t.aboutText);
    updateElementById('footerText', t.footer);
}

function updateElementById(id, text) {
    const el = document.getElementById(id);
    if (el && text) {
        el.textContent = text;
    }
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    document.getElementById('languageSelect').value = savedLang;
    changeLanguage(savedLang);
});