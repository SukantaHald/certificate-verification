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
        },
        {
            id: "INT-2024-004",
            name: "Sukanta Halder",
            internship: "Data Analytics Internship",
            duration: "2 Months",
            completionDate: "October 13, 2024",
            verified: true,
            certificateLink: "https://drive.google.com/file/d/1Tin2gET6LZ8LnAkshNZVPfXznTWLlie8/preview"
        },
        {
            id: "INT-2024-005",
            name: "Test Student",
            internship: "Test Internship",
            duration: "1 Month",
            completionDate: "July 21, 2024",
            verified: true,
            certificateLink: "https://drive.google.com/file/d/1Tin2gET6LZ8LnAkshNZVPfXznTWLlie8/preview"
        }
    ]
};

// ===== LANGUAGE FUNCTIONS =====
let currentLanguage = 'en';

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    updatePageLanguage(lang);
}

function updatePageLanguage(lang) {
    const t = languages[lang] || languages.en;
    
    // Update all elements with id
    const translations = {
        'navHome': t.home,
        'navVerify': t.verify,
        'navAbout': t.about,
        'heroTitle': t.heroTitle,
        'heroSubtitle': t.heroSubtitle,
        'verifyNowBtn': t.verifyNow,
        'learnMoreBtn': t.learnMore,
        'searchTitle': t.searchTitle,
        'searchBtn': t.searchBtn,
        'clearBtn': t.clearBtn,
        'verifyTitle': t.verifyTitle,
        'enterIdLabel': t.enterId,
        'verifyBtn': t.verifyBtn,
        'orLabel': t.or,
        'scanQRLabel': t.scanQR,
        'openScannerBtn': t.openScanner,
        'verifiedBadge': t.verified,
        'certIdLabel': t.certId,
        'internshipLabel': t.internship,
        'durationLabel': t.duration,
        'completionDateLabel': t.completionDate,
        'viewCertBtn': t.viewCert,
        'downloadCertBtn': t.downloadCert,
        'printCertBtn': t.printCert,
        'shareTitle': t.share,
        'aboutTitle': t.aboutTitle,
        'aboutText': t.aboutText,
        'secureLabel': t.secure,
        'secureText': t.secureText,
        'fastLabel': t.fast,
        'fastText': t.fastText,
        'qrLabel': t.qr,
        'qrText': t.qrText,
        'footerText': t.footer
    };
    
    for (const [id, text] of Object.entries(translations)) {
        const el = document.getElementById(id);
        if (el && text) {
            el.textContent = text;
        }
    }
    
    // Update placeholder
    const searchInput = document.getElementById('searchName');
    if (searchInput) {
        searchInput.placeholder = t.searchPlaceholder;
    }
    const certInput = document.getElementById('certificateId');
    if (certInput) {
        certInput.placeholder = t.enterIdPlaceholder;
    }
    
    // Update title
    if (t.title) {
        document.title = t.title;
    }
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    const select = document.getElementById('languageSelect');
    if (select) {
        select.value = savedLang;
    }
    updatePageLanguage(savedLang);
});

// ===== VERIFY CERTIFICATE =====
function verifyCertificate() {
    const input = document.getElementById('certificateId');
    const id = input.value.trim();
    
    if (!id) {
        const t = languages[currentLanguage] || languages.en;
        alert(t.searchPrompt || 'Please enter a certificate ID');
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
            const t = languages[currentLanguage] || languages.en;
            displayError(t.noCertificate || 'Certificate not found or not verified');
        }
    }, 1000);
}

// ===== DISPLAY RESULT =====
function displayResult(certificate) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="result-content">
            <div class="status-badge verified" id="verifiedBadge">✅ Verified</div>
            <h3>${certificate.name}</h3>
            <p><strong id="certIdLabel">Certificate ID:</strong> <span id="certId">${certificate.id}</span></p>
            <p><strong id="internshipLabel">Internship:</strong> <span id="internship">${certificate.internship}</span></p>
            <p><strong id="durationLabel">Duration:</strong> <span id="duration">${certificate.duration}</span></p>
            <p><strong id="completionDateLabel">Completion Date:</strong> <span id="completionDate">${certificate.completionDate}</span></p>
            <div class="certificate-link">
                <a href="${certificate.certificateLink}" target="_blank" class="btn-certificate" id="viewCertBtn">📄 View Full Certificate</a>
                <button onclick="downloadCertificate()" class="btn-download" id="downloadCertBtn">⬇️ Download Certificate</button>
                <button onclick="printCertificate()" class="btn-print" id="printCertBtn">🖨️ Print Certificate</button>
            </div>
            <div class="share-section" style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center;">
                <h4 style="margin-bottom: 15px; color: #333;" id="shareTitle">Share Your Verified Certificate</h4>
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
    
    // Apply current language
    updatePageLanguage(currentLanguage);
}

