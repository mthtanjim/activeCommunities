// Mock Data (Replace with Firebase later)
const sessions = [
    { id: 1, title: "Beginner Ride", date: "2025-05-10", instructor: "John Doe", difficulty: "Short" },
    { id: 2, title: "Intermediate Ride", date: "2025-05-15", instructor: "Jane Smith", difficulty: "Medium" },
    { id: 3, title: "Advanced Trail Adventure", date: "2025-05-20", instructor: "Chris Evans", difficulty: "High" },
    { id: 4, title: "Sunset City Cruise", date: "2025-05-25", instructor: "Emily Johnson", difficulty: "Short" },
    { id: 5, title: "Weekend Mountain Ride", date: "2025-05-30", instructor: "Liam Brown", difficulty: "Medium" },
    { id: 6, title: "Early Bird Challenge", date: "2025-06-05", instructor: "Olivia Davis", difficulty: "High" }
  ];
  
  
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
        <div class="card session-card">
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
      currentUser = { role: 'user' }; // Mock user
      toggleAuthUI();
    });
  
    document.getElementById('logoutBtn').addEventListener('click', () => {
      currentUser = null;
      toggleAuthUI();
    });
  }
  
  // Toggle UI based on login state
  function toggleAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutLi = document.getElementById('logoutLi');
    const leaderSection = document.getElementById('leaderSection');
  
    if (currentUser) {
      loginBtn.classList.add('d-none');
      logoutLi.classList.remove('d-none');
      if (currentUser.role === 'leader') leaderSection.classList.remove('d-none');
    } else {
      loginBtn.classList.remove('d-none');
      logoutLi.classList.add('d-none');
      leaderSection.classList.add('d-none');
    }
  }
  
  // Book a Session (Mock Function)
  function bookSession(sessionId) {
    alert(`Booked session #${sessionId}!`);
  }