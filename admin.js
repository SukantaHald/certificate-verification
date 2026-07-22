// ===== ADMIN FUNCTIONS =====
let adminData = [];

// Load data from localStorage or database
function loadAdminData() {
    const stored = localStorage.getItem('adminCertificates');
    if (stored) {
        adminData = JSON.parse(stored);
    } else {
        adminData = JSON.parse(JSON.stringify(database.certificates));
        localStorage.setItem('adminCertificates', JSON.stringify(adminData));
    }
    renderTable();
    updateStats();
}

// ===== LOGIN =====
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'sukanta' && password === '102030') {
        document.getElementById('loginOverlay').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
        localStorage.setItem('adminLoggedIn', 'true');
        loadAdminData();
    } else {
        alert('❌ Invalid username or password!');
    }
}

function logout() {
    document.getElementById('loginOverlay').style.display = 'flex';
    document.getElementById('adminContent').style.display = 'none';
    localStorage.removeItem('adminLoggedIn');
}

// ===== SAVE CERTIFICATE =====
function saveCertificate(event) {
    event.preventDefault();
    
    const editId = document.getElementById('editId').value;
    const certData = {
        id: document.getElementById('certIdInput').value.trim(),
        name: document.getElementById('nameInput').value.trim(),
        internship: document.getElementById('internshipInput').value.trim(),
        duration: document.getElementById('durationInput').value.trim(),
        completionDate: document.getElementById('dateInput').value.trim(),
        verified: true,
        certificateLink: document.getElementById('linkInput').value.trim()
    };
    
    if (!certData.id || !certData.name) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (editId) {
        const index = adminData.findIndex(c => c.id === editId);
        if (index !== -1) {
            adminData[index] = certData;
        }
    } else {
        if (adminData.find(c => c.id === certData.id)) {
            alert('Certificate ID already exists!');
            return;
        }
        adminData.push(certData);
    }
    
    saveToStorage();
    renderTable();
    updateStats();
    resetForm();
    updateMainDatabase();
}

// ===== DELETE CERTIFICATE =====
function deleteCertificate(id) {
    if (confirm(`Are you sure you want to delete certificate ${id}?`)) {
        adminData = adminData.filter(c => c.id !== id);
        saveToStorage();
        renderTable();
        updateStats();
        updateMainDatabase();
    }
}

// ===== EDIT CERTIFICATE =====
function editCertificate(id) {
    const cert = adminData.find(c => c.id === id);
    if (!cert) return;
    
    document.getElementById('editId').value = cert.id;
    document.getElementById('certIdInput').value = cert.id;
    document.getElementById('nameInput').value = cert.name;
    document.getElementById('internshipInput').value = cert.internship;
    document.getElementById('durationInput').value = cert.duration;
    document.getElementById('dateInput').value = cert.completionDate;
    document.getElementById('linkInput').value = cert.certificateLink;
    document.getElementById('formTitle').textContent = '✏️ Edit Certificate';
    document.getElementById('certIdInput').readOnly = true;
    
    document.querySelector('.admin-form').scrollIntoView({ behavior: 'smooth' });
}

// ===== RESET FORM =====
function resetForm() {
    document.getElementById('editId').value = '';
    document.getElementById('certIdInput').value = '';
    document.getElementById('certIdInput').readOnly = false;
    document.getElementById('nameInput').value = '';
    document.getElementById('internshipInput').value = '';
    document.getElementById('durationInput').value = '';
    document.getElementById('dateInput').value = '';
    document.getElementById('linkInput').value = '';
    document.getElementById('formTitle').textContent = '➕ Add New Certificate';
}

// ===== RENDER TABLE =====
function renderTable() {
    const container = document.getElementById('certList');
    
    if (adminData.length === 0) {
        container.innerHTML = `<p style="padding: 20px; text-align: center; color: #666;">No certificates found.</p>`;
        return;
    }
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Internship</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    adminData.forEach(cert => {
        html += `
            <tr>
                <td><strong>${cert.id}</strong></td>
                <td>${cert.name}</td>
                <td>${cert.internship}</td>
                <td>${cert.duration}</td>
                <td>${cert.completionDate}</td>
                <td>
                    <button onclick="editCertificate('${cert.id}')" style="padding: 4px 12px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; margin-right: 5px;">✏️</button>
                    <button onclick="deleteCertificate('${cert.id}')" style="padding: 4px 12px; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer;">🗑️</button>
                </td>
            </tr>
        `;
    });
    
    html += `</tbody></table>`;
    container.innerHTML = html;
}

// ===== UPDATE STATS =====
function updateStats() {
    document.getElementById('totalCerts').textContent = adminData.length;
    document.getElementById('verifiedCerts').textContent = adminData.filter(c => c.verified).length;
    
    const now = new Date();
    const expired = adminData.filter(c => {
        const date = new Date(c.completionDate);
        const diff = (now - date) / (1000 * 60 * 60 * 24 * 30);
        return diff > 6;
    });
    document.getElementById('expiredCerts').textContent = expired.length;
}

// ===== STORAGE FUNCTIONS =====
function saveToStorage() {
    localStorage.setItem('adminCertificates', JSON.stringify(adminData));
}

function updateMainDatabase() {
    const mainData = adminData.map(c => ({
        ...c,
        verified: true
    }));
    localStorage.setItem('certificatesData', JSON.stringify(mainData));
    // Update the global database variable
    if (typeof database !== 'undefined') {
        database.certificates = mainData;
    }
}

// ===== EXPORT DATA =====
function exportData() {
    const dataStr = JSON.stringify(adminData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'certificates_backup.json';
    a.click();
    URL.revokeObjectURL(url);
}

// ===== AUTO-LOGIN CHECK =====
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('loginOverlay').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
        loadAdminData();
    }
});