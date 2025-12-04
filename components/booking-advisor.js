/**
 * Expert Advisor Booking - JavaScript
 * Professional-grade functionality for HR and expert users
 */

(function() {
    'use strict';

    // ===================================
    // Sample Course Data
    // ===================================
    const courses = [
        {
            id: 1,
            title: 'Strategic Leadership in Digital Transformation',
            category: 'leadership',
            instructor: 'Dr. Sarah Chen, MBA, PMP',
            credentials: 'Former VP at Fortune 500, 20+ years experience',
            date: '2025-01-15',
            dateFormatted: 'January 15-17, 2025',
            duration: '3 days',
            price: 2499,
            level: 'advanced',
            spots: 8,
            rating: 4.9,
            reviews: 127,
            description: 'Comprehensive program for senior leaders navigating organizational digital transformation. Covers change management, technology adoption strategies, and stakeholder alignment.',
            curriculum: [
                'Digital transformation frameworks and methodologies',
                'Leading change in complex organizations',
                'Technology selection and vendor management',
                'Building digital culture and capabilities',
                'Measuring ROI and transformation success'
            ]
        },
        {
            id: 2,
            title: 'Advanced Data Analytics for Decision Makers',
            category: 'data',
            instructor: 'Prof. Michael Rodriguez, PhD',
            credentials: 'Data Science Lead, Published researcher',
            date: '2025-01-22',
            dateFormatted: 'January 22-23, 2025',
            duration: '2 days',
            price: 1899,
            level: 'intermediate',
            spots: 12,
            rating: 4.8,
            reviews: 94,
            description: 'Executive-level analytics training focusing on strategic decision-making with data. No programming required - emphasis on interpretation, visualization, and action.',
            curriculum: [
                'Data-driven decision frameworks',
                'Statistical thinking for executives',
                'Predictive analytics and forecasting',
                'Dashboard design and KPI selection',
                'Building data capabilities in your organization'
            ]
        },
        {
            id: 3,
            title: 'Cybersecurity Compliance and Risk Management',
            category: 'compliance',
            instructor: 'James Sullivan, CISSP, CISM',
            credentials: 'Chief Security Officer, 15 years in compliance',
            date: '2025-02-05',
            dateFormatted: 'February 5-6, 2025',
            duration: '2 days',
            price: 1799,
            level: 'intermediate',
            spots: 3,
            rating: 4.9,
            reviews: 156,
            description: 'Comprehensive overview of cybersecurity regulations (GDPR, CCPA, SOC 2) and practical implementation strategies for compliance officers and IT leaders.',
            curriculum: [
                'Regulatory landscape and requirements',
                'Risk assessment methodologies',
                'Building compliance programs',
                'Incident response and reporting',
                'Audit preparation and documentation'
            ]
        },
        {
            id: 4,
            title: 'Machine Learning for Business Leaders',
            category: 'technical',
            instructor: 'Dr. Emily Wang, PhD',
            credentials: 'AI Research Lead, Stanford Alumni',
            date: '2025-02-12',
            dateFormatted: 'February 12-14, 2025',
            duration: '3 days',
            price: 2699,
            level: 'advanced',
            spots: 15,
            rating: 4.7,
            reviews: 83,
            description: 'Non-technical introduction to machine learning for executives. Learn to evaluate ML opportunities, manage ML projects, and understand capabilities and limitations.',
            curriculum: [
                'ML fundamentals for non-technical leaders',
                'Use case identification and ROI analysis',
                'Building vs buying ML solutions',
                'Managing data science teams',
                'Ethical AI and responsible ML practices'
            ]
        },
        {
            id: 5,
            title: 'Effective Communication for Technical Leaders',
            category: 'communication',
            instructor: 'Rachel Martinez, MA',
            credentials: 'Executive Coach, Former McKinsey consultant',
            date: '2025-02-19',
            dateFormatted: 'February 19-20, 2025',
            duration: '2 days',
            price: 1599,
            level: 'intermediate',
            spots: 10,
            rating: 4.9,
            reviews: 201,
            description: 'Strengthen your ability to communicate complex technical concepts to non-technical stakeholders. Includes presentation skills, storytelling, and executive presence.',
            curriculum: [
                'Translating technical concepts for business audiences',
                'Executive presence and confidence',
                'Storytelling with data and technology',
                'Handling difficult conversations',
                'Influence without authority'
            ]
        },
        {
            id: 6,
            title: 'Agile Project Management Mastery',
            category: 'leadership',
            instructor: 'Tom Anderson, CSM, PMI-ACP',
            credentials: 'Agile Coach, 100+ projects delivered',
            date: '2025-03-05',
            dateFormatted: 'March 5-6, 2025',
            duration: '2 days',
            price: 1499,
            level: 'beginner',
            spots: 20,
            rating: 4.8,
            reviews: 167,
            description: 'Comprehensive introduction to Agile methodologies for project managers and team leads. Practical frameworks, tools, and real-world case studies.',
            curriculum: [
                'Agile principles and mindset',
                'Scrum, Kanban, and hybrid approaches',
                'Sprint planning and retrospectives',
                'Managing distributed agile teams',
                'Scaling agile in the organization'
            ]
        },
        {
            id: 7,
            title: 'Financial Analysis for Non-Financial Managers',
            category: 'leadership',
            instructor: 'Patricia Chen, CPA, MBA',
            credentials: 'CFO, 18 years finance leadership',
            date: '2025-03-12',
            dateFormatted: 'March 12-13, 2025',
            duration: '2 days',
            price: 1699,
            level: 'beginner',
            spots: 16,
            rating: 4.7,
            reviews: 142,
            description: 'Essential financial literacy for managers who need to understand budgets, P&L statements, and make data-driven financial decisions.',
            curriculum: [
                'Reading and interpreting financial statements',
                'Budgeting and forecasting fundamentals',
                'Cost analysis and profitability metrics',
                'Capital allocation decisions',
                'Financial communication with executives'
            ]
        },
        {
            id: 8,
            title: 'Cloud Architecture and Strategy',
            category: 'technical',
            instructor: 'Kevin Park, AWS Certified Architect',
            credentials: 'Cloud Solutions Architect, 12 years experience',
            date: '2025-03-19',
            dateFormatted: 'March 19-21, 2025',
            duration: '3 days',
            price: 2399,
            level: 'advanced',
            spots: 0,
            rating: 4.8,
            reviews: 98,
            description: 'Deep dive into cloud architecture patterns, migration strategies, and cost optimization for technical leaders planning cloud initiatives.',
            curriculum: [
                'Cloud architecture patterns and best practices',
                'Migration strategies and planning',
                'Multi-cloud and hybrid strategies',
                'Security and compliance in the cloud',
                'Cost optimization and FinOps'
            ]
        },
        {
            id: 9,
            title: 'Legal and Regulatory Essentials for Tech Companies',
            category: 'compliance',
            instructor: 'Jennifer Walsh, JD',
            credentials: 'Technology Attorney, 14 years practice',
            date: '2025-03-26',
            dateFormatted: 'March 26-27, 2025',
            duration: '2 days',
            price: 1899,
            level: 'intermediate',
            spots: 11,
            rating: 4.6,
            reviews: 76,
            description: 'Practical legal and compliance training for technology executives. Covers contracts, IP, data privacy, and employment law.',
            curriculum: [
                'Contract essentials and negotiation',
                'Intellectual property protection',
                'Data privacy regulations (GDPR, CCPA)',
                'Employment law for growing companies',
                'Managing legal risk'
            ]
        },
        {
            id: 10,
            title: 'Product Management for Technical Leaders',
            category: 'leadership',
            instructor: 'Alex Rivera, CPO',
            credentials: 'Chief Product Officer, Former Google PM',
            date: '2025-04-02',
            dateFormatted: 'April 2-4, 2025',
            duration: '3 days',
            price: 2299,
            level: 'intermediate',
            spots: 14,
            rating: 4.9,
            reviews: 189,
            description: 'Transform technical expertise into product leadership. Learn frameworks for prioritization, roadmapping, and customer-centric product development.',
            curriculum: [
                'Product strategy and vision',
                'Customer discovery and validation',
                'Prioritization frameworks (RICE, KANO)',
                'Roadmap development and communication',
                'Metrics and success measurement'
            ]
        },
        {
            id: 11,
            title: 'Executive Presentation Skills',
            category: 'communication',
            instructor: 'David Thompson, MA',
            credentials: 'Executive Speech Coach, TED speaker',
            date: '2025-04-09',
            dateFormatted: 'April 9, 2025',
            duration: '1 day',
            price: 999,
            level: 'beginner',
            spots: 18,
            rating: 4.8,
            reviews: 134,
            description: 'Intensive one-day workshop on creating and delivering compelling executive presentations. Includes video feedback and coaching.',
            curriculum: [
                'Structure and storytelling for impact',
                'Visual design principles',
                'Delivery techniques and stage presence',
                'Handling Q&A and difficult questions',
                'Video recording and feedback session'
            ]
        },
        {
            id: 12,
            title: 'Advanced Excel and Data Visualization',
            category: 'data',
            instructor: 'Lisa Kumar, MIS',
            credentials: 'Data Analyst, Microsoft MVP',
            date: '2025-04-16',
            dateFormatted: 'April 16-17, 2025',
            duration: '2 days',
            price: 1299,
            level: 'beginner',
            spots: 22,
            rating: 4.7,
            reviews: 213,
            description: 'Master advanced Excel techniques, pivot tables, Power Query, and professional data visualization for business reporting.',
            curriculum: [
                'Advanced formulas and functions',
                'Pivot tables and Power Query',
                'Data cleaning and transformation',
                'Professional chart design',
                'Dashboard creation and automation'
            ]
        }
    ];

    // ===================================
    // State Management
    // ===================================
    let filteredCourses = [...courses];
    let selectedCourses = new Set();
    let currentBookingCourse = null;
    let currentStep = 1;
    let formData = {};

    // ===================================
    // DOM Elements
    // ===================================
    const elements = {
        // Filters
        filterCategory: document.getElementById('filter-category'),
        filterDate: document.getElementById('filter-date'),
        filterLevel: document.getElementById('filter-level'),
        btnCompare: document.getElementById('btn-compare'),
        btnClear: document.getElementById('btn-clear'),
        compareCount: document.getElementById('compare-count'),

        // Course list
        courseContainer: document.getElementById('course-container'),
        courseCount: document.getElementById('course-count'),
        emptyState: document.getElementById('empty-state'),
        emptyStateMessage: document.getElementById('empty-state-message'),
        btnClearFilters: document.getElementById('btn-clear-filters'),
        btnViewAllCourses: document.getElementById('btn-view-all-courses'),
        btnContact: document.getElementById('btn-contact'),

        // Comparison panel
        comparisonPanel: document.getElementById('comparison-panel'),
        comparisonContent: document.getElementById('comparison-content'),
        btnCloseCompare: document.getElementById('btn-close-compare'),

        // Course detail modal
        courseDetailModal: document.getElementById('course-detail-modal'),
        courseDetailContent: document.getElementById('course-detail-content'),
        btnCloseDetail: document.getElementById('btn-close-detail'),
        detailOverlay: document.getElementById('detail-overlay'),

        // Booking modal
        bookingModal: document.getElementById('booking-modal'),
        bookingForm: document.getElementById('booking-form'),
        btnCloseBooking: document.getElementById('btn-close-booking'),
        bookingOverlay: document.getElementById('booking-overlay'),
        bookingCourseName: document.getElementById('booking-course-name'),
        progressStepper: document.getElementById('progress-stepper'),
        btnPrev: document.getElementById('btn-prev'),
        btnNext: document.getElementById('btn-next'),
        btnSubmit: document.getElementById('btn-submit'),

        // Confirmation modal
        confirmationModal: document.getElementById('confirmation-modal'),
        confirmationDetails: document.getElementById('confirmation-details'),
        btnDownloadInvoice: document.getElementById('btn-download-invoice'),
        btnDownloadCalendar: document.getElementById('btn-download-calendar'),
        btnDownloadSyllabus: document.getElementById('btn-download-syllabus'),
        btnCloseConfirmation: document.getElementById('btn-close-confirmation')
    };

    // ===================================
    // Initialize
    // ===================================
    function init() {
        renderCourses();
        attachEventListeners();
    }

    // ===================================
    // Event Listeners
    // ===================================
    function attachEventListeners() {
        // Filters
        elements.filterCategory.addEventListener('change', handleFilterChange);
        elements.filterDate.addEventListener('change', handleFilterChange);
        elements.filterLevel.addEventListener('change', handleFilterChange);
        elements.btnClear.addEventListener('click', handleClearFilters);

        // Empty state actions
        if (elements.btnClearFilters) {
            elements.btnClearFilters.addEventListener('click', handleClearFilters);
        }
        if (elements.btnViewAllCourses) {
            elements.btnViewAllCourses.addEventListener('click', handleClearFilters);
        }
        if (elements.btnContact) {
            elements.btnContact.addEventListener('click', handleContactRequest);
        }

        // Comparison
        elements.btnCompare.addEventListener('click', showComparisonPanel);
        elements.btnCloseCompare.addEventListener('click', hideComparisonPanel);

        // Modal close buttons
        elements.btnCloseDetail.addEventListener('click', () => closeModal('detail'));
        elements.detailOverlay.addEventListener('click', () => closeModal('detail'));
        elements.btnCloseBooking.addEventListener('click', () => closeModal('booking'));
        elements.bookingOverlay.addEventListener('click', () => closeModal('booking'));
        elements.btnCloseConfirmation.addEventListener('click', () => closeModal('confirmation'));

        // Booking form navigation
        elements.btnPrev.addEventListener('click', handlePrevStep);
        elements.btnNext.addEventListener('click', handleNextStep);
        elements.bookingForm.addEventListener('submit', handleFormSubmit);

        // Confirmation actions
        elements.btnDownloadInvoice.addEventListener('click', () => downloadDocument('invoice'));
        elements.btnDownloadCalendar.addEventListener('click', () => downloadDocument('calendar'));
        elements.btnDownloadSyllabus.addEventListener('click', () => downloadDocument('syllabus'));
    }

    // ===================================
    // Render Courses
    // ===================================
    function renderCourses() {
        elements.courseContainer.innerHTML = '';

        if (filteredCourses.length === 0) {
            elements.emptyState.style.display = 'block';
            elements.courseCount.textContent = '0 courses found';
            updateEmptyStateMessage();
            return;
        }

        elements.emptyState.style.display = 'none';
        elements.courseCount.textContent = `${filteredCourses.length} course${filteredCourses.length !== 1 ? 's' : ''} found`;

        filteredCourses.forEach(course => {
            const row = createCourseRow(course);
            elements.courseContainer.appendChild(row);
        });
    }

    function updateEmptyStateMessage() {
        const hasCategory = elements.filterCategory.value !== '';
        const hasDate = elements.filterDate.value !== '';
        const hasLevel = elements.filterLevel.value !== '';

        const activeFilters = [];
        if (hasCategory) {
            const categoryOption = elements.filterCategory.options[elements.filterCategory.selectedIndex];
            activeFilters.push(categoryOption.text);
        }
        if (hasDate) {
            const dateOption = elements.filterDate.options[elements.filterDate.selectedIndex];
            activeFilters.push(dateOption.text);
        }
        if (hasLevel) {
            const levelOption = elements.filterLevel.options[elements.filterLevel.selectedIndex];
            activeFilters.push(levelOption.text);
        }

        let message = '';
        if (activeFilters.length > 0) {
            message = `No courses found matching: <strong>${activeFilters.join(', ')}</strong>`;
        } else {
            message = 'No courses available at this time.';
        }

        elements.emptyStateMessage.innerHTML = message;

        // Show/hide suggestion buttons based on context
        if (elements.btnClearFilters && elements.btnViewAllCourses) {
            const hasAnyFilter = hasCategory || hasDate || hasLevel;
            elements.btnClearFilters.style.display = hasAnyFilter ? 'inline-block' : 'none';
            elements.btnViewAllCourses.style.display = hasAnyFilter ? 'inline-block' : 'none';
        }
    }

    function handleContactRequest() {
        alert('Contact form would open here. In production, this would open a modal or redirect to a contact page.');
    }

    function createCourseRow(course) {
        const row = document.createElement('div');
        row.className = 'course-row';
        row.dataset.courseId = course.id;

        // Availability status
        let availabilityClass, availabilityText;
        if (course.spots === 0) {
            availabilityClass = 'full';
            availabilityText = 'Session full';
        } else if (course.spots <= 3) {
            availabilityClass = 'low';
            availabilityText = `${course.spots} left`;
        } else if (course.spots <= 10) {
            availabilityClass = 'medium';
            availabilityText = `${course.spots} available`;
        } else {
            availabilityClass = 'high';
            availabilityText = `${course.spots} available`;
        }

        row.innerHTML = `
            <input type="checkbox" class="course-row__checkbox" data-course-id="${course.id}"
                   ${course.spots === 0 ? 'disabled' : ''}
                   ${selectedCourses.has(course.id) ? 'checked' : ''}
                   aria-label="Select ${course.title} for comparison">

            <div class="course-row__info">
                <a href="#" class="course-row__title" data-course-id="${course.id}"
                   onclick="window.advisorBooking.showCourseDetail(${course.id}); return false;">
                    ${course.title}
                </a>
                <div class="course-row__category">${getCategoryLabel(course.category)}</div>
            </div>

            <div class="course-row__instructor">${course.instructor}</div>

            <div class="course-row__date">${course.dateFormatted}</div>

            <div class="course-row__duration">${course.duration}</div>

            <div class="course-row__level course-row__level--${course.level}">${course.level}</div>

            <div class="course-row__availability">
                <span class="availability-dot availability-dot--${availabilityClass}" aria-hidden="true"></span>
                <span class="availability-text">${availabilityText}</span>
            </div>

            <div class="course-row__price">$${course.price.toLocaleString()}</div>
        `;

        // Add checkbox listener
        const checkbox = row.querySelector('.course-row__checkbox');
        checkbox.addEventListener('change', handleCourseSelect);

        return row;
    }

    function getCategoryLabel(category) {
        const labels = {
            leadership: 'Leadership & Management',
            technical: 'Technical Skills',
            compliance: 'Compliance & Safety',
            communication: 'Communication',
            data: 'Data & Analytics'
        };
        return labels[category] || category;
    }

    // ===================================
    // Filter Handling
    // ===================================
    function handleFilterChange() {
        const category = elements.filterCategory.value;
        const date = elements.filterDate.value;
        const level = elements.filterLevel.value;

        filteredCourses = courses.filter(course => {
            if (category && course.category !== category) return false;
            if (level && course.level !== level) return false;
            if (date && !matchesDateRange(course.date, date)) return false;
            return true;
        });

        renderCourses();
    }

    function matchesDateRange(courseDate, range) {
        const date = new Date(courseDate);
        const now = new Date();

        switch(range) {
            case 'this-month':
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
            case 'next-month':
                const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
                return date.getMonth() === nextMonth.getMonth() && date.getFullYear() === nextMonth.getFullYear();
            case 'this-quarter':
                const thisQ = Math.floor(now.getMonth() / 3);
                const courseQ = Math.floor(date.getMonth() / 3);
                return courseQ === thisQ && date.getFullYear() === now.getFullYear();
            case 'next-quarter':
                const nextQ = (Math.floor(now.getMonth() / 3) + 1) % 4;
                const courseNextQ = Math.floor(date.getMonth() / 3);
                return courseNextQ === nextQ;
            default:
                return true;
        }
    }

    function handleClearFilters() {
        elements.filterCategory.value = '';
        elements.filterDate.value = '';
        elements.filterLevel.value = '';
        handleFilterChange();
    }

    // ===================================
    // Course Selection & Comparison
    // ===================================
    function handleCourseSelect(e) {
        const courseId = parseInt(e.target.dataset.courseId);

        if (e.target.checked) {
            selectedCourses.add(courseId);
        } else {
            selectedCourses.delete(courseId);
        }

        updateCompareButton();
    }

    function updateCompareButton() {
        elements.compareCount.textContent = selectedCourses.size;
        elements.btnCompare.disabled = selectedCourses.size < 2;
    }

    function showComparisonPanel() {
        if (selectedCourses.size < 2) return;

        const selectedCourseData = courses.filter(c => selectedCourses.has(c.id));
        renderComparisonTable(selectedCourseData);
        elements.comparisonPanel.style.display = 'block';
    }

    function hideComparisonPanel() {
        elements.comparisonPanel.style.display = 'none';
    }

    function renderComparisonTable(coursesToCompare) {
        const table = document.createElement('table');
        table.className = 'comparison-table';

        const headers = ['Feature', ...coursesToCompare.map(c => '')];
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        headers.forEach((header, index) => {
            const th = document.createElement('th');
            if (index === 0) {
                th.textContent = header;
            } else {
                const course = coursesToCompare[index - 1];
                th.innerHTML = `<div class="comparison-table__course-name">${course.title}</div>`;
            }
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        const rows = [
            { label: 'Instructor', values: coursesToCompare.map(c => c.instructor) },
            { label: 'Date', values: coursesToCompare.map(c => c.dateFormatted) },
            { label: 'Duration', values: coursesToCompare.map(c => c.duration) },
            { label: 'Level', values: coursesToCompare.map(c => c.level) },
            { label: 'Price', values: coursesToCompare.map(c => `$${c.price.toLocaleString()}`) },
            { label: 'Spots Available', values: coursesToCompare.map(c => c.spots === 0 ? 'Full' : `${c.spots} available`) },
            { label: 'Rating', values: coursesToCompare.map(c => `${c.rating} ★ (${c.reviews} reviews)`) },
            { label: 'Action', values: coursesToCompare.map((c, i) => `<button class="comparison-table__select-btn" onclick="window.advisorBooking.showCourseDetail(${c.id}); return false;">View Details</button>`) }
        ];

        rows.forEach(row => {
            const tr = document.createElement('tr');
            const labelTd = document.createElement('td');
            labelTd.innerHTML = `<strong>${row.label}</strong>`;
            tr.appendChild(labelTd);

            row.values.forEach(value => {
                const td = document.createElement('td');
                td.innerHTML = value;
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        elements.comparisonContent.innerHTML = '';
        elements.comparisonContent.appendChild(table);
    }

    // ===================================
    // Course Detail Modal
    // ===================================
    function showCourseDetail(courseId) {
        const course = courses.find(c => c.id === courseId);
        if (!course) return;

        elements.courseDetailContent.innerHTML = `
            <div class="course-detail">
                <div class="course-detail__header">
                    <div class="course-detail__category">${getCategoryLabel(course.category)}</div>
                    <h2 class="course-detail__title">${course.title}</h2>
                    <div class="course-detail__instructor">
                        <div>
                            <div class="instructor__name">${course.instructor}</div>
                            <div class="instructor__credentials">${course.credentials}</div>
                        </div>
                    </div>
                </div>

                <div class="course-detail__meta">
                    <div class="meta-item">
                        <div class="meta-item__label">Date</div>
                        <div class="meta-item__value">${course.dateFormatted}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-item__label">Duration</div>
                        <div class="meta-item__value">${course.duration}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-item__label">Level</div>
                        <div class="meta-item__value">${course.level}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-item__label">Price</div>
                        <div class="meta-item__value">$${course.price.toLocaleString()}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-item__label">Availability</div>
                        <div class="meta-item__value">${course.spots === 0 ? 'Session Full' : `${course.spots} spots`}</div>
                    </div>
                </div>

                <div class="course-detail__description">
                    <h3 class="course-detail__subtitle">Course Overview</h3>
                    <p class="course-detail__text">${course.description}</p>
                </div>

                <div class="course-detail__curriculum">
                    <h3 class="course-detail__subtitle">What You'll Learn</h3>
                    <ul class="curriculum-list">
                        ${course.curriculum.map((item, index) => `
                            <li class="curriculum-item">
                                <div class="curriculum-item__number">${index + 1}.</div>
                                <div class="curriculum-item__text">${item}</div>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="course-detail__reviews">
                    <h3 class="course-detail__subtitle">Participant Reviews</h3>
                    <div class="review-summary">
                        <div class="review-summary__rating">${course.rating}</div>
                        <div>
                            <div class="review-summary__stars">${'★'.repeat(Math.round(course.rating))}${'☆'.repeat(5 - Math.round(course.rating))}</div>
                            <div class="review-summary__count">${course.reviews} reviews</div>
                        </div>
                    </div>
                </div>

                ${course.spots > 0 ? `
                    <div class="course-detail__action">
                        <button type="button" class="btn-register" onclick="window.advisorBooking.startBooking(${course.id})">
                            Register Participant
                        </button>
                    </div>
                ` : `
                    <div class="course-detail__action">
                        <button type="button" class="btn-register" disabled style="opacity: 0.5; cursor: not-allowed;">
                            Session Full - Contact for Alternatives
                        </button>
                    </div>
                `}
            </div>
        `;

        openModalWithFocusTrap(elements.courseDetailModal);
    }

    // ===================================
    // Booking Flow
    // ===================================
    function startBooking(courseId) {
        const course = courses.find(c => c.id === courseId);
        if (!course || course.spots === 0) return;

        currentBookingCourse = course;
        currentStep = 1;
        formData = {};

        elements.bookingCourseName.textContent = `${course.title} - ${course.dateFormatted}`;

        // Reset form
        elements.bookingForm.reset();
        showStep(1);

        // Update invoice preview
        updateInvoicePreview();

        // Close detail modal and show booking modal
        closeModal('detail');
        openModalWithFocusTrap(elements.bookingModal);
    }

    function announceStep(stepNumber, totalSteps, stepTitle) {
        const announcer = document.getElementById('step-announcer');
        if (announcer) {
            announcer.textContent = `Step ${stepNumber} of ${totalSteps}: ${stepTitle}`;
        }
    }

    function showStep(step) {
        currentStep = step;

        // Hide all steps
        document.querySelectorAll('.booking-form__step').forEach(s => {
            s.style.display = 'none';
        });

        // Show current step
        const currentStepEl = document.getElementById(`step-${step}`);
        if (currentStepEl) {
            currentStepEl.style.display = 'block';
        }

        // Update progress stepper
        document.querySelectorAll('.progress-stepper__step').forEach((stepEl, index) => {
            stepEl.classList.remove('progress-stepper__step--active', 'progress-stepper__step--completed');
            if (index + 1 < step) {
                stepEl.classList.add('progress-stepper__step--completed');
            } else if (index + 1 === step) {
                stepEl.classList.add('progress-stepper__step--active');
            }
        });

        // Announce step change for screen readers
        const stepTitles = ['Participant', 'Billing', 'Review'];
        announceStep(step, 3, stepTitles[step - 1]);

        // Update buttons
        elements.btnPrev.style.display = step > 1 ? 'block' : 'none';
        elements.btnNext.style.display = step < 3 ? 'block' : 'none';
        elements.btnSubmit.style.display = step === 3 ? 'block' : 'none';
    }

    function handlePrevStep() {
        if (currentStep > 1) {
            saveFormData();
            showStep(currentStep - 1);
        }
    }

    function handleNextStep() {
        if (validateCurrentStep()) {
            saveFormData();
            if (currentStep === 2) {
                populateReviewSummary();
            }
            showStep(currentStep + 1);
        }
    }

    function validateCurrentStep() {
        const currentStepEl = document.getElementById(`step-${currentStep}`);
        const requiredInputs = currentStepEl.querySelectorAll('[required]');

        let isValid = true;
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--color-error)';
                isValid = false;
            } else {
                input.style.borderColor = 'var(--color-border)';
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields.');
        }

        return isValid;
    }

    function saveFormData() {
        const inputs = document.querySelectorAll('.booking-form input, .booking-form textarea');
        inputs.forEach(input => {
            if (input.name) {
                formData[input.name] = input.value;
            }
        });
    }

    function updateInvoicePreview() {
        if (!currentBookingCourse) return;

        document.getElementById('invoice-course').textContent = currentBookingCourse.title;
        document.getElementById('invoice-duration').textContent = currentBookingCourse.duration;
        document.getElementById('invoice-date').textContent = currentBookingCourse.dateFormatted;
        document.getElementById('invoice-total').textContent = `$${currentBookingCourse.price.toLocaleString()}`;
    }

    function populateReviewSummary() {
        // Course details
        document.getElementById('review-course').textContent = currentBookingCourse.title;
        document.getElementById('review-instructor').textContent = currentBookingCourse.instructor;
        document.getElementById('review-date').textContent = currentBookingCourse.dateFormatted;
        document.getElementById('review-duration').textContent = currentBookingCourse.duration;
        document.getElementById('review-price').textContent = `$${currentBookingCourse.price.toLocaleString()}`;

        // Participant details
        document.getElementById('review-name').textContent = formData.name || '-';
        document.getElementById('review-email').textContent = formData.email || '-';
        document.getElementById('review-company').textContent = formData.company || '-';

        const roleRow = document.getElementById('review-role-row');
        if (formData.role) {
            document.getElementById('review-role').textContent = formData.role;
            roleRow.style.display = 'flex';
        } else {
            roleRow.style.display = 'none';
        }

        // Billing details
        const billingEmailRow = document.getElementById('review-billing-email-row');
        if (formData.billing_email) {
            document.getElementById('review-billing-email').textContent = formData.billing_email;
            billingEmailRow.style.display = 'flex';
        } else {
            billingEmailRow.style.display = 'none';
        }

        const poRow = document.getElementById('review-po-row');
        if (formData.po_number) {
            document.getElementById('review-po').textContent = formData.po_number;
            poRow.style.display = 'flex';
        } else {
            poRow.style.display = 'none';
        }

        const notesRow = document.getElementById('review-notes-row');
        if (formData.notes) {
            document.getElementById('review-notes').textContent = formData.notes;
            notesRow.style.display = 'flex';
        } else {
            notesRow.style.display = 'none';
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        if (currentStep !== 3) return;

        saveFormData();

        // Simulate processing
        elements.btnSubmit.textContent = 'Processing registration...';
        elements.btnSubmit.disabled = true;

        setTimeout(() => {
            showConfirmation();
            elements.btnSubmit.textContent = 'Complete Registration';
            elements.btnSubmit.disabled = false;
        }, 1500);
    }

    function showConfirmation() {
        closeModal('booking');

        // Populate confirmation details
        elements.confirmationDetails.innerHTML = `
            <div class="review-row">
                <span class="review-row__label">Course:</span>
                <span class="review-row__value">${currentBookingCourse.title}</span>
            </div>
            <div class="review-row">
                <span class="review-row__label">Participant:</span>
                <span class="review-row__value">${formData.name}</span>
            </div>
            <div class="review-row">
                <span class="review-row__label">Date:</span>
                <span class="review-row__value">${currentBookingCourse.dateFormatted}</span>
            </div>
            <div class="review-row">
                <span class="review-row__label">Confirmation sent to:</span>
                <span class="review-row__value">${formData.email}</span>
            </div>
            <div class="review-row">
                <span class="review-row__label">Invoice sent to:</span>
                <span class="review-row__value">${formData.billing_email || formData.email}</span>
            </div>
        `;

        openModalWithFocusTrap(elements.confirmationModal);
    }

    // ===================================
    // Modal Management
    // ===================================
    let lastFocusedElement = null;
    let modalKeydownHandler = null;

    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Remove previous handler if it exists
        if (modalKeydownHandler) {
            modal.removeEventListener('keydown', modalKeydownHandler);
        }

        modalKeydownHandler = function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
            if (e.key === 'Escape') {
                // Determine which modal is open and close it
                if (modal.style.display === 'flex') {
                    if (modal === elements.courseDetailModal) {
                        closeModal('detail');
                    } else if (modal === elements.bookingModal) {
                        closeModal('booking');
                    } else if (modal === elements.confirmationModal) {
                        closeModal('confirmation');
                    }
                }
            }
        };

        modal.addEventListener('keydown', modalKeydownHandler);

        if (firstElement) firstElement.focus();
    }

    function openModalWithFocusTrap(modal) {
        lastFocusedElement = document.activeElement;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Setup focus trap
        setTimeout(() => {
            trapFocus(modal);
        }, 100);
    }

    function closeModal(type) {
        let modalElement = null;

        switch(type) {
            case 'detail':
                elements.courseDetailModal.style.display = 'none';
                modalElement = elements.courseDetailModal;
                break;
            case 'booking':
                elements.bookingModal.style.display = 'none';
                modalElement = elements.bookingModal;
                break;
            case 'confirmation':
                elements.confirmationModal.style.display = 'none';
                modalElement = elements.confirmationModal;
                // Reset for next booking
                currentBookingCourse = null;
                formData = {};
                elements.bookingForm.reset();
                break;
        }

        document.body.style.overflow = '';

        // Return focus to the element that opened the modal
        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }

    // ===================================
    // Document Downloads (Simulated)
    // ===================================
    function downloadDocument(type) {
        const messages = {
            invoice: 'Invoice downloaded successfully',
            calendar: 'Calendar event added',
            syllabus: 'Course syllabus downloaded'
        };

        alert(messages[type] || 'Document downloaded');
    }

    // ===================================
    // Public API
    // ===================================
    window.advisorBooking = {
        showCourseDetail,
        startBooking
    };

    // ===================================
    // Start Application
    // ===================================
    init();

})();
