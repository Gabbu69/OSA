// ============================================================
// OSA Portal — Component Renderers
// ============================================================

const OSAComponents = {

  // ----------------------------------------------------------
  // Helper: Generate avatar color from name
  // ----------------------------------------------------------
  _avatarColors: [
    ['#206223','#acf4a4'], ['#006e1c','#98f994'], ['#923357','#ffd9e2'],
    ['#3a7b3a','#cbffc2'], ['#5c6356','#e1e3e1'], ['#2a6b2c','#91d78a']
  ],

  _getAvatarColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    const idx = Math.abs(hash) % this._avatarColors.length;
    return this._avatarColors[idx];
  },

  _getInitials(name) {
    const parts = name.split(' ').filter(p => p.length > 1 && p !== 'C.' && p !== 'P.' && p !== 'R.' && p !== 'L.' && p !== 'M.' && p !== 'A.' && p !== 'B.' && p !== 'S.' && p !== 'D.' && p !== 'T.' && p !== 'N.');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  },

  _formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
  },

  // ----------------------------------------------------------
  // Dashboard View
  // ----------------------------------------------------------
  renderDashboard() {
    const stats = OSAData.getStats();
    const houses = OSAData.boardingHouses;

    const houseCards = houses.map(h => {
      const pct = Math.round((h.occupied / h.capacity) * 100);
      return `
        <div class="osa-card cursor-pointer" onclick="OSAApp.navigateTo('boarding-detail', '${h.id}')">
          <div class="relative">
            <img class="boarding-card-image" src="${h.image}" alt="${h.name}"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div class="boarding-card-image-fallback" style="display:none;">
              <span class="material-symbols-outlined">apartment</span>
            </div>
            <div style="position:absolute; bottom:0; left:0; right:0; height:80px;
                        background: linear-gradient(transparent, rgba(0,0,0,0.5));"></div>
            <div style="position:absolute; bottom:12px; left:16px; right:16px;">
              <p style="color:white; font-family:'Manrope'; font-weight:700; font-size:0.9375rem; margin:0;">
                ${h.name}
              </p>
            </div>
          </div>
          <div style="padding:16px;">
            <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px;">
              <span class="material-symbols-outlined" style="font-size:14px; color:#707a6c;">location_on</span>
              <span style="font-size:0.75rem; color:#707a6c;">${h.address.split(',').slice(0,2).join(',')}</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
              <span style="font-size:0.6875rem; font-weight:600; color:#40493d;">
                ${h.occupied} / ${h.capacity} occupied
              </span>
              <span style="font-size:0.6875rem; font-weight:700; color:#206223;">${pct}%</span>
            </div>
            <div class="occupancy-bar">
              <div class="occupancy-bar-fill" style="width:${pct}%;"></div>
            </div>
          </div>
        </div>`;
    }).join('');

    return `
      <div style="padding:20px 20px 8px;">
        <p style="font-size:0.625rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#707a6c; margin-bottom:4px;">
          STUDENT ACCOMMODATION
        </p>
        <h2 style="font-family:'Manrope'; font-weight:800; font-size:1.75rem; color:#191c1b; margin:0 0 4px;">
          Good Day, Admin
        </h2>
        <p style="font-size:0.8125rem; color:#707a6c;">Here's your accommodation overview</p>
      </div>

      <div style="display:flex; gap:10px; padding:16px 20px; overflow-x:auto;">
        <div style="flex:1; min-width:0; background:#ffffff; border-radius:16px; padding:16px; text-align:center;
                    box-shadow: 0 12px 32px rgba(25,28,27,0.06);">
          <div class="stat-badge stat-badge-primary" style="margin:0 auto 8px;">${stats.totalStudents}</div>
          <p style="font-size:0.5625rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#707a6c; margin:0;">
            STUDENTS
          </p>
        </div>
        <div style="flex:1; min-width:0; background:#ffffff; border-radius:16px; padding:16px; text-align:center;
                    box-shadow: 0 12px 32px rgba(25,28,27,0.06);">
          <div class="stat-badge stat-badge-secondary" style="margin:0 auto 8px;">${stats.totalHouses}</div>
          <p style="font-size:0.5625rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#707a6c; margin:0;">
            HOUSES
          </p>
        </div>
        <div style="flex:1; min-width:0; background:#ffffff; border-radius:16px; padding:16px; text-align:center;
                    box-shadow: 0 12px 32px rgba(25,28,27,0.06);">
          <div class="stat-badge" style="margin:0 auto 8px; background:rgba(186,26,26,0.1); color:#ba1a1a;">
            ${stats.pendingConcerns}
          </div>
          <p style="font-size:0.5625rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#707a6c; margin:0;">
            PENDING
          </p>
        </div>
      </div>

      <div style="padding:8px 20px 20px;">
        <h3 style="font-family:'Manrope'; font-weight:700; font-size:1.125rem; color:#191c1b; margin:0 0 14px;">
          Dormitories
        </h3>
        <div style="display:flex; flex-direction:column; gap:16px;">
          ${houseCards}
        </div>
      </div>`;
  },

  // ----------------------------------------------------------
  // Boarding House Detail
  // ----------------------------------------------------------
  renderBoardingDetail(bhId) {
    const h = OSAData.getBoardingHouseById(bhId);
    if (!h) return '<div class="empty-state"><span class="material-symbols-outlined">error</span><p>Boarding house not found.</p></div>';

    const students = OSAData.getStudentsByBoardingHouse(bhId);
    const pct = Math.round((h.occupied / h.capacity) * 100);

    const amenityChips = h.amenities.map(a => `<span class="amenity-chip">${a}</span>`).join('');

    const studentList = students.map(s => {
      const c = this._getAvatarColor(s.name);
      return `
        <div class="osa-card" style="padding:14px 16px; display:flex; align-items:center; gap:14px; cursor:pointer; margin-bottom:8px;"
             onclick="OSAApp.navigateTo('student-profile', '${s.id}')">
          <div class="avatar" style="background:${c[0]}; color:${c[1]};">${this._getInitials(s.name)}</div>
          <div style="flex:1; min-width:0;">
            <p style="font-weight:600; font-size:0.875rem; color:#191c1b; margin:0;">${s.name}</p>
            <p style="font-size:0.75rem; color:#707a6c; margin:2px 0 0;">${s.course} • Room ${s.roomNumber}</p>
          </div>
          <span class="status-chip ${s.rentStatus}">${s.rentStatus}</span>
        </div>`;
    }).join('');

    return `
      <div class="detail-header">
        <button class="btn-icon" onclick="OSAApp.navigateTo('dashboard')">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h3 style="font-family:'Manrope'; font-weight:700; font-size:1.0625rem; color:#191c1b; margin:0;">
          Boarding House Details
        </h3>
      </div>

      <div style="padding:0 20px;">
        <div class="osa-card" style="margin-bottom:20px;">
          <img class="boarding-card-image" style="height:180px;" src="${h.image}" alt="${h.name}"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="boarding-card-image-fallback" style="display:none; height:180px;">
            <span class="material-symbols-outlined">apartment</span>
          </div>
          <div style="padding:20px;">
            <h2 style="font-family:'Manrope'; font-weight:800; font-size:1.25rem; color:#191c1b; margin:0 0 6px;">
              ${h.name}
            </h2>
            <div style="display:flex; align-items:center; gap:6px; margin-bottom:16px;">
              <span class="material-symbols-outlined" style="font-size:14px; color:#707a6c;">location_on</span>
              <span style="font-size:0.75rem; color:#707a6c;">${h.address}</span>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
              <div style="background:#f2f4f2; border-radius:12px; padding:12px; text-align:center;">
                <p style="font-family:'Manrope'; font-weight:800; font-size:1.25rem; color:#206223; margin:0;">
                  ${h.occupied}/${h.capacity}
                </p>
                <p style="font-size:0.5625rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#707a6c; margin:4px 0 0;">
                  Occupancy
                </p>
              </div>
              <div style="background:#f2f4f2; border-radius:12px; padding:12px; text-align:center;">
                <p style="font-family:'Manrope'; font-weight:800; font-size:1.25rem; color:#206223; margin:0;">
                  ₱${h.monthlyRate.toLocaleString()}
                </p>
                <p style="font-size:0.5625rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#707a6c; margin:4px 0 0;">
                  Monthly Rate
                </p>
              </div>
            </div>

            <div style="margin-bottom:16px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span style="font-size:0.75rem; font-weight:600; color:#40493d;">Capacity</span>
                <span style="font-size:0.75rem; font-weight:700; color:#206223;">${pct}%</span>
              </div>
              <div class="occupancy-bar">
                <div class="occupancy-bar-fill" style="width:${pct}%;"></div>
              </div>
            </div>

            <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px;">
              ${amenityChips}
            </div>

            <div style="display:flex; align-items:center; gap:8px;">
              <span class="material-symbols-outlined" style="font-size:16px; color:#707a6c;">person</span>
              <span style="font-size:0.8125rem; color:#191c1b;">${h.owner}</span>
              <span style="font-size:0.75rem; color:#707a6c; margin-left:auto;">${h.contact}</span>
            </div>
          </div>
        </div>

        <h3 style="font-family:'Manrope'; font-weight:700; font-size:1rem; color:#191c1b; margin:0 0 12px;">
          Tenants (${students.length})
        </h3>
        ${studentList}
      </div>`;
  },

  // ----------------------------------------------------------
  // Students View
  // ----------------------------------------------------------
  renderStudents() {
    const students = OSAData.students;

    const studentCards = students.map(s => {
      const c = this._getAvatarColor(s.name);
      const bh = OSAData.getBoardingHouseById(s.boardingHouseId);
      return `
        <div class="osa-card" style="padding:16px; display:flex; align-items:center; gap:14px; cursor:pointer;"
             onclick="OSAApp.navigateTo('student-profile', '${s.id}')">
          <div class="avatar" style="background:${c[0]}; color:${c[1]};">${this._getInitials(s.name)}</div>
          <div style="flex:1; min-width:0;">
            <p style="font-weight:600; font-size:0.875rem; color:#191c1b; margin:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              ${s.name}
            </p>
            <p style="font-size:0.6875rem; color:#707a6c; margin:3px 0 0;">
              ${s.course} • ${s.yearLevel}
            </p>
            <p style="font-size:0.625rem; color:#bfcaba; margin:2px 0 0;">
              ${bh ? bh.name : 'Unassigned'} — Room ${s.roomNumber}
            </p>
          </div>
          <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
            <span class="status-chip ${s.rentStatus}">${s.rentStatus}</span>
            <span class="material-symbols-outlined" style="font-size:18px; color:#bfcaba;">chevron_right</span>
          </div>
        </div>`;
    }).join('');

    return `
      <div style="padding:20px 20px 8px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px;">
          <div>
            <p style="font-size:0.625rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#707a6c; margin-bottom:4px;">
              REGISTERED TENANTS
            </p>
            <h2 style="font-family:'Manrope'; font-weight:800; font-size:1.5rem; color:#191c1b; margin:0;">
              Student Tenants
            </h2>
          </div>
          <div class="stat-badge stat-badge-primary">${OSAData.totalStudents}</div>
        </div>
      </div>

      <div style="padding:8px 20px 12px;">
        <div class="search-container">
          <span class="material-symbols-outlined search-icon">search</span>
          <input type="text" id="student-search" placeholder="Search by name, course, or ID..."
                 oninput="OSAApp.filterStudents(this.value)" />
        </div>
      </div>

      <div id="student-list" style="padding:0 20px 20px; display:flex; flex-direction:column; gap:10px;">
        ${studentCards}
      </div>`;
  },

  renderStudentFiltered(query) {
    const q = query.toLowerCase();
    const filtered = OSAData.students.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.course.toLowerCase().includes(q) ||
      s.studentId.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      return `<div class="empty-state">
        <span class="material-symbols-outlined">person_search</span>
        <p style="color:#707a6c; font-size:0.875rem;">No students found matching "${query}"</p>
      </div>`;
    }

    return filtered.map(s => {
      const c = this._getAvatarColor(s.name);
      const bh = OSAData.getBoardingHouseById(s.boardingHouseId);
      return `
        <div class="osa-card" style="padding:16px; display:flex; align-items:center; gap:14px; cursor:pointer;"
             onclick="OSAApp.navigateTo('student-profile', '${s.id}')">
          <div class="avatar" style="background:${c[0]}; color:${c[1]};">${this._getInitials(s.name)}</div>
          <div style="flex:1; min-width:0;">
            <p style="font-weight:600; font-size:0.875rem; color:#191c1b; margin:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              ${s.name}
            </p>
            <p style="font-size:0.6875rem; color:#707a6c; margin:3px 0 0;">${s.course} • ${s.yearLevel}</p>
            <p style="font-size:0.625rem; color:#bfcaba; margin:2px 0 0;">${bh ? bh.name : 'Unassigned'} — Room ${s.roomNumber}</p>
          </div>
          <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
            <span class="status-chip ${s.rentStatus}">${s.rentStatus}</span>
            <span class="material-symbols-outlined" style="font-size:18px; color:#bfcaba;">chevron_right</span>
          </div>
        </div>`;
    }).join('');
  },

  // ----------------------------------------------------------
  // Student Profile
  // ----------------------------------------------------------
  renderStudentProfile(studentId) {
    const s = OSAData.getStudentById(studentId);
    if (!s) return '<div class="empty-state"><span class="material-symbols-outlined">error</span><p>Student not found.</p></div>';

    const bh = OSAData.getBoardingHouseById(s.boardingHouseId);
    const c = this._getAvatarColor(s.name);
    const concerns = OSAData.getConcernsByStudent(studentId);

    const phones = s.contactNumbers.map(p => `
      <div style="display:flex; align-items:center; gap:8px; padding:4px 0;">
        <span class="material-symbols-outlined" style="font-size:14px; color:#206223;">call</span>
        <span style="font-size:0.8125rem; color:#191c1b;">${p}</span>
      </div>`).join('');

    const concernList = concerns.length > 0 ? concerns.map(c2 => {
      const cat = OSAData.concernCategories.find(cc => cc.id === c2.categoryId);
      return `
        <div style="display:flex; align-items:center; gap:10px; padding:10px 0;">
          <span class="status-dot ${c2.priority}"></span>
          <div style="flex:1;">
            <p style="font-size:0.8125rem; font-weight:600; color:#191c1b; margin:0;">${c2.title}</p>
            <p style="font-size:0.6875rem; color:#707a6c; margin:2px 0 0;">${cat ? cat.name : ''} • ${c2.status}</p>
          </div>
        </div>`;
    }).join('') : '<p style="font-size:0.8125rem; color:#707a6c; padding:8px 0;">No concerns filed.</p>';

    return `
      <div class="detail-header">
        <button class="btn-icon" onclick="OSAApp.goBack()">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h3 style="font-family:'Manrope'; font-weight:700; font-size:1.0625rem; color:#191c1b; margin:0;">
          Student Profile
        </h3>
      </div>

      <div style="padding:0 20px; text-align:center; margin-bottom:20px;">
        <div class="avatar avatar-xl" style="background:${c[0]}; color:${c[1]}; margin:0 auto 12px;">
          ${this._getInitials(s.name)}
        </div>
        <h2 style="font-family:'Manrope'; font-weight:800; font-size:1.375rem; color:#191c1b; margin:0 0 4px;">
          ${s.name}
        </h2>
        <p style="font-size:0.8125rem; color:#707a6c; margin:0 0 4px;">${s.course} — ${s.yearLevel}</p>
        <p style="font-size:0.6875rem; color:#bfcaba; margin:0;">ID: ${s.studentId}</p>
        <span class="status-chip ${s.rentStatus}" style="margin-top:8px;">${s.rentStatus === 'paid' ? 'Rent Paid' : 'Rent Overdue'}</span>
      </div>

      <div style="padding:0 20px;">
        <!-- Boarding Assignment -->
        <div class="osa-card" style="padding:18px; margin-bottom:16px; cursor:pointer;"
             onclick="OSAApp.navigateTo('boarding-detail', '${s.boardingHouseId}')">
          <div style="display:flex; align-items:center; gap:14px;">
            <div class="info-icon">
              <span class="material-symbols-outlined">apartment</span>
            </div>
            <div style="flex:1;">
              <p style="font-weight:600; font-size:0.875rem; color:#191c1b; margin:0;">${bh ? bh.name : 'N/A'}</p>
              <p style="font-size:0.6875rem; color:#707a6c; margin:2px 0 0;">Room ${s.roomNumber} • Since ${this._formatDate(s.moveInDate)}</p>
            </div>
            <span class="material-symbols-outlined" style="font-size:18px; color:#bfcaba;">chevron_right</span>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="osa-card" style="padding:18px; margin-bottom:16px;">
          <h4 style="font-size:0.625rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#707a6c; margin:0 0 12px;">
            CONTACT INFORMATION
          </h4>
          <div class="info-row">
            <div class="info-icon">
              <span class="material-symbols-outlined">phone</span>
            </div>
            <div>
              <p style="font-size:0.625rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#707a6c; margin:0 0 4px;">Contact Numbers</p>
              ${phones}
            </div>
          </div>
          <div class="info-row">
            <div class="info-icon">
              <span class="material-symbols-outlined">family_restroom</span>
            </div>
            <div>
              <p style="font-size:0.625rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#707a6c; margin:0 0 4px;">Mother's Contact</p>
              <p style="font-size:0.8125rem; color:#191c1b; margin:0;">${s.mothersContact}</p>
            </div>
          </div>
          <div class="info-row">
            <div class="info-icon">
              <span class="material-symbols-outlined">mail</span>
            </div>
            <div>
              <p style="font-size:0.625rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#707a6c; margin:0 0 4px;">Email</p>
              <p style="font-size:0.8125rem; color:#191c1b; margin:0;">${s.email}</p>
            </div>
          </div>
          <div class="info-row">
            <div class="info-icon">
              <span class="material-symbols-outlined">home</span>
            </div>
            <div>
              <p style="font-size:0.625rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#707a6c; margin:0 0 4px;">Home Address</p>
              <p style="font-size:0.8125rem; color:#191c1b; margin:0;">${s.address}</p>
            </div>
          </div>
        </div>

        <!-- Concerns -->
        <div class="osa-card" style="padding:18px; margin-bottom:20px;">
          <h4 style="font-size:0.625rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#707a6c; margin:0 0 12px;">
            FILED CONCERNS (${concerns.length})
          </h4>
          ${concernList}
        </div>
      </div>`;
  },

  // ----------------------------------------------------------
  // Concerns View (Categories)
  // ----------------------------------------------------------
  renderConcerns() {
    const categories = OSAData.concernCategories;

    const catCards = categories.map(cat => {
      const count = OSAData.getConcernsByCategory(cat.id).length;
      return `
        <div class="concern-category-card" onclick="OSAApp.navigateTo('manage-concerns', '${cat.id}')">
          <div class="status-bar ${cat.priority}"></div>
          <div style="flex:1;">
            <h4 style="font-family:'Manrope'; font-weight:700; font-size:1rem; color:#191c1b; margin:0 0 6px;">
              ${cat.name}
            </h4>
            <p style="font-size:0.75rem; color:#707a6c; margin:0; line-height:1.5;">
              ${cat.description}
            </p>
            <div style="display:flex; align-items:center; gap:8px; margin-top:10px;">
              <span class="priority-chip ${cat.priority}">
                <span class="status-dot ${cat.priority}" style="width:6px; height:6px;"></span>
                ${cat.priority} priority
              </span>
              <span style="font-size:0.6875rem; color:#707a6c;">${count} filed</span>
            </div>
          </div>
          <span class="material-symbols-outlined" style="font-size:20px; color:#bfcaba; align-self:center;">chevron_right</span>
        </div>`;
    }).join('');

    const allConcerns = OSAData.concerns;
    const pending = allConcerns.filter(c => c.status === 'pending').length;
    const investigating = allConcerns.filter(c => c.status === 'investigating').length;
    const resolved = allConcerns.filter(c => c.status === 'resolved').length;

    return `
      <div style="padding:20px 20px 8px;">
        <p style="font-size:0.625rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#707a6c; margin-bottom:4px;">
          CASE MANAGEMENT
        </p>
        <h2 style="font-family:'Manrope'; font-weight:800; font-size:1.5rem; color:#191c1b; margin:0;">
          Concerns & Complaints
        </h2>
      </div>

      <div style="display:flex; gap:10px; padding:16px 20px;">
        <div style="flex:1; background:#ffffff; border-radius:12px; padding:12px; text-align:center; box-shadow:0 12px 32px rgba(25,28,27,0.06);">
          <p style="font-family:'Manrope'; font-weight:800; font-size:1.25rem; color:#C59A1A; margin:0;">${pending}</p>
          <p style="font-size:0.5625rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#707a6c; margin:2px 0 0;">Pending</p>
        </div>
        <div style="flex:1; background:#ffffff; border-radius:12px; padding:12px; text-align:center; box-shadow:0 12px 32px rgba(25,28,27,0.06);">
          <p style="font-family:'Manrope'; font-weight:800; font-size:1.25rem; color:#ba1a1a; margin:0;">${investigating}</p>
          <p style="font-size:0.5625rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#707a6c; margin:2px 0 0;">Active</p>
        </div>
        <div style="flex:1; background:#ffffff; border-radius:12px; padding:12px; text-align:center; box-shadow:0 12px 32px rgba(25,28,27,0.06);">
          <p style="font-family:'Manrope'; font-weight:800; font-size:1.25rem; color:#206223; margin:0;">${resolved}</p>
          <p style="font-size:0.5625rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#707a6c; margin:2px 0 0;">Resolved</p>
        </div>
      </div>

      <div style="padding:8px 20px 20px;">
        <h3 style="font-family:'Manrope'; font-weight:700; font-size:1rem; color:#191c1b; margin:0 0 12px;">
          Categories
        </h3>
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${catCards}
        </div>
      </div>`;
  },

  // ----------------------------------------------------------
  // Manage Concerns (filtered by category)
  // ----------------------------------------------------------
  renderManageConcerns(catId) {
    const cat = OSAData.concernCategories.find(c => c.id === catId);
    const allConcerns = catId ? OSAData.getConcernsByCategory(catId) : OSAData.concerns;
    const title = cat ? cat.name : 'All Concerns';

    const concernItems = allConcerns.map((c, idx) => {
      const student = OSAData.getStudentById(c.studentId);
      const sc = student ? this._getAvatarColor(student.name) : ['#5c6356', '#e1e3e1'];
      return `
        <div class="osa-card" style="padding:16px; margin-bottom:10px;">
          <div style="display:flex; align-items:flex-start; gap:12px;">
            <span class="status-dot ${c.priority}" style="margin-top:6px;"></span>
            <div style="flex:1; min-width:0;">
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px;">
                <p style="font-weight:600; font-size:0.875rem; color:#191c1b; margin:0;">
                  #${allConcerns.length - idx} ${c.title}
                </p>
              </div>
              <p style="font-size:0.75rem; color:#707a6c; margin:0 0 8px; line-height:1.4;">
                ${c.description.substring(0, 100)}${c.description.length > 100 ? '...' : ''}
              </p>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                ${student ? `
                  <div class="avatar avatar-sm" style="background:${sc[0]}; color:${sc[1]};">${this._getInitials(student.name)}</div>
                  <span style="font-size:0.6875rem; color:#40493d; font-weight:500;">${student.name}</span>
                ` : ''}
                <span style="font-size:0.625rem; color:#bfcaba; margin-left:auto;">${this._formatDate(c.dateSubmitted)}</span>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <span class="priority-chip ${c.priority}">
                  <span class="status-dot ${c.priority}" style="width:6px; height:6px;"></span>
                  ${c.priority}
                </span>
                <span class="priority-chip ${c.status === 'resolved' ? 'low' : c.status === 'pending' ? 'medium' : 'high'}">
                  ${c.status}
                </span>
              </div>
              ${c.status !== 'resolved' ? `
              <div style="display:flex; gap:8px; margin-top:12px;">
                <button class="action-btn approve" onclick="OSAApp.resolveConcern('${c.id}')">
                  <span class="material-symbols-outlined" style="font-size:14px;">check_circle</span>
                  Resolve
                </button>
                <button class="action-btn investigate" onclick="OSAApp.investigateConcern('${c.id}')">
                  <span class="material-symbols-outlined" style="font-size:14px;">search</span>
                  Investigate
                </button>
              </div>` : ''}
            </div>
          </div>
        </div>`;
    }).join('');

    return `
      <div class="detail-header">
        <button class="btn-icon" onclick="OSAApp.navigateTo('concerns')">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h3 style="font-family:'Manrope'; font-weight:700; font-size:1.0625rem; color:#191c1b; margin:0;">
          Manage Concerns
        </h3>
      </div>

      <div style="padding:0 20px 8px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
          ${cat ? `<div class="status-bar ${cat.priority}" style="min-height:24px;"></div>` : ''}
          <h2 style="font-family:'Manrope'; font-weight:700; font-size:1.25rem; color:#191c1b; margin:0;">
            ${title}
          </h2>
          <span style="font-size:0.75rem; color:#707a6c; margin-left:auto;">${allConcerns.length} total</span>
        </div>
      </div>

      <div style="padding:0 20px 20px;">
        ${concernItems.length > 0 ? concernItems : `
          <div class="empty-state">
            <span class="material-symbols-outlined">inbox</span>
            <p style="color:#707a6c; font-size:0.875rem;">No concerns in this category.</p>
          </div>`}
      </div>`;
  },

  // ----------------------------------------------------------
  // Calendar View
  // ----------------------------------------------------------
  renderCalendar(year, month) {
    const now = new Date();
    year = year || now.getFullYear();
    month = month !== undefined ? month : now.getMonth();

    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDow = (firstDay.getDay() + 6) % 7; // Monday = 0

    const events = OSAData.getEventsForMonth(year, month);
    const eventDates = new Set(events.map(e => new Date(e.date).getDate()));

    // Build calendar grid
    let calendarCells = '';

    // Day headers
    dayNames.forEach(d => {
      calendarCells += `<div class="calendar-day-header">${d}</div>`;
    });

    // Previous month filler
    const prevLastDay = new Date(year, month, 0).getDate();
    for (let i = startDow - 1; i >= 0; i--) {
      calendarCells += `<div class="calendar-day other-month">${prevLastDay - i}</div>`;
    }

    // Current month days
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const isToday = d === now.getDate() && month === now.getMonth() && year === now.getFullYear();
      const hasEvent = eventDates.has(d);
      calendarCells += `<div class="calendar-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}"
                             onclick="OSAApp.selectCalendarDay(${year}, ${month}, ${d})">${d}</div>`;
    }

    // Next month filler
    const totalCells = startDow + lastDay.getDate();
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      calendarCells += `<div class="calendar-day other-month">${i}</div>`;
    }

    // Event list
    const eventList = events.map(e => `
      <div class="event-item">
        <div class="event-dot ${e.type}"></div>
        <div style="flex:1;">
          <p style="font-weight:600; font-size:0.8125rem; color:#191c1b; margin:0;">${e.title}</p>
          <p style="font-size:0.6875rem; color:#707a6c; margin:2px 0 0;">${this._formatDate(e.date)}</p>
        </div>
        <span style="font-size:0.625rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#bfcaba;">
          ${e.type}
        </span>
      </div>`).join('');

    // Concern category chips for the schedule legend
    const catChips = OSAData.concernCategories.map(cat => `
      <div style="display:flex; align-items:center; gap:8px; padding:10px 14px; background:#ffffff; border-radius:12px;
                  box-shadow:0 12px 32px rgba(25,28,27,0.06); cursor:pointer;"
           onclick="OSAApp.navigateTo('manage-concerns', '${cat.id}')">
        <span class="status-dot ${cat.priority}"></span>
        <span style="font-size:0.75rem; font-weight:600; color:#191c1b;">${cat.name}</span>
      </div>`).join('');

    return `
      <div style="padding:20px 20px 8px;">
        <p style="font-size:0.625rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#707a6c; margin-bottom:4px;">
          SCHEDULING
        </p>
        <h2 style="font-family:'Manrope'; font-weight:800; font-size:1.5rem; color:#191c1b; margin:0;">
          Manage Schedule
        </h2>
      </div>

      <div style="padding:8px 20px;">
        <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">
          ${catChips}
        </div>
      </div>

      <div style="padding:0 20px;">
        <div class="osa-card" style="padding:20px; margin-bottom:20px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
            <button class="btn-icon" onclick="OSAApp.changeMonth(-1)">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <h3 style="font-family:'Manrope'; font-weight:700; font-size:1.0625rem; color:#191c1b; margin:0;">
              ${monthNames[month]} ${year}
            </h3>
            <button class="btn-icon" onclick="OSAApp.changeMonth(1)">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <div class="calendar-grid">
            ${calendarCells}
          </div>
        </div>
      </div>

      <div style="padding:0 20px 20px;">
        <h3 style="font-family:'Manrope'; font-weight:700; font-size:1rem; color:#191c1b; margin:0 0 12px;">
          Upcoming Events
        </h3>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${eventList.length > 0 ? eventList : `
            <div class="empty-state" style="padding:24px;">
              <span class="material-symbols-outlined" style="font-size:40px;">event_busy</span>
              <p style="color:#707a6c; font-size:0.8125rem;">No events this month.</p>
            </div>`}
        </div>
      </div>`;
  }
};
