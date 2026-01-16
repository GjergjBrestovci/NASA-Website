const API_BASE = 'http://localhost:8787';

type ScheduleItem = {
  id?: string;
  title: string;
  slot: string;
  focus: string;
  status: string;
  position?: number;
};

type ToastType = 'success' | 'error';

let scheduleItems: ScheduleItem[] = [];
let editingEventId: string | null = null;
let deletingEventId: string | null = null;

const scheduleList = document.getElementById('scheduleList') as HTMLElement | null;
const loadingState = document.getElementById('loadingState') as HTMLElement | null;
const emptyState = document.getElementById('emptyState') as HTMLElement | null;
const userEmail = document.getElementById('userEmail') as HTMLElement | null;
const toastContainer = document.getElementById('toastContainer') as HTMLElement | null;

const eventModal = document.getElementById('eventModal') as HTMLElement | null;
const deleteModal = document.getElementById('deleteModal') as HTMLElement | null;

const addEventBtn = document.getElementById('addEventBtn') as HTMLButtonElement | null;
const logoutBtn = document.getElementById('logoutBtn') as HTMLButtonElement | null;
const modalClose = document.getElementById('modalClose') as HTMLButtonElement | null;
const modalBackdrop = document.getElementById('modalBackdrop') as HTMLElement | null;
const cancelBtn = document.getElementById('cancelBtn') as HTMLButtonElement | null;
const deleteBackdrop = document.getElementById('deleteBackdrop') as HTMLElement | null;
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn') as HTMLButtonElement | null;
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn') as HTMLButtonElement | null;

const eventForm = document.getElementById('eventForm') as HTMLFormElement | null;
const modalTitle = document.getElementById('modalTitle') as HTMLElement | null;

function getToken() {
  return localStorage.getItem('teacher_token');
}

function getEmail() {
  return localStorage.getItem('teacher_email');
}

function checkAuth() {
  const token = getToken();
  if (!token) {
    window.location.href = '/';
    return false;
  }

  const email = getEmail();
  if (email && userEmail) {
    userEmail.textContent = email;
  }
  return true;
}

