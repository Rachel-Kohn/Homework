const express = require('express');
const router = express.Router();

let contacts = [
  {
    id: 1,
    first: 'Donald',
    last: 'Trump',
    phone: '1234567890',
    email: 'dtrump@whitehouse.gov'
  },
  {
    id: 2,
    first: 'JD',
    last: 'Vance',
    phone: '9876543210',
    email: 'jd@whitehouse.gov'
  }
];

router.get('/', (req, res) => {
  res.render('layout', {
    title: 'Contact List',
    contacts,
    noContacts: !contacts.length,
    partials: { content: 'index.hjs' }
  });
});

router.get('/addContact', (req, res) => {
  res.render('layout', {
    title: 'Add Contact',
    contact: {},
    formAction: '/addContact',
    partials: { content: 'addContact.hjs' }
  });
});

router.post('/addContact', (req, res) => {
  const newContact = {
    id: contacts.length ? contacts[contacts.length - 1].id + 1 : 1,
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    phone: req.body.phone
  };

  contacts.push(newContact);
  res.redirect('/');
});

router.post('/deleteContact/:id', (req, res) => {
  contacts = contacts.filter(c => c.id !== Number(req.params.id));
  res.redirect('/');
});

router.get('/editContact/:id', (req, res) => {
  const contact = contacts.find(c => c.id === Number(req.params.id));

  res.render('layout', {
    title: 'Edit Contact',
    contact,
    formAction: '/editContact',
    partials: { content: 'addContact.hjs' }
  });
});

router.post('/editContact', (req, res) => {
  const contact = contacts.find(c => c.id === Number(req.body.id));

  if (contact) {
    contact.first = req.body.first;
    contact.last = req.body.last;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
  }

  res.redirect('/');
});


// =========================
// API ROUTES
// =========================

// Get ONE contact by ID (must come first)
router.get('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id);

  const contact = contacts.find(c => c.id === id);

  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  res.json(contact);
});

// Get ALL contacts
router.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

module.exports = router;