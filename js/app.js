// ============================================================
// OSA Portal — App Controller
// ============================================================

const OSAApp = {
  currentView: 'login',
  previousView: null,
  previousViewParam: null,
  calendarYear: new Date().getFullYear(),
  calendarMonth: new Date().getMonth(),
  isAuthenticated: false,

  // ----------------------------------------------------------
  // Initialization
  // ----------------------------------------------------------
  init() {
    // Check if already authenticated (session)
    if (sessionStorage.getItem('osa_auth') === 'true') {
      this.isAuthenticated = true;
      this._showAppShell();
      this.navigateTo('dashboard');
    } else {
      this._showLogin();
    }
  },

  // ----------------------------------------------------------
  // Login
  // ----------------------------------------------------------
  // Valid credentials
  _credentials: [
    { id: 'admin', password: 'admin123', name: 'Admin User' },
    { id: '2024-00123-ST-0', password: 'admin123', name: 'Martin C. Santos' }
  ],

  login() {
    const idField = document.getElementById('identity');
    const pwField = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const loginText = document.getElementById('login-text');
    const loginLoader = document.getElementById('login-loader');
    const errorMsg = document.getElementById('login-error');

    // Clear previous error
    this._hideLoginError();

    // Validate empty fields
    const userId = (idField.value || '').trim();
    const userPw = (pwField.value || '').trim();

    if (!userId && !userPw) {
      this._showLoginError('Please enter your Student ID and Password.');
      idField.focus();
      return;
    }
    if (!userId) {
      this._showLoginError('Please enter your Student ID or Email.');
      idField.focus();
      return;
    }
    if (!userPw) {
      this._showLoginError('Please enter your Password.');
      pwField.focus();
      return;
    }

    // Show loading state
    loginBtn.disabled = true;
    loginText.style.display = 'none';
    loginLoader.classList.add('active');

    // Simulate auth delay
    setTimeout(() => {
      // Check credentials
      const validUser = this._credentials.find(
        c => c.id.toLowerCase() === userId.toLowerCase() && c.password === userPw
      );

      if (!validUser) {
        // Wrong credentials — show error
        loginBtn.disabled = false;
        loginText.style.display = '';
        loginLoader.classList.remove('active');
        this._showLoginError('Invalid Student ID or Password. Please try again.');

        // Shake the login card
        const loginCard = loginBtn.closest('form');
        if (loginCard) {
          loginCard.style.animation = 'shakeX 0.5s ease';
          setTimeout(() => { loginCard.style.animation = ''; }, 500);
        }
        return;
      }

      // Success — transition to app
      this.isAuthenticated = true;
      this._currentUser = validUser.name;
      sessionStorage.setItem('osa_auth', 'true');
      sessionStorage.setItem('osa_user', validUser.name);

      const loginView = document.getElementById('login-view');
      loginView.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      loginView.style.opacity = '0';
      loginView.style.transform = 'scale(0.98)';

      setTimeout(() => {
        this._showAppShell();
        this.navigateTo('dashboard');

        // Reset login form
        loginBtn.disabled = false;
        loginText.style.display = '';
        loginLoader.classList.remove('active');
        loginView.style.opacity = '';
        loginView.style.transform = '';
        if (idField) idField.value = '';
        if (pwField) pwField.value = '';
        this._hideLoginError();
      }, 400);
    }, 1200);
  },

  _showLoginError(message) {
    const errorEl = document.getElementById('login-error');
    const errorText = document.getElementById('login-error-text');
    if (errorEl && errorText) {
      errorText.textContent = message;
      errorEl.style.display = 'flex';
      errorEl.style.animation = 'viewFadeIn 0.3s ease forwards';
    }
  },

  _hideLoginError() {
    const errorEl = document.getElementById('login-error');
    const errorText = document.getElementById('login-error-text');
    if (errorEl) {
      errorEl.style.display = 'none';
    }
    if (errorText) {
      errorText.textContent = '';
    }
  },

  logout() {
    this.isAuthenticated = false;
    sessionStorage.removeItem('osa_auth');
    this._showLogin();
  },

  _showLogin() {
    document.getElementById('login-view').classList.add('active');
    document.getElementById('login-view').style.display = 'flex';
    document.getElementById('app-shell').classList.remove('active');
  },

  _showAppShell() {
    document.getElementById('login-view').classList.remove('active');
    document.getElementById('login-view').style.display = 'none';
    
    const appShell = document.getElementById('app-shell');
    appShell.classList.add('active');
    appShell.style.display = 'flex';
  },

  // ----------------------------------------------------------
  // Navigation
  // ----------------------------------------------------------
  navigateTo(view, param) {
    // Save previous view for back navigation
    if (this.currentView !== view) {
      this.previousView = this.currentView;
      this.previousViewParam = null;
    }

    this.currentView = view;
    const content = document.getElementById('main-content');
    const fab = document.getElementById('fab-btn');

    // Animate out
    content.style.opacity = '0';
    content.style.transform = 'translateY(8px)';

    setTimeout(() => {
      // Render the view
      switch (view) {
        case 'dashboard':
          content.innerHTML = OSAComponents.renderDashboard();
          break;
        case 'boarding-detail':
          content.innerHTML = OSAComponents.renderBoardingDetail(param);
          this.previousViewParam = param;
          break;
        case 'students':
          content.innerHTML = OSAComponents.renderStudents();
          break;
        case 'student-profile':
          content.innerHTML = OSAComponents.renderStudentProfile(param);
          this.previousViewParam = param;
          break;
        case 'concerns':
          content.innerHTML = OSAComponents.renderConcerns();
          break;
        case 'manage-concerns':
          content.innerHTML = OSAComponents.renderManageConcerns(param);
          this.previousViewParam = param;
          break;
        case 'calendar':
          content.innerHTML = OSAComponents.renderCalendar(this.calendarYear, this.calendarMonth);
          break;
        default:
          content.innerHTML = OSAComponents.renderDashboard();
      }

      // Update bottom nav active state
      this._updateNav(view);

      // Show/hide FAB
      if (fab) {
        const showFab = ['concerns', 'students', 'manage-concerns'].includes(view);
        fab.style.display = showFab ? 'flex' : 'none';
      }

      // Scroll to top
      content.scrollTo({ top: 0 });

      // Animate in
      requestAnimationFrame(() => {
        content.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      });
    }, 150);
  },

  goBack() {
    if (this.previousView) {
      const prevView = this.previousView;
      const prevParam = this.previousViewParam;
      this.previousView = null;
      this.previousViewParam = null;
      this.navigateTo(prevView, prevParam);
    } else {
      this.navigateTo('dashboard');
    }
  },

  _updateNav(view) {
    const navItems = document.querySelectorAll('.nav-item');
    const viewToNav = {
      'dashboard': 'nav-dashboard',
      'boarding-detail': 'nav-dashboard',
      'students': 'nav-students',
      'student-profile': 'nav-students',
      'concerns': 'nav-concerns',
      'manage-concerns': 'nav-concerns',
      'calendar': 'nav-calendar'
    };
    const activeNav = viewToNav[view] || 'nav-dashboard';

    navItems.forEach(item => {
      if (item.id === activeNav) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  },

  // ----------------------------------------------------------
  // Student Search
  // ----------------------------------------------------------
  filterStudents(query) {
    const listEl = document.getElementById('student-list');
    if (!listEl) return;

    if (!query || query.trim() === '') {
      this.navigateTo('students');
      return;
    }

    listEl.innerHTML = OSAComponents.renderStudentFiltered(query);
  },

  // ----------------------------------------------------------
  // Calendar Controls
  // ----------------------------------------------------------
  changeMonth(delta) {
    this.calendarMonth += delta;
    if (this.calendarMonth > 11) {
      this.calendarMonth = 0;
      this.calendarYear++;
    } else if (this.calendarMonth < 0) {
      this.calendarMonth = 11;
      this.calendarYear--;
    }
    const content = document.getElementById('main-content');
    content.innerHTML = OSAComponents.renderCalendar(this.calendarYear, this.calendarMonth);
  },

  selectCalendarDay(year, month, day) {
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const events = OSAData.calendarEvents.filter(e => e.date === date);
    if (events.length > 0) {
      this.showToast(`${events.length} event(s) on ${OSAComponents._formatDate(date)}`);
    }
  },

  // ----------------------------------------------------------
  // Concern Actions
  // ----------------------------------------------------------
  resolveConcern(concernId) {
    const concern = OSAData.concerns.find(c => c.id === concernId);
    if (concern) {
      concern.status = 'resolved';
      concern.priority = 'low';
      this.showToast('Concern marked as resolved');
      // Re-render current view
      const content = document.getElementById('main-content');
      content.innerHTML = OSAComponents.renderManageConcerns(concern.categoryId);
    }
  },

  investigateConcern(concernId) {
    const concern = OSAData.concerns.find(c => c.id === concernId);
    if (concern) {
      concern.status = 'investigating';
      this.showToast('Concern moved to investigation');
      const content = document.getElementById('main-content');
      content.innerHTML = OSAComponents.renderManageConcerns(concern.categoryId);
    }
  },

  // ----------------------------------------------------------
  // Toast Notification
  // ----------------------------------------------------------
  showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
};

// ----------------------------------------------------------
// Boot
// ----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  OSAApp.init();
});
