// Course data
const courses = {
    'design-systems': {
        title: 'Design Systems Fundamentals',
        instructor: 'Sarah Chen',
        date: 'Dec 15-16, 2025',
        duration: '2 days',
        price: '$899',
        availability: 12,
        total: 20,
        learning: [
            'Component architecture and atomic design principles',
            'Creating scalable design tokens',
            'Documentation best practices',
            'Version control for design systems'
        ],
        prerequisites: 'Basic understanding of UI design and development workflows. Familiarity with design tools like Figma or Sketch recommended.',
        includes: [
            'Interactive workshops and hands-on exercises',
            'Design system starter kit',
            'Lifetime access to course materials',
            'Certificate of completion'
        ]
    },
    'advanced-react': {
        title: 'Advanced React Patterns',
        instructor: 'Marcus Rodriguez',
        date: 'Dec 20-21, 2025',
        duration: '2 days',
        price: '$1,099',
        availability: 4,
        total: 20,
        learning: [
            'Advanced hooks patterns and custom hooks',
            'State management with Context and Zustand',
            'Performance optimization techniques',
            'Testing strategies for complex components'
        ],
        prerequisites: 'Solid understanding of React fundamentals including hooks, component lifecycle, and state management. 6+ months of React development experience.',
        includes: [
            'Live coding sessions with expert instructor',
            'Real-world project examples',
            'Code review and personalized feedback',
            'Certificate of completion'
        ]
    },
    'api-design': {
        title: 'RESTful API Design',
        instructor: 'Aisha Patel',
        date: 'Jan 8-9, 2026',
        duration: '2 days',
        price: '$799',
        availability: 18,
        total: 20,
        learning: [
            'RESTful architecture principles',
            'API versioning strategies',
            'Authentication and authorization patterns',
            'Documentation with OpenAPI/Swagger'
        ],
        prerequisites: 'Basic understanding of HTTP protocols and backend development. Some experience with any server-side language helpful but not required.',
        includes: [
            'API design workshop with real scenarios',
            'OpenAPI template and best practices guide',
            'Access to recorded sessions',
            'Certificate of completion'
        ]
    },
    'ux-research': {
        title: 'UX Research Methods',
        instructor: 'James Kim',
        date: 'Jan 15-17, 2026',
        duration: '3 days',
        price: '$1,299',
        availability: 3,
        total: 20,
        learning: [
            'Qualitative and quantitative research methods',
            'User interview techniques',
            'Usability testing and analysis',
            'Creating actionable insights from data'
        ],
        prerequisites: 'Interest in understanding user behavior. No prior research experience required, though basic UX/UI knowledge is helpful.',
        includes: [
            'Hands-on research project',
            'Research toolkit and templates',
            'One-on-one mentorship session',
            'Certificate of completion'
        ]
    }
};

// State
let selectedCourse = null;
let focusTrapElements = [];

// Elements
const courseCards = document.querySelectorAll('.course-card');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');
const courseList = document.querySelector('.course-list');

const accordionTrigger = document.getElementById('accordionTrigger');
const accordionContent = document.getElementById('accordionContent');

const bookingForm = document.getElementById('bookingForm');
const modal = document.getElementById('successModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

// Course card click handlers
courseCards.forEach(card => {
    card.addEventListener('click', () => openSidebar(card.dataset.courseId));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openSidebar(card.dataset.courseId);
        }
    });
});

// Open sidebar with course details
function openSidebar(courseId) {
    selectedCourse = courseId;
    const course = courses[courseId];

    // Populate sidebar
    document.getElementById('sidebarTitle').textContent = course.title;
    document.getElementById('sidebarInstructor').textContent = course.instructor;
    document.getElementById('sidebarDate').textContent = course.date;
    document.getElementById('sidebarDuration').textContent = course.duration;
    document.getElementById('sidebarPrice').textContent = course.price;

    const availabilityText = course.availability <= 5
        ? `Only ${course.availability} spots remaining`
        : `${course.availability} spots available`;
    document.getElementById('sidebarAvailability').textContent = availabilityText;

    // Populate accordion content
    const learningList = document.getElementById('accordionLearning');
    learningList.innerHTML = course.learning.map(item => `<li>${item}</li>`).join('');

    document.getElementById('accordionPrerequisites').textContent = course.prerequisites;

    const includesList = document.getElementById('accordionIncludes');
    includesList.innerHTML = course.includes.map(item => `<li>${item}</li>`).join('');

    // Show sidebar
    sidebar.classList.add('open');
    sidebar.setAttribute('aria-hidden', 'false');
    courseList.classList.add('sidebar-open');

    // Animate in with slight delay for smooth feel
    setTimeout(() => {
        sidebarClose.focus();
    }, 300);
}

// Close sidebar
function closeSidebar() {
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
    courseList.classList.remove('sidebar-open');
    selectedCourse = null;

    // Reset accordion
    accordionTrigger.setAttribute('aria-expanded', 'false');
    accordionContent.setAttribute('aria-hidden', 'true');

    // Reset form
    bookingForm.reset();
    clearFormErrors();
}

sidebarClose.addEventListener('click', closeSidebar);

// Close sidebar on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal.classList.contains('open')) {
            closeModal();
        } else if (sidebar.classList.contains('open')) {
            closeSidebar();
        }
    }
});

// Accordion functionality
accordionTrigger.addEventListener('click', () => {
    const isExpanded = accordionTrigger.getAttribute('aria-expanded') === 'true';
    accordionTrigger.setAttribute('aria-expanded', !isExpanded);
    accordionContent.setAttribute('aria-hidden', isExpanded);
});

// Form validation
const validators = {
    name: (value) => {
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return null;
    },
    email: (value) => {
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return null;
    }
};

function validateField(fieldName, value) {
    const validator = validators[fieldName];
    return validator ? validator(value) : null;
}

function showFieldError(fieldName, errorMessage) {
    const input = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);

    if (errorMessage) {
        input.classList.add('error');
        errorElement.textContent = errorMessage;
    } else {
        input.classList.remove('error');
        errorElement.textContent = '';
    }
}

function clearFormErrors() {
    Object.keys(validators).forEach(fieldName => {
        showFieldError(fieldName, null);
    });
}

// Real-time validation
['name', 'email'].forEach(fieldName => {
    const input = document.getElementById(fieldName);

    input.addEventListener('blur', () => {
        const error = validateField(fieldName, input.value);
        showFieldError(fieldName, error);
    });

    input.addEventListener('input', () => {
        // Clear error on input if field was previously invalid
        if (input.classList.contains('error')) {
            const error = validateField(fieldName, input.value);
            if (!error) {
                showFieldError(fieldName, null);
            }
        }
    });
});

// Form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(bookingForm);
    let hasErrors = false;

    // Validate all required fields
    Object.keys(validators).forEach(fieldName => {
        const value = formData.get(fieldName);
        const error = validateField(fieldName, value);
        showFieldError(fieldName, error);
        if (error) hasErrors = true;
    });

    if (!hasErrors) {
        // Simulate booking process
        const submitButton = bookingForm.querySelector('.form-submit');
        const originalText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = `
            <svg class="form-submit__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="10" cy="10" r="8" opacity="0.3"/>
            </svg>
            Confirming availability...
        `;

        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            openModal();
        }, 1500);
    }
});

// Modal functions
function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    // Build focus trap
    focusTrapElements = [
        modalClose,
        document.getElementById('modalAddCalendar'),
        document.getElementById('modalShare'),
        document.getElementById('modalViewAll')
    ];

    modalClose.focus();
}

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');

    // Return focus to sidebar
    if (sidebar.classList.contains('open')) {
        sidebarClose.focus();
    }

    // Close sidebar after modal closes
    setTimeout(() => {
        closeSidebar();
    }, 300);
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Modal action buttons
document.getElementById('modalAddCalendar').addEventListener('click', () => {
    console.log('Add to calendar clicked');
    // In a real app, this would trigger calendar integration
    closeModal();
});

document.getElementById('modalShare').addEventListener('click', () => {
    console.log('Share clicked');
    // In a real app, this would open share dialog
    closeModal();
});

document.getElementById('modalViewAll').addEventListener('click', () => {
    console.log('View all bookings clicked');
    // In a real app, this would navigate to bookings page
    closeModal();
});

// Focus trap in modal
modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && modal.classList.contains('open')) {
        const firstElement = focusTrapElements[0];
        const lastElement = focusTrapElements[focusTrapElements.length - 1];

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});

// Accessibility: announce dynamic content changes
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Screen reader only styles
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(style);

// Announce sidebar open
const originalOpenSidebar = openSidebar;
openSidebar = function(courseId) {
    originalOpenSidebar(courseId);
    const course = courses[courseId];
    announceToScreenReader(`Course details panel opened for ${course.title}`);
};

// Announce modal open
const originalOpenModal = openModal;
openModal = function() {
    originalOpenModal();
    announceToScreenReader('Booking confirmed! Success dialog opened.');
};

// Initialize: Focus first course card for keyboard users
window.addEventListener('load', () => {
    console.log('Smart Booking showcase loaded');
});