function displayError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="result-content">
            <div class="status-badge invalid" id="invalidBadge">❌ Invalid</div>
            <p style="color: #721c24;">${message}</p>
        </div>
    `;
    updatePageLanguage(currentLanguage);
}

// ===== SEARCH BY NAME =====
function searchByName() {
    const searchInput = document.getElementById('searchName');
    const query = searchInput.value.trim().toLowerCase();
    const t = languages[currentLanguage] || languages.en;
    
    if (!query) {
        alert(t.searchPrompt || 'Please enter a name to search.');
        return;
    }
    
    const results = database.certificates.filter(cert => 
        cert.name.toLowerCase().includes(query)
    );
    
    const resultsDiv = document.getElementById('searchResults');
    
    if (results.length === 0) {
        resultsDiv.innerHTML = `
            <div style="background: #f8d7da; padding: 20px; border-radius: 12px; color: #721c24; text-align: center;">
                <p>❌ ${t.noResults || 'No certificates found for'} "<strong>${query}</strong>"</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div style="background: #d4edda; padding: 15px; border-radius: 12px; margin-bottom: 15px;">
            <p style="color: #155724; font-weight: 600;">✅ ${(t.foundResults || 'Found {count} certificate(s) for').replace('{count}', results.length)} "<strong>${query}</strong>"</p>
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
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
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
    const certId = document.getElementById('certId')?.textContent || '';
    const t = languages[currentLanguage] || languages.en;
    
    if (!certId) {
        alert(t.noCertificate || 'No certificate to download. Please verify first.');
        return;
    }
    
    const certificate = database.certificates.find(cert => cert.id === certId);
    
    if (!certificate || !certificate.certificateLink) {
        alert('Certificate link not found. Please contact support.');
        return;
    }
    
    let driveLink = certificate.certificateLink;
    let downloadLink = '';
    
    const fileIdMatch = driveLink.match(/\/file\/d\/([^\/]+)/);
    if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
    } else if (driveLink.includes('id=')) {
        const idMatch = driveLink.match(/id=([^&]+)/);
        if (idMatch) {
            downloadLink = `https://drive.google.com/uc?export=download&id=${idMatch[1]}`;
        }
    } else if (driveLink.includes('export=download')) {
        downloadLink = driveLink;
    } else {
        downloadLink = driveLink;
    }
    
    if (downloadLink) {
        window.open(downloadLink, '_blank');
        showNotification(t.downloadStarted || '📥 Downloading your original certificate...');
    } else {
        alert('Could not generate download link. Please contact support.');
    }
}

// ===== PRINT CERTIFICATE =====
function printCertificate() {
    const certId = document.getElementById('certId')?.textContent || '';
    
    if (!certId) {
        alert('Please verify a certificate first.');
        return;
    }
    
    const certificate = database.certificates.find(cert => cert.id === certId);
    
    if (!certificate) {
        alert('Certificate not found.');
        return;
    }
    
    let driveLink = certificate.certificateLink;
    let fileId = '';
    const fileIdMatch = driveLink.match(/\/file\/d\/([^\/]+)/);
    if (fileIdMatch) {
        fileId = fileIdMatch[1];
    } else if (driveLink.includes('id=')) {
        const idMatch = driveLink.match(/id=([^&]+)/);
        if (idMatch) {
            fileId = idMatch[1];
        }
    }
    
    if (fileId) {
        const printUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        window.open(printUrl, '_blank');
        showNotification('🖨️ Opening your certificate for printing...');
    } else {
        window.open(driveLink, '_blank');
        showNotification('🖨️ Opening your certificate for printing...');
    }
}

// ===== NOTIFICATION =====
function showNotification(message) {
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 16px 30px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 1rem;
        box-shadow: 0 8px 30px rgba(39, 174, 96, 0.4);
        z-index: 9999;
        animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        border: 1px solid rgba(255,255,255,0.2);
        backdrop-filter: blur(10px);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 4000);
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