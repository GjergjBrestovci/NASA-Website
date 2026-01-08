// API Configuration
const API_BASE = 'http://localhost:8787';

// State
let scheduleItems = [];
let editingEventId = null;
let deletingEventId = null;

// DOM Elements
const scheduleList = document.getElementById('scheduleList');
const loadingState = document.getElementById('loadingState');
const emptyState = document.getElementById('emptyState');
const userEmail = document.getElementById('userEmail');
const toastContainer = document.getElementById('toastContainer');

// Modals
const eventModal = document.getElementById('eventModal');
const deleteModal = document.getElementById('deleteModal');

// Buttons
const addEventBtn = document.getElementById('addEventBtn');
const logoutBtn = document.getElementById('logoutBtn');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');
const cancelBtn = document.getElementById('cancelBtn');
const deleteBackdrop = document.getElementById('deleteBackdrop');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

// Form
const eventForm = document.getElementById('eventForm');
const modalTitle = document.getElementById('modalTitle');

// Auth token
function getToken() {
  return localStorage.getItem('teacher_token');
}

function getEmail() {
  return localStorage.getItem('teacher_email');
}

// Check authentication
function checkAuth() {
  const token = getToken();
  if (!token) {
    window.location.href = '/';
    return false;
  }
  
  const email = getEmail();
  if (email) {
    userEmail.textContent = email;
  }
  return true;
}

// Initialize starfield
function createStarfield() {
  const starfield = document.getElementById('starfield');
  const starCount = 60;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 2 + 1}px`;
    star.style.height = star.style.width;
    star.style.animationDelay = `${Math.random() * 3}s`;
    starfield.appendChild(star);
  }
}

// Toast notifications
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__icon">${type === 'success' ? '✓' : '✕'}</span>
    <span class="toast__message">${message}</span>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// API calls
async function fetchSchedule() {
  try {
    const response = await fetch(`${API_BASE}/api/schedule`);
    if (!response.ok) throw new Error('Failed to fetch schedule');
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Fetch error:', error);
    showToast('Failed to load schedule', 'error');
    return [];
  }
}

async function saveSchedule(items) {
  const token = getToken();
  try {
    const response = await fetch(`${API_BASE}/api/schedule`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to save schedule');
    }

    const data = await response.json();
    return data.items || items;
  } catch (error) {
    console.error('Save error:', error);
    showToast(error.message, 'error');
    return null;
  }
}

// Render schedule list
function renderSchedule() {
  loadingState.style.display = 'none';

  if (scheduleItems.length === 0) {
    emptyState.style.display = 'flex';
    scheduleList.innerHTML = '';
    return;
  }

  emptyState.style.display = 'none';
  
  scheduleList.innerHTML = scheduleItems.map((item, index) => `
    <div class="schedule-item" data-id="${item.id}" data-index="${index}">
      <div class="schedule-item__handle" title="Drag to reorder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="4" y1="8" x2="20" y2="8"/>
          <line x1="4" y1="16" x2="20" y2="16"/>
        </svg>
      </div>
      <div class="schedule-item__content">
        <div class="schedule-item__header">
          <span class="schedule-item__title">${escapeHtml(item.title)}</span>
          <span class="schedule-item__status ${item.status}">${item.status}</span>
        </div>
        <span class="schedule-item__slot">${escapeHtml(item.slot)}</span>
        <p class="schedule-item__focus">${escapeHtml(item.focus)}</p>
      </div>
      <div class="schedule-item__actions">
        <button class="btn btn--icon edit-btn" title="Edit" data-id="${item.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button class="btn btn--icon danger delete-btn" title="Delete" data-id="${item.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');

  // Attach event listeners
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(btn.dataset.id));
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => openDeleteModal(btn.dataset.id));
  });
}

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Modal functions
function openAddModal() {
  editingEventId = null;
  modalTitle.textContent = 'Add New Event';
  eventForm.reset();
  setStatusValue('upcoming');
  eventModal.classList.add('active');
}

function openEditModal(id) {
  const item = scheduleItems.find(i => i.id === id);
  if (!item) return;

  editingEventId = id;
  modalTitle.textContent = 'Edit Event';
  
  document.getElementById('eventId').value = item.id;
  document.getElementById('eventTitle').value = item.title;
  document.getElementById('eventSlot').value = item.slot;
  document.getElementById('eventFocus').value = item.focus;
  setStatusValue(item.status);
  
  eventModal.classList.add('active');
}

function closeEventModal() {
  eventModal.classList.remove('active');
  editingEventId = null;
  eventForm.reset();
  setStatusValue('upcoming');
}

function openDeleteModal(id) {
  const item = scheduleItems.find(i => i.id === id);
  if (!item) return;

  deletingEventId = id;
  document.getElementById('deleteEventTitle').textContent = item.title;
  deleteModal.classList.add('active');
}

function closeDeleteModal() {
  deleteModal.classList.remove('active');
  deletingEventId = null;
}

// Form submission
async function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(eventForm);
  const eventData = {
    title: formData.get('title').trim(),
    slot: formData.get('slot').trim(),
    focus: formData.get('focus').trim(),
    status: formData.get('status'),
  };

  if (editingEventId) {
    // Update existing item
    const index = scheduleItems.findIndex(i => i.id === editingEventId);
    if (index !== -1) {
      scheduleItems[index] = { ...scheduleItems[index], ...eventData };
    }
  } else {
    // Add new item
    eventData.position = scheduleItems.length;
    scheduleItems.push(eventData);
  }

  const saved = await saveSchedule(scheduleItems);
  if (saved) {
    scheduleItems = saved;
    renderSchedule();
    showToast(editingEventId ? 'Event updated successfully' : 'Event added successfully');
    closeEventModal();
  }
}

// Delete event
async function handleDelete() {
  if (!deletingEventId) return;

  scheduleItems = scheduleItems.filter(i => i.id !== deletingEventId);
  
  // Update positions
  scheduleItems.forEach((item, index) => {
    item.position = index;
  });

  const saved = await saveSchedule(scheduleItems);
  if (saved) {
    scheduleItems = saved;
    renderSchedule();
    showToast('Event deleted successfully');
    closeDeleteModal();
  }
}

// Logout
function handleLogout() {
  localStorage.removeItem('teacher_token');
  localStorage.removeItem('teacher_email');
  window.location.href = '/';
}

// Status selector
function initStatusSelector() {
  const statusSelector = document.getElementById('statusSelector');
  const statusInput = document.getElementById('eventStatus');
  const statusOptions = statusSelector.querySelectorAll('.status-option');

  statusOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Remove active from all
      statusOptions.forEach(opt => opt.classList.remove('active'));
      // Add active to clicked
      option.classList.add('active');
      // Update hidden input
      statusInput.value = option.dataset.value;
    });
  });
}

function setStatusValue(status) {
  const statusSelector = document.getElementById('statusSelector');
  const statusInput = document.getElementById('eventStatus');
  const statusOptions = statusSelector.querySelectorAll('.status-option');

  statusOptions.forEach(opt => {
    opt.classList.remove('active');
    if (opt.dataset.value === status) {
      opt.classList.add('active');
    }
  });
  statusInput.value = status;
}

// Initialize
async function init() {
  if (!checkAuth()) return;

  createStarfield();
  initStatusSelector();

  // Load schedule
  scheduleItems = await fetchSchedule();
  renderSchedule();

  // Event listeners
  addEventBtn.addEventListener('click', openAddModal);
  logoutBtn.addEventListener('click', handleLogout);
  
  modalClose.addEventListener('click', closeEventModal);
  modalBackdrop.addEventListener('click', closeEventModal);
  cancelBtn.addEventListener('click', closeEventModal);
  
  deleteBackdrop.addEventListener('click', closeDeleteModal);
  cancelDeleteBtn.addEventListener('click', closeDeleteModal);
  confirmDeleteBtn.addEventListener('click', handleDelete);
  
  eventForm.addEventListener('submit', handleFormSubmit);

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeEventModal();
      closeDeleteModal();
    }
  });
}

// Start app
init();
