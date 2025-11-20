// Configuration
const defaultConfig = {
  system_name: "Prisma",
  login_title: "Bem-vindo ao Sistema de Gestão Acadêmica",
  login_button: "Entrar",
  dashboard_title: "Dashboard",
  primary_color: "#4F46E5",
  success_color: "#22C55E",
  warning_color: "#F59E0B",
  error_color: "#EF4444",
  info_color: "#3B82F6"
};

let currentUser = null;
let currentView = 'dashboard';

// User profiles with navigation
const userProfiles = {
  student: {
    name: 'Aluno Silva',
    role: 'Aluno',
    avatar: 'AL',
    navigation: [
      { id: 'dashboard', label: 'Dashboard', icon: 'home' },
      { id: 'boletim', label: 'Boletim', icon: 'document' },
      { id: 'atividades', label: 'Atividades', icon: 'clipboard' },
      { id: 'medalhas', label: 'Medalhas', icon: 'star' },
      { id: 'historico', label: 'Histórico', icon: 'chart' }
    ]
  },
  teacher: {
    name: 'Prof. Santos',
    role: 'Professor',
    avatar: 'PS',
    navigation: [
      { id: 'dashboard', label: 'Dashboard', icon: 'home' },
      { id: 'notas', label: 'Notas', icon: 'document' },
      { id: 'frequencia', label: 'Frequência', icon: 'calendar' },
      { id: 'atividades', label: 'Atividades', icon: 'clipboard' },
      { id: 'plano', label: 'Plano de Aula', icon: 'book' }
    ]
  },
  coordinator: {
    name: 'Coord. Lima',
    role: 'Coordenação',
    avatar: 'CL',
    navigation: [
      { id: 'dashboard', label: 'Dashboard', icon: 'home' },
      { id: 'plano', label: 'Plano de Aula', icon: 'book' },
      { id: 'notificacoes', label: 'Notificações', icon: 'bell' },
      { id: 'turmas', label: 'Turmas', icon: 'users' },
      { id: 'usuarios', label: 'Usuários', icon: 'user' }
    ]
  }
};

// Icon SVGs
const icons = {
  home: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />',
  document: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />',
  clipboard: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />',
  star: '<path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />',
  chart: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />',
  calendar: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />',
  book: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />',
  bell: '<path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />',
  users: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />',
  user: '<path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />'
};

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Reset errors
  document.getElementById('username').classList.remove('error');
  document.getElementById('password').classList.remove('error');
  document.getElementById('usernameError').classList.remove('show');
  document.getElementById('passwordError').classList.remove('show');

  let hasError = false;

  if (!username) {
    document.getElementById('username').classList.add('error');
    document.getElementById('usernameError').classList.add('show');
    hasError = true;
  }

  if (!password) {
    document.getElementById('password').classList.add('error');
    document.getElementById('passwordError').classList.add('show');
    hasError = true;
  }

  if (hasError) return;

  // Validate credentials and determine user type
  let userType = null;

  if ((username === 'aluno' || username === 'student') && password === '123456') {
    userType = 'student';
  } else if ((username === 'professor' || username === 'prof') && password === '123456') {
    userType = 'teacher';
  } else if ((username === 'coordenacao' || username === 'coord') && password === '123456') {
    userType = 'coordinator';
  } else {
    // Invalid credentials
    showToast('Credenciais inválidas. Use as credenciais de teste.');
    return;
  }

  login(userType);
});

function login(userType) {
  currentUser = userProfiles[userType];

  // Hide login, show app
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('appShell').classList.add('active');

  // Update user info
  document.getElementById('userName').textContent = currentUser.name;
  document.getElementById('userRole').textContent = currentUser.role;
  document.getElementById('userAvatar').textContent = currentUser.avatar;
  document.getElementById('breadcrumbRole').textContent = currentUser.role;

  // Load navigation
  loadNavigation();

  // Load dashboard
  loadView('dashboard');

  showToast('Login realizado com sucesso!');
}

function logout() {
  currentUser = null;
  document.getElementById('appShell').classList.remove('active');
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  showToast('Logout realizado com sucesso!');
}

function loadNavigation() {
  const nav = document.getElementById('sidebarNav');
  nav.innerHTML = '';

  currentUser.navigation.forEach(item => {
    const navItem = document.createElement('a');
    navItem.className = 'nav-item';
    navItem.dataset.view = item.id;                 // <- id da view
    navItem.href = '#';                              // acessível
    navItem.innerHTML = `
      <svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        ${icons[item.icon]}
      </svg>
      <span class="nav-label">${item.label}</span>
    `;
    navItem.addEventListener('click', (e) => {
      e.preventDefault();
      loadView(item.id);
    });
    nav.appendChild(navItem);
  });

  // marca o item inicial
  setActive(currentView);
}

function loadView(viewId) {
  currentView = viewId;

  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  event?.currentTarget?.classList.add('active');

  // Update breadcrumb
  const viewLabel = currentUser.navigation.find(n => n.id === viewId)?.label || 'Dashboard';
  document.getElementById('breadcrumbSection').textContent = viewLabel;

  // Load content based on view and user type
  const contentArea = document.getElementById('contentArea');

  if (viewId === 'dashboard') {
    if (currentUser.role === 'Aluno') {
      contentArea.innerHTML = getStudentDashboard();
    } else if (currentUser.role === 'Professor') {
      contentArea.innerHTML = getTeacherDashboard();
    } else {
      contentArea.innerHTML = getCoordinatorDashboard();
    }
  } else if (viewId === 'boletim') {
    contentArea.innerHTML = getBoletimView();
  } else if (viewId === 'atividades') {
    if (currentUser.role === 'Aluno') {
      contentArea.innerHTML = getStudentAtividades();
    } else {
      contentArea.innerHTML = getTeacherAtividades();
    }
  } else if (viewId === 'medalhas') {
    contentArea.innerHTML = getMedalhasView();
  } else if (viewId === 'historico') {
    contentArea.innerHTML = getHistoricoView();
  } else if (viewId === 'notas') {
    contentArea.innerHTML = getNotasView();
  } else if (viewId === 'frequencia') {
    contentArea.innerHTML = getFrequenciaView();
  } else if (viewId === 'plano') {
    if (currentUser.role === 'Professor') {
      contentArea.innerHTML = getTeacherPlanoView();
    } else {
      contentArea.innerHTML = getCoordinatorPlanoView();
    }
  } else if (viewId === 'notificacoes') {
    contentArea.innerHTML = getNotificacoesView();
  } else if (viewId === 'turmas') {
    contentArea.innerHTML = getTurmasView();
  } else if (viewId === 'usuarios') {
    contentArea.innerHTML = getUsuariosView();
  }
}

// Utility functions
function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdown');
  dropdown.classList.toggle('show');
}

function switchTab(event, tabId) {
  // Remove active class from all tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  // Add active class to clicked tab
  event.target.classList.add('active');

  // Hide all tab content
  document.getElementById('pendentes').style.display = 'none';
  document.getElementById('entregues').style.display = 'none';

  // Show selected tab content
  document.getElementById(tabId).style.display = 'grid';
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    hideToast();
  }, 3000);
}

function hideToast() {
  const toast = document.getElementById('toast');
  toast.classList.remove('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
  const userMenu = document.querySelector('.user-menu');
  const dropdown = document.getElementById('userDropdown');

  if (!userMenu.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});

// Element SDK implementation
async function onConfigChange(config) {
  const systemName = config.system_name || defaultConfig.system_name;
  const loginTitle = config.login_title || defaultConfig.login_title;
  const loginButton = config.login_button || defaultConfig.login_button;
  const dashboardTitle = config.dashboard_title || defaultConfig.dashboard_title;
  const primaryColor = config.primary_color || defaultConfig.primary_color;
  const successColor = config.success_color || defaultConfig.success_color;
  const warningColor = config.warning_color || defaultConfig.warning_color;
  const errorColor = config.error_color || defaultConfig.error_color;
  const infoColor = config.info_color || defaultConfig.info_color;

  // Update text content
  const systemNameElements = document.querySelectorAll('#systemName, #sidebarSystemName');
  systemNameElements.forEach(el => {
    if (el) el.textContent = systemName;
  });

  const loginTitleElement = document.getElementById('loginTitle');
  if (loginTitleElement) loginTitleElement.textContent = loginTitle;

  const loginButtonElement = document.getElementById('loginButton');
  if (loginButtonElement) loginButtonElement.textContent = loginButton;

  const dashboardTitleElements = document.querySelectorAll('#dashboardTitle');
  dashboardTitleElements.forEach(el => {
    if (el) el.textContent = dashboardTitle;
  });

  // Update colors
  const style = document.createElement('style');
  style.textContent = `
        .btn-primary, .pagination-btn.active { background: ${primaryColor} !important; }
        .btn-primary:hover { background: ${primaryColor}dd !important; }
        .nav-item.active { background: ${primaryColor}22 !important; color: ${primaryColor} !important; }
        .tab.active { color: ${primaryColor} !important; border-bottom-color: ${primaryColor} !important; }
        .link, .dropdown-item:hover { color: ${primaryColor} !important; }
        .form-input:focus { border-color: ${primaryColor} !important; box-shadow: 0 0 0 3px ${primaryColor}22 !important; }
        .kpi-icon.primary { background: ${primaryColor}22 !important; color: ${primaryColor} !important; }
        .badge.success, .kpi-icon.success { background: ${successColor}22 !important; color: ${successColor} !important; }
        .badge.warning, .kpi-icon.warning { background: ${warningColor}22 !important; color: ${warningColor} !important; }
        .badge.error, .kpi-icon.error { background: ${errorColor}22 !important; color: ${errorColor} !important; }
        .badge.info, .kpi-icon.info { background: ${infoColor}22 !important; color: ${infoColor} !important; }
        .login-logo-icon, .sidebar-logo-icon { background: linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd) !important; }
        .user-avatar { background: linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd) !important; }
      `;

  const existingStyle = document.getElementById('dynamic-colors');
  if (existingStyle) {
    existingStyle.remove();
  }
  style.id = 'dynamic-colors';
  document.head.appendChild(style);
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.primary_color || defaultConfig.primary_color,
          set: (value) => {
            config.primary_color = value;
            window.elementSdk.setConfig({ primary_color: value });
          }
        },
        {
          get: () => config.success_color || defaultConfig.success_color,
          set: (value) => {
            config.success_color = value;
            window.elementSdk.setConfig({ success_color: value });
          }
        },
        {
          get: () => config.warning_color || defaultConfig.warning_color,
          set: (value) => {
            config.warning_color = value;
            window.elementSdk.setConfig({ warning_color: value });
          }
        },
        {
          get: () => config.error_color || defaultConfig.error_color,
          set: (value) => {
            config.error_color = value;
            window.elementSdk.setConfig({ error_color: value });
          }
        },
        {
          get: () => config.info_color || defaultConfig.info_color,
          set: (value) => {
            config.info_color = value;
            window.elementSdk.setConfig({ info_color: value });
          }
        }
      ],
      borderables: [],
      fontEditable: undefined,
      fontSizeable: undefined
    }),
    mapToEditPanelValues: (config) => new Map([
      ['system_name', config.system_name || defaultConfig.system_name],
      ['login_title', config.login_title || defaultConfig.login_title],
      ['login_button', config.login_button || defaultConfig.login_button],
      ['dashboard_title', config.dashboard_title || defaultConfig.dashboard_title]
    ])
  });
}

function toggleSidebar(){
  const shell = document.getElementById('appShell');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile){
    shell.classList.toggle('mobile-open');      // abre/fecha off-canvas
  } else {
    shell.classList.toggle('collapsed');        // retrátil no desktop
    localStorage.setItem('sidebarCollapsed', shell.classList.contains('collapsed') ? '1' : '0');
  }
}

// restaura estado do colapso no desktop
document.addEventListener('DOMContentLoaded', () => {
  const shell = document.getElementById('appShell');
  if (localStorage.getItem('sidebarCollapsed') === '1'){
    shell.classList.add('collapsed');
  }
});

// fecha o off-canvas ao clicar fora (mobile)
document.addEventListener('click', (e) => {
  const shell = document.getElementById('appShell');
  if (!shell.classList.contains('mobile-open')) return;
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar.contains(e.target) && !e.target.closest('.toggle-btn')){
    shell.classList.remove('mobile-open');
  }
});
