fetch('/api/contacts')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('contactList');

        data.forEach(contact => {
            const li = document.createElement('li');
            li.textContent = `${contact.first} ${contact.last} - ${contact.email}`;
            list.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));