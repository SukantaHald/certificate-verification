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
// ========================================
// THEME COLOR SWITCHER
// ========================================

const themes = {
    default: {
        '--gradient-start': '#667eea',
        '--gradient-end': '#764ba2',
        '--primary-light': '#f093fb',
        '--shadow-hover': 'rgba(102, 126, 234, 0.15)',
        '--hero-bg': 'linear-gradient(135deg, #667eea, #764ba2)',
        '--footer-bg': '#2d3436',
        '--footer-text': 'white',
        '--bg-light': '#f5f7fa',
        '--bg-dark': '#c3cfe2',
        '--text-color': '#2d3436',
        '--text-light': '#555',
        '--card-bg': 'white'
    },
    blue: {
        '--gradient-start': '#2193b0',
        '--gradient-end': '#6dd5ed',
        '--primary-light': '#a8e6cf',
        '--shadow-hover': 'rgba(33, 147, 176, 0.15)',
        '--hero-bg': 'linear-gradient(135deg, #2193b0, #6dd5ed)',
        '--footer-bg': '#1a5276',
        '--footer-text': '#eaf2f8',
        '--bg-light': '#eaf2f8',
        '--bg-dark': '#d4e6f1',
        '--text-color': '#1a5276',
        '--text-light': '#2c3e50',
        '--card-bg': '#f8f9fa'
    },
    purple: {
        '--gradient-start': '#8e44ad',
        '--gradient-end': '#c39bd3',
        '--primary-light': '#d7bde2',
        '--shadow-hover': 'rgba(142, 68, 173, 0.15)',
        '--hero-bg': 'linear-gradient(135deg, #8e44ad, #c39bd3)',
        '--footer-bg': '#4a235a',
        '--footer-text': '#f4ecf7',
        '--bg-light': '#f4ecf7',
        '--bg-dark': '#e8daef',
        '--text-color': '#4a235a',
        '--text-light': '#6c3483',
        '--card-bg': '#fcf9fe'
    },
    green: {
        '--gradient-start': '#27ae60',
        '--gradient-end': '#82e0aa',
        '--primary-light': '#a9dfbf',
        '--shadow-hover': 'rgba(39, 174, 96, 0.15)',
        '--hero-bg': 'linear-gradient(135deg, #27ae60, #82e0aa)',
        '--footer-bg': '#1e8449',
        '--footer-text': '#eafaf1',
        '--bg-light': '#eafaf1',
        '--bg-dark': '#d5f5e3',
        '--text-color': '#1e8449',
        '--text-light': '#27ae60',
        '--card-bg': '#fafffe'
    },
    orange: {
        '--gradient-start': '#e67e22',
        '--gradient-end': '#f5b041',
        '--primary-light': '#fad7a0',
        '--shadow-hover': 'rgba(230, 126, 34, 0.15)',
        '--hero-bg': 'linear-gradient(135deg, #e67e22, #f5b041)',
        '--footer-bg': '#a04000',
        '--footer-text': '#fef9e7',
        '--bg-light': '#fef9e7',
        '--bg-dark': '#fdebd0',
        '--text-color': '#a04000',
        '--text-light': '#ca6f1e',
        '--card-bg': '#fffdfa'
    },
    red: {
        '--gradient-start': '#e74c3c',
        '--gradient-end': '#f1948a',
        '--primary-light': '#f5b7b1',
        '--shadow-hover': 'rgba(231, 76, 60, 0.15)',
        '--hero-bg': 'linear-gradient(135deg, #e74c3c, #f1948a)',
        '--footer-bg': '#78281f',
        '--footer-text': '#fdedec',
        '--bg-light': '#fdedec',
        '--bg-dark': '#fadbd8',
        '--text-color': '#78281f',
        '--text-light': '#943126',
        '--card-bg': '#fffefe'
    },
    pink: {
        '--gradient-start': '#e84393',
        '--gradient-end': '#fd79a8',
        '--primary-light': '#f8a5c2',
        '--shadow-hover': 'rgba(232, 67, 147, 0.15)',
        '--hero-bg': 'linear-gradient(135deg, #e84393, #fd79a8)',
        '--footer-bg': '#6c2e5a',
        '--footer-text': '#fce4ec',
        '--bg-light': '#fce4ec',
        '--bg-dark': '#f8bbd0',
        '--text-color': '#6c2e5a',
        '--text-light': '#880e4f',
        '--card-bg': '#fff8fa'
    },
    dark: {
        '--gradient-start': '#2c3e50',
        '--gradient-end': '#34495e',
        '--primary-light': '#5d6d7e',
        '--shadow-hover': 'rgba(44, 62, 80, 0.3)',
        '--hero-bg': 'linear-gradient(135deg, #1a1a2e, #2c3e50)',
        '--footer-bg': '#0d0d0d',
        '--footer-text': '#bdc3c7',
        '--bg-light': '#1a1a2e',
        '--bg-dark': '#2c3e50',
        '--text-color': '#ecf0f1',
        '--text-light': '#bdc3c7',
        '--card-bg': '#2d2d44',
        '--navbar-bg': 'rgba(26, 26, 46, 0.9)',
        '--navbar-border': 'rgba(255,255,255,0.1)',
        '--border-color': '#3d3d5c'
    },
    neon: {
        '--gradient-start': '#00ff87',
        '--gradient-end': '#60efff',
        '--primary-light': '#a8ffd6',
        '--shadow-hover': 'rgba(0, 255, 135, 0.2)',
        '--hero-bg': 'linear-gradient(135deg, #0a0a23, #1a1a4e)',
        '--footer-bg': '#0a0a23',
        '--footer-text': '#00ff87',
        '--bg-light': '#0a0a23',
        '--bg-dark': '#1a1a4e',
        '--text-color': '#00ff87',
        '--text-light': '#60efff',
        '--card-bg': '#0f0f2d',
        '--navbar-bg': 'rgba(10, 10, 35, 0.9)',
        '--navbar-border': 'rgba(0, 255, 135, 0.2)',
        '--border-color': 'rgba(0, 255, 135, 0.2)'
    }
};

function changeTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    const root = document.documentElement;
    
    // Apply all CSS variables from the theme
    Object.keys(theme).forEach(key => {
        root.style.setProperty(key, theme[key]);
    });
    
    // Save preference
    localStorage.setItem('preferredTheme', themeName);
    
    // Show notification
    showNotification(`🎨 Theme changed to ${themeName.charAt(0).toUpperCase() + themeName.slice(1)}`);
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('preferredTheme') || 'default';
    const select = document.getElementById('themeSelect');
    if (select) {
        select.value = savedTheme;
    }
    changeTheme(savedTheme);
});

// Override showNotification to use theme colors
const originalShowNotification = showNotification;
showNotification = function(message) {
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        color: white;
        padding: 16px 30px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 1rem;
        box-shadow: 0 8px 30px var(--shadow-hover);
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
    }, 3000);
};