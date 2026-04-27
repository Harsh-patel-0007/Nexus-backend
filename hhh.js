async function uploadFolder() {
    const folderNameInput = document.getElementById('folder_name');

    const folderName = folderNameInput.value.trim();

    
    if (folderName === '') {
        alert('Please enter a folder name!');
        return;
    }

    const createbtn = document.getElementById('createbtn');
    createbtn.disabled = true;
    createbtn.textContent = 'creating...';

    try{
        const response = await fetch('http://192.168.137.1:5000/folder',{
            method:'POST',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({folderName})
        })

        const data = await response.json();

        if (response.ok) {
            // ✅ Success
            console.log('Upload successful:', data);
            alert(`File "${fileName}" uploaded successfully!`);

            // Optional: reset the form after success
            folderNameInput.value = '';
        }
        else{
            onsole.error('Upload failed:', data);
            alert(`Upload failed: ${data.message || 'Unknown error from server'}`);
        }
    }
    catch(error){
        console.error('Network error:', error);
        alert('Could not reach the server. Make sure your backend is running.');
    }

    finally{
        createbtn.disabled = false;
        createbtn.textContent = 'Create';
    }
}

window.addEventListener('load', () => {
    loadFoldersFromDB();
});

async function loadFoldersFromDB() {
    try {
        const response = await fetch('http://192.168.137.1:5000/folder'); // ← your backend IP:port
        const data = await response.json();

        data.forEach(folder => {
            createFolderCard(folder.folderName, folder.date);
        });

    } catch (error) {
        console.error('Could not load folders:', error);
    }
}

function createFolderCard(name,folderId, dateStr) {
    const dateLabel = new Date(dateStr).toLocaleDateString('en-US', {
        timeZone: 'Asia/Kolkata',
        month: 'short',
        year: 'numeric',
        day: 'numeric'
    });

    const newItem = document.createElement('div');
    newItem.className = 'items';
    newItem.innerHTML = `
        <div class="pic">folder</div>
        <div class="name">${name}</div>
        <div class="date">${dateLabel}</div>
    `;

    // Click → open file preview
    newItem.addEventListener('click', () => {
       openFolder(folderId, 'name');
    });

    document.getElementById('foldersGrid').appendChild(newItem);
}