// ============================================================
// RUNS ON PAGE LOAD — fetch all saved files and render cards
// ============================================================

window.addEventListener('load', () => {
    loadFilesFromDB();
});

async function loadFilesFromDB() {
    try {
        console.log('1. Fetching files from backend...');

        const response = await fetch('http://192.168.137.1:5000/api/files');
        //                                              ^^^^
        //                                    your backend is on port 5000!

        console.log('2. Response status:', response.status);

        const data = await response.json();
        console.log('3. Data received:', data);

        if (data.length === 0) {
            console.log('4. No files in database');
            return;
        }

        data.forEach(file => {
            console.log('5. Creating card for:', file);
            createFileCard(file.fileName, file.file, file.date, file._id);
        });

    } catch (error) {
        console.error('FAILED AT:', error.message);
    }
}

loadFilesFromDB()

// ============================================================
// CREATE CARD — same structure as your folder card
// ============================================================

function createFileCard(name, url, dateStr) {
    const dateLabel = new Date(dateStr).toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        month: 'short',
        year: 'numeric'
    });

    const newItem = document.createElement('div');
    newItem.className = 'items';
    newItem.innerHTML = `
        <div class="pic"></div>
        <div class="name">${name}</div>
        <div class="date">${dateLabel}</div>
    `;

    // Click → open file preview
    newItem.addEventListener('click', () => {
        window.open(url, '_blank');
    });

    document.getElementById('foldersGrid').appendChild(newItem);
}

createFileCard()