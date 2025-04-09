// Mock Data (Replace with Firebase later)
const sessions = [
    { id: 1, title: "Beginner Ride", date: "2025-05-10", instructor: "John Doe", difficulty: "Short" },
    { id: 2, title: "Intermediate Ride", date: "2025-05-15", instructor: "Jane Smith", difficulty: "Medium" },
    { id: 3, title: "Advanced Trail Adventure", date: "2025-05-20", instructor: "Chris Evans", difficulty: "High" },
    { id: 4, title: "Sunset City Cruise", date: "2025-05-25", instructor: "Emily Johnson", difficulty: "Short" },
    { id: 5, title: "Weekend Mountain Ride", date: "2025-05-30", instructor: "Liam Brown", difficulty: "Medium" }  ];
  
  // Create Session Modal
const createSessionModal = new bootstrap.Modal('#createSessionModal');

// Open Modal
document.getElementById('createSessionBtn').addEventListener('click', () => {
  if (!currentUser) {
    alert("Please login to create a session.");
    return;
  }
  createSessionModal.show();
});

// Handle Create Session Form
document.getElementById('createSessionForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const newSession = {
    id: sessions.length + 1,
    title: formData.get('title'),
    date: formData.get('date'),
    instructor: formData.get('instructor'),
    difficulty: formData.get('difficulty'),
  };

  sessions.push(newSession);
  renderSessions();
  createSessionModal.hide();
  e.target.reset(); // clear form
  alert("Session added successfully!");
});

  let currentUser = null;
  
  // DOM Loaded
  document.addEventListener('DOMContentLoaded', () => {
    renderSessions();
    setupLoginButtons();
  });
  
  // Render Sessions
  function renderSessions() {
    const container = document.getElementById('sessionsContainer');
    container.innerHTML = sessions.map(session => `
      <div class="col-md-4 mb-4">
        <div class="card session-card" style="background-color:rgba(215, 223, 255, 0.25);">
          <div class="card-body">
            <h5 class="card-title">${session.title}</h5>
            <p class="card-text">
              <strong>Date:</strong> ${session.date}<br>
              <strong>Instructor:</strong> ${session.instructor}<br>
              <strong>Level:</strong> ${session.difficulty}
            </p>
            <button class="btn btn-primary btn-sm book-btn" data-id="${session.id}">Book Now</button>
          </div>
        </div>
      </div>
    `).join('');
  
    // Add event listeners to booking buttons
    document.querySelectorAll('.book-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (!currentUser) alert("Please login to book!");
        else bookSession(e.target.dataset.id);
      });
    });
  }
  
  // Simulate Login (Replace with Firebase Auth later)
  function setupLoginButtons() {
    document.getElementById('loginBtn').addEventListener('click', () => {
      loginModal.show(); // just show modal
    });
  
    document.getElementById('logoutBtn').addEventListener('click', () => {
      currentUser = null;
      updateAuthUI(); // use unified function
      alert('Logged out');
    });
  }
  
  function toggleAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutLi = document.getElementById('logoutLi');
    const leaderSection = document.getElementById('leaderSection');
  
    if (currentUser) {
      loginBtn.classList.add('d-none');
      registerBtn.classList.add('d-none'); // HIDE register
      logoutLi.classList.remove('d-none');
      if (currentUser.role === 'leader') leaderSection.classList.remove('d-none');
    } else {
      loginBtn.classList.remove('d-none');
      registerBtn.classList.remove('d-none'); // SHOW register
      logoutLi.classList.add('d-none');
      leaderSection.classList.add('d-none');
    }
  }

  // Book a Session (Mock Function)
  function bookSession(sessionId) {
    alert(`Booked session #${sessionId}!`);
  }

// Login Form Handler
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  
  currentUser = { 
    email: email,
    role: 'leader' // Default role
  };
  
  updateAuthUI();
  bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
  alert(`Logged in as ${email}`);
});

// Register Form Handler
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  const name = e.target.querySelector('input[type="text"]').value;
  
  currentUser = {
    email: email,
    name: name,
    role: 'leader'
  };
  
  updateAuthUI();
  bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
  alert(`Registered and logged in as ${name}`);
});

// Update UI based on login state
function updateAuthUI() {
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const logoutLi = document.getElementById('logoutLi');
  const leaderSection = document.getElementById('leaderSection');

  if (currentUser) {
    loginBtn.classList.add('d-none');
    registerBtn.classList.add('d-none');
    logoutBtn?.classList.remove('d-none');
    logoutLi?.classList.remove('d-none');
    if (currentUser.role === 'leader') {
      leaderSection?.classList.remove('d-none');
    }
  } else {
    loginBtn.classList.remove('d-none');
    registerBtn.classList.remove('d-none');
    logoutBtn?.classList.add('d-none');
    logoutLi?.classList.add('d-none');
    leaderSection?.classList.add('d-none');
  }
}

document.getElementById('loginBtn').addEventListener('click', () => loginModal.show());
function setupLoginButtons() {
  document.getElementById('loginBtn').addEventListener('click', () => {
    loginModal.show(); // just open modal, no auth yet
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    currentUser = null;
    toggleAuthUI();
    alert('Logged out');
  });
}
document.getElementById('loginBtn').addEventListener('click', () => loginModal.show());

// Initialize modals
const loginModal = new bootstrap.Modal('#loginModal');
const registerModal = new bootstrap.Modal('#registerModal');

document.getElementById('loginBtn').addEventListener('click', () => loginModal.show());
document.getElementById('registerBtn').addEventListener('click', () => registerModal.show());

