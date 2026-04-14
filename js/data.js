// ============================================================
// OSA Portal — Mock Data Layer
// ============================================================

const OSAData = {
  // ----------------------------------------------------------
  // Boarding Houses
  // ----------------------------------------------------------
  boardingHouses: [
    {
      id: 'bh1',
      name: 'Abi Saith Boarding House',
      address: '123 Pulong St., Brgy. Pagsawitan, Sta. Cruz, Laguna',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop&q=80',
      capacity: 60,
      occupied: 32,
      rooms: 20,
      floors: 3,
      amenities: ['WiFi', 'Parking', 'Laundry Area', 'Common Kitchen', 'Study Hall'],
      monthlyRate: 3500,
      status: 'active',
      owner: 'Mrs. Abigail S. Reyes',
      contact: '0917-845-2301',
      description: 'A well-maintained student boarding house near the university campus with modern amenities and a quiet study environment.'
    },
    {
      id: 'bh2',
      name: 'Brownish Heights Boarding House',
      address: '456 Rizal Ave., Brgy. Bagumbayan, Sta. Cruz, Laguna',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop&q=80',
      capacity: 40,
      occupied: 19,
      rooms: 15,
      floors: 2,
      amenities: ['WiFi', 'Parking', 'Study Room', 'Garden Area'],
      monthlyRate: 3000,
      status: 'active',
      owner: 'Mr. Fernando B. Cruz',
      contact: '0928-331-5567',
      description: 'A cozy boarding house surrounded by greenery, offering affordable rates for student tenants.'
    }
  ],

  // ----------------------------------------------------------
  // Students (representative sample — total count shown as 51)
  // ----------------------------------------------------------
  totalStudents: 51,
  students: [
    {
      id: 's1',
      name: 'Martin C. Santos',
      course: 'BS Information Technology',
      yearLevel: '3rd Year',
      studentId: '2024-00123-ST-0',
      boardingHouseId: 'bh1',
      roomNumber: 'R-205',
      contactNumbers: ['0971-245-8788', '0928-780-1723', '0907-123-4567'],
      mothersContact: '0945-019-3012',
      email: 'martin.santos@university.edu.ph',
      address: 'Pulong, Pagsawitan, Sta. Cruz, Laguna',
      avatar: null,
      status: 'active',
      moveInDate: '2024-06-15',
      rentStatus: 'paid'
    },
    {
      id: 's2',
      name: 'Justin C. Santos',
      course: 'BS Computer Science',
      yearLevel: '2nd Year',
      studentId: '2024-00456-ST-0',
      boardingHouseId: 'bh1',
      roomNumber: 'R-301',
      contactNumbers: ['0956-889-4421', '0917-332-1100'],
      mothersContact: '0945-019-3012',
      email: 'justin.santos@university.edu.ph',
      address: 'Pulong, Pagsawitan, Sta. Cruz, Laguna',
      avatar: null,
      status: 'active',
      moveInDate: '2024-08-01',
      rentStatus: 'paid'
    },
    {
      id: 's3',
      name: 'Angela Mae R. Delos Reyes',
      course: 'BS Nursing',
      yearLevel: '4th Year',
      studentId: '2021-00789-ST-0',
      boardingHouseId: 'bh1',
      roomNumber: 'R-102',
      contactNumbers: ['0936-445-7890'],
      mothersContact: '0917-223-4556',
      email: 'angela.delos@university.edu.ph',
      address: 'Brgy. Labuin, Pagsanjan, Laguna',
      avatar: null,
      status: 'active',
      moveInDate: '2023-06-10',
      rentStatus: 'paid'
    },
    {
      id: 's4',
      name: 'Carlos Miguel P. Villanueva',
      course: 'BS Civil Engineering',
      yearLevel: '3rd Year',
      studentId: '2022-01122-ST-0',
      boardingHouseId: 'bh2',
      roomNumber: 'R-108',
      contactNumbers: ['0955-667-3344', '0912-889-0011'],
      mothersContact: '0918-990-2233',
      email: 'carlos.v@university.edu.ph',
      address: 'San Pablo City, Laguna',
      avatar: null,
      status: 'active',
      moveInDate: '2024-06-20',
      rentStatus: 'overdue'
    },
    {
      id: 's5',
      name: 'Maria Fe L. Gonzales',
      course: 'BS Accountancy',
      yearLevel: '2nd Year',
      studentId: '2023-00334-ST-0',
      boardingHouseId: 'bh1',
      roomNumber: 'R-204',
      contactNumbers: ['0977-112-5566'],
      mothersContact: '0935-778-9900',
      email: 'maria.gonzales@university.edu.ph',
      address: 'Liliw, Laguna',
      avatar: null,
      status: 'active',
      moveInDate: '2024-08-05',
      rentStatus: 'paid'
    },
    {
      id: 's6',
      name: 'Rafael Andrei M. Garcia',
      course: 'BS Architecture',
      yearLevel: '4th Year',
      studentId: '2021-00556-ST-0',
      boardingHouseId: 'bh2',
      roomNumber: 'R-205',
      contactNumbers: ['0966-443-2211', '0928-556-7788'],
      mothersContact: '0917-334-5566',
      email: 'rafael.garcia@university.edu.ph',
      address: 'Nagcarlan, Laguna',
      avatar: null,
      status: 'active',
      moveInDate: '2023-06-15',
      rentStatus: 'paid'
    },
    {
      id: 's7',
      name: 'Patricia Anne B. Reyes',
      course: 'BS Psychology',
      yearLevel: '1st Year',
      studentId: '2024-00778-ST-0',
      boardingHouseId: 'bh1',
      roomNumber: 'R-103',
      contactNumbers: ['0945-221-3344'],
      mothersContact: '0956-887-1122',
      email: 'patricia.reyes@university.edu.ph',
      address: 'Luisiana, Laguna',
      avatar: null,
      status: 'active',
      moveInDate: '2024-08-10',
      rentStatus: 'paid'
    },
    {
      id: 's8',
      name: 'John Mark A. Bautista',
      course: 'BS Mechanical Engineering',
      yearLevel: '3rd Year',
      studentId: '2022-00990-ST-0',
      boardingHouseId: 'bh2',
      roomNumber: 'R-110',
      contactNumbers: ['0933-778-9901', '0917-665-4432'],
      mothersContact: '0928-112-3344',
      email: 'john.bautista@university.edu.ph',
      address: 'Pila, Laguna',
      avatar: null,
      status: 'active',
      moveInDate: '2024-01-15',
      rentStatus: 'overdue'
    },
    {
      id: 's9',
      name: 'Kimberly Joy S. Torres',
      course: 'BS Education',
      yearLevel: '2nd Year',
      studentId: '2023-01234-ST-0',
      boardingHouseId: 'bh1',
      roomNumber: 'R-302',
      contactNumbers: ['0976-554-3322'],
      mothersContact: '0945-332-1100',
      email: 'kimberly.torres@university.edu.ph',
      address: 'Magdalena, Laguna',
      avatar: null,
      status: 'active',
      moveInDate: '2024-06-18',
      rentStatus: 'paid'
    },
    {
      id: 's10',
      name: 'Ezekiel James D. Mendoza',
      course: 'BS Criminology',
      yearLevel: '1st Year',
      studentId: '2024-01567-ST-0',
      boardingHouseId: 'bh2',
      roomNumber: 'R-201',
      contactNumbers: ['0955-998-7766'],
      mothersContact: '0917-443-2210',
      email: 'ezekiel.mendoza@university.edu.ph',
      address: 'Cavinti, Laguna',
      avatar: null,
      status: 'active',
      moveInDate: '2024-08-12',
      rentStatus: 'paid'
    },
    {
      id: 's11',
      name: 'Samantha Nicole T. Ramos',
      course: 'BS Pharmacy',
      yearLevel: '3rd Year',
      studentId: '2022-01890-ST-0',
      boardingHouseId: 'bh1',
      roomNumber: 'R-206',
      contactNumbers: ['0936-887-5544', '0928-221-0099'],
      mothersContact: '0917-556-7788',
      email: 'samantha.ramos@university.edu.ph',
      address: 'Majayjay, Laguna',
      avatar: null,
      status: 'active',
      moveInDate: '2023-08-01',
      rentStatus: 'paid'
    },
    {
      id: 's12',
      name: 'Nathaniel Roy C. Aquino',
      course: 'BS Electrical Engineering',
      yearLevel: '4th Year',
      studentId: '2021-02100-ST-0',
      boardingHouseId: 'bh2',
      roomNumber: 'R-202',
      contactNumbers: ['0977-665-4433'],
      mothersContact: '0956-334-5566',
      email: 'nathaniel.aquino@university.edu.ph',
      address: 'Lumban, Laguna',
      avatar: null,
      status: 'active',
      moveInDate: '2022-06-15',
      rentStatus: 'paid'
    }
  ],

  // ----------------------------------------------------------
  // Concern Categories
  // ----------------------------------------------------------
  concernCategories: [
    {
      id: 'cat1',
      name: 'Contract Issue',
      description: 'Concerns regarding lease agreements, contract renewals, terms and conditions disputes, and early termination requests.',
      priority: 'low',
      icon: 'description',
      color: '#206223'
    },
    {
      id: 'cat2',
      name: 'Theft Issue',
      description: 'Reports of missing personal belongings, unauthorized room access, and security breaches within the premises.',
      priority: 'high',
      icon: 'shield',
      color: '#ba1a1a'
    },
    {
      id: 'cat3',
      name: 'Utility Billing Discrepancy',
      description: 'Disputes over electricity, water, and internet billing calculations, meter reading concerns, and overcharges.',
      priority: 'medium',
      icon: 'receipt_long',
      color: '#8B6914'
    }
  ],

  // ----------------------------------------------------------
  // Individual Concerns
  // ----------------------------------------------------------
  concerns: [
    {
      id: 'c1',
      studentId: 's4',
      categoryId: 'cat1',
      title: 'Contract Renewal Dispute',
      description: 'Requesting early termination of lease due to course transfer to a different campus.',
      dateSubmitted: '2024-11-02',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Admin'
    },
    {
      id: 'c2',
      studentId: 's8',
      categoryId: 'cat2',
      title: 'Missing Laptop from Room',
      description: 'Laptop was left in room R-110 during weekend. Found missing on Monday morning. Door lock appears tampered.',
      dateSubmitted: '2024-11-05',
      status: 'investigating',
      priority: 'high',
      assignedTo: 'Security'
    },
    {
      id: 'c3',
      studentId: 's3',
      categoryId: 'cat3',
      title: 'Electricity Overcharge — October',
      description: 'October electricity bill is ₱2,800 but was away for 2 weeks during midterm break. Requesting meter re-reading.',
      dateSubmitted: '2024-11-08',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Admin'
    },
    {
      id: 'c4',
      studentId: 's1',
      categoryId: 'cat1',
      title: 'Room Transfer Request',
      description: 'Requesting transfer from R-205 to R-302 due to noise issues from adjacent construction.',
      dateSubmitted: '2024-10-28',
      status: 'resolved',
      priority: 'low',
      assignedTo: 'Admin'
    },
    {
      id: 'c5',
      studentId: 's6',
      categoryId: 'cat2',
      title: 'Stolen Bicycle from Parking',
      description: 'Mountain bike was stolen from the parking area. Last seen on Thursday evening.',
      dateSubmitted: '2024-11-01',
      status: 'investigating',
      priority: 'high',
      assignedTo: 'Security'
    },
    {
      id: 'c6',
      studentId: 's9',
      categoryId: 'cat3',
      title: 'Water Bill Split Issue',
      description: 'Water bill split among floor tenants is unfair — room R-302 has fewer occupants but same share.',
      dateSubmitted: '2024-11-10',
      status: 'pending',
      priority: 'low',
      assignedTo: 'Admin'
    },
    {
      id: 'c7',
      studentId: 's10',
      categoryId: 'cat1',
      title: 'Lease Terms Clarification',
      description: 'Need clarification on guest policy and overnight visitor rules mentioned in contract Section 4.2.',
      dateSubmitted: '2024-11-12',
      status: 'resolved',
      priority: 'low',
      assignedTo: 'Admin'
    },
    {
      id: 'c8',
      studentId: 's5',
      categoryId: 'cat2',
      title: 'Missing Package from Lobby',
      description: 'Online order package was delivered and signed for at the lobby but never received.',
      dateSubmitted: '2024-11-14',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Security'
    }
  ],

  // ----------------------------------------------------------
  // Calendar Events
  // ----------------------------------------------------------
  calendarEvents: [
    { id: 'e1', date: '2024-11-04', title: 'Utility Bills Due', type: 'billing', category: 'cat3' },
    { id: 'e2', date: '2024-11-07', title: 'Boarding House Inspection', type: 'inspection', category: null },
    { id: 'e3', date: '2024-11-11', title: 'Contract Renewal Deadline', type: 'contract', category: 'cat1' },
    { id: 'e4', date: '2024-11-15', title: 'Student Assembly', type: 'meeting', category: null },
    { id: 'e5', date: '2024-11-18', title: 'Security Audit', type: 'security', category: 'cat2' },
    { id: 'e6', date: '2024-11-22', title: 'Rent Collection Day', type: 'billing', category: null },
    { id: 'e7', date: '2024-11-25', title: 'Maintenance Schedule', type: 'maintenance', category: null },
    { id: 'e8', date: '2024-11-28', title: 'Fire Drill', type: 'safety', category: null },
    { id: 'e9', date: '2024-12-01', title: 'December Bills Due', type: 'billing', category: 'cat3' },
    { id: 'e10', date: '2024-12-05', title: 'End-of-Sem Inspection', type: 'inspection', category: null },
    { id: 'e11', date: '2024-12-10', title: 'Holiday Break Start', type: 'announcement', category: null },
    { id: 'e12', date: '2024-12-20', title: 'Boarding House Closure', type: 'announcement', category: null }
  ],

  // ----------------------------------------------------------
  // Helper functions
  // ----------------------------------------------------------
  getStudentById(id) {
    return this.students.find(s => s.id === id);
  },

  getStudentsByBoardingHouse(bhId) {
    return this.students.filter(s => s.boardingHouseId === bhId);
  },

  getBoardingHouseById(id) {
    return this.boardingHouses.find(bh => bh.id === id);
  },

  getConcernsByCategory(catId) {
    return this.concerns.filter(c => c.categoryId === catId);
  },

  getConcernsByStudent(studentId) {
    return this.concerns.filter(c => c.studentId === studentId);
  },

  getConcernsByStatus(status) {
    if (status === 'all') return this.concerns;
    return this.concerns.filter(c => c.status === status);
  },

  getEventsForMonth(year, month) {
    return this.calendarEvents.filter(e => {
      const d = new Date(e.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  },

  getStats() {
    return {
      totalStudents: this.totalStudents,
      totalHouses: this.boardingHouses.length,
      totalOccupied: this.boardingHouses.reduce((sum, bh) => sum + bh.occupied, 0),
      totalCapacity: this.boardingHouses.reduce((sum, bh) => sum + bh.capacity, 0),
      pendingConcerns: this.concerns.filter(c => c.status === 'pending').length,
      investigatingConcerns: this.concerns.filter(c => c.status === 'investigating').length,
      resolvedConcerns: this.concerns.filter(c => c.status === 'resolved').length
    };
  }
};