function createStarfield() {
  const starfield = document.getElementById('starfield');
  if (!starfield) return;
  const starCount = 60;

  for (let i = 0; i < starCount; i += 1) {
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

function showToast(message: string, type: ToastType = 'success') {
  if (!toastContainer) return;
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

async function fetchSchedule() {
  try {
    const response = await fetch(`${API_BASE}/api/schedule`);
    if (!response.ok) throw new Error('Failed to fetch schedule');
    const data: { items?: ScheduleItem[] } = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Fetch error:', error);
    showToast('Failed to load schedule', 'error');
    return [];
  }
}

async function saveSchedule(items: ScheduleItem[]) {
  const token = getToken();
  try {
    const response = await fetch(`${API_BASE}/api/schedule`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      const data: { error?: string } = await response.json();
      throw new Error(data.error || 'Failed to save schedule');
    }

    const data: { items?: ScheduleItem[] } = await response.json();
    return data.items || items;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save schedule';
    console.error('Save error:', error);
    showToast(message, 'error');
    return null;
  }
}

function renderSchedule() {
  if (loadingState) loadingState.style.display = 'none';

  if (!scheduleList || !emptyState) return;

  if (scheduleItems.length === 0) {
    emptyState.style.display = 'flex';
    scheduleList.innerHTML = '';
    return;
  }

  emptyState.style.display = 'none';

  scheduleList.innerHTML = scheduleItems
    .map(
      (item, index) => `
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
  `
    )
    .join('');

  document.querySelectorAll<HTMLButtonElement>('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(btn.dataset.id || null));
  });

  document.querySelectorAll<HTMLButtonElement>('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => openDeleteModal(btn.dataset.id || null));
  });
}

function escapeHtml(text: string) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function openAddModal() {
  editingEventId = null;
  if (modalTitle) modalTitle.textContent = 'Add New Event';
  eventForm?.reset();
  setStatusValue('upcoming');
  eventModal?.classList.add('active');
}

function openEditModal(id: string | null) {
  const item = scheduleItems.find(i => i.id === id);
  if (!item) return;

  editingEventId = id;
  if (modalTitle) modalTitle.textContent = 'Edit Event';

  const eventId = document.getElementById('eventId') as HTMLInputElement | null;
  const eventTitle = document.getElementById('eventTitle') as HTMLInputElement | null;
  const eventSlot = document.getElementById('eventSlot') as HTMLInputElement | null;
  const eventFocus = document.getElementById('eventFocus') as HTMLTextAreaElement | null;

  if (eventId) eventId.value = item.id ?? '';
  if (eventTitle) eventTitle.value = item.title;
  if (eventSlot) eventSlot.value = item.slot;
  if (eventFocus) eventFocus.value = item.focus;
  setStatusValue(item.status);

  eventModal?.classList.add('active');
}

function closeEventModal() {
  eventModal?.classList.remove('active');
  editingEventId = null;
  eventForm?.reset();
  setStatusValue('upcoming');
}

function openDeleteModal(id: string | null) {
  const item = scheduleItems.find(i => i.id === id);
  if (!item) return;

  deletingEventId = id;
  const deleteEventTitle = document.getElementById('deleteEventTitle') as HTMLElement | null;
  if (deleteEventTitle) deleteEventTitle.textContent = item.title;
  deleteModal?.classList.add('active');
}

function closeDeleteModal() {
  deleteModal?.classList.remove('active');
  deletingEventId = null;
}

async function handleFormSubmit(e: Event) {
  e.preventDefault();
  if (!eventForm) return;

  const formData = new FormData(eventForm);
  const eventData: ScheduleItem = {
    title: String(formData.get('title') ?? '').trim(),
    slot: String(formData.get('slot') ?? '').trim(),
    focus: String(formData.get('focus') ?? '').trim(),
    status: String(formData.get('status') ?? 'upcoming'),
  };

  if (editingEventId) {
    const index = scheduleItems.findIndex(i => i.id === editingEventId);
    if (index !== -1) {
      scheduleItems[index] = { ...scheduleItems[index], ...eventData };
    }
  } else {
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

async function handleDelete() {
  if (!deletingEventId) return;

  scheduleItems = scheduleItems.filter(i => i.id !== deletingEventId);

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

function handleLogout() {
  localStorage.removeItem('teacher_token');
  localStorage.removeItem('teacher_email');
  window.location.href = '/';
}

function initStatusSelector() {
  const statusSelector = document.getElementById('statusSelector');
  const statusInput = document.getElementById('eventStatus') as HTMLInputElement | null;
  if (!statusSelector || !statusInput) return;

  const statusOptions = statusSelector.querySelectorAll<HTMLButtonElement>('.status-option');

  statusOptions.forEach(option => {
    option.addEventListener('click', () => {
      statusOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      statusInput.value = option.dataset.value ?? 'upcoming';
    });
  });
}

function setStatusValue(status: string) {
  const statusSelector = document.getElementById('statusSelector');
  const statusInput = document.getElementById('eventStatus') as HTMLInputElement | null;
  if (!statusSelector || !statusInput) return;

  const statusOptions = statusSelector.querySelectorAll<HTMLButtonElement>('.status-option');

  statusOptions.forEach(opt => {
    opt.classList.remove('active');
    if (opt.dataset.value === status) {
      opt.classList.add('active');
    }
  });
  statusInput.value = status;
}

async function init() {
  if (!checkAuth()) return;

  createStarfield();
  initStatusSelector();

  scheduleItems = await fetchSchedule();
  renderSchedule();

  addEventBtn?.addEventListener('click', openAddModal);
  logoutBtn?.addEventListener('click', handleLogout);

  modalClose?.addEventListener('click', closeEventModal);
  modalBackdrop?.addEventListener('click', closeEventModal);
  cancelBtn?.addEventListener('click', closeEventModal);

  deleteBackdrop?.addEventListener('click', closeDeleteModal);
  cancelDeleteBtn?.addEventListener('click', closeDeleteModal);
  confirmDeleteBtn?.addEventListener('click', handleDelete);

  eventForm?.addEventListener('submit', handleFormSubmit);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeEventModal();
      closeDeleteModal();
    }
  });
}

init();
