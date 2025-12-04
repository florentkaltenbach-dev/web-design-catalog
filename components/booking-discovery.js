// ============================================
// Course Discovery - Interactive Booking Experience
// ============================================

(function() {
    'use strict';

    // ============================================
    // Data & State
    // ============================================
    const courses = [
        {
            id: 1,
            title: "Mindful Leadership: Leading with Presence",
            description: "Transform your leadership style through mindfulness practices and emotional intelligence. Learn to lead with clarity, compassion, and authentic presence.",
            duration: "8 weeks",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop",
            badge: "Popular",
            instructor: {
                name: "Dr. Sarah Chen",
                title: "Leadership Coach & Mindfulness Expert",
                avatar: "https://i.pravatar.cc/150?img=1",
                bio: "With 15 years of experience in organizational psychology and mindfulness-based leadership, Sarah has helped hundreds of executives find their authentic leadership voice."
            },
            curriculum: [
                "The Foundation of Mindful Leadership",
                "Emotional Intelligence in Action",
                "Navigating Difficult Conversations",
                "Building Trust and Psychological Safety",
                "Leading Through Change",
                "Creating a Culture of Well-being"
            ],
            availability: "Spots available"
        },
        {
            id: 2,
            title: "Creative Problem Solving: Design Thinking Workshop",
            description: "Master the art of innovative thinking and creative problem-solving. Apply design thinking methodologies to real-world challenges.",
            duration: "6 weeks",
            image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=450&fit=crop",
            badge: "New",
            instructor: {
                name: "Marcus Rodriguez",
                title: "Innovation Strategist",
                avatar: "https://i.pravatar.cc/150?img=12",
                bio: "Marcus brings a decade of experience from leading design firms and tech startups, specializing in innovation strategy and creative facilitation."
            },
            curriculum: [
                "Introduction to Design Thinking",
                "Empathy and User Research",
                "Ideation Techniques",
                "Rapid Prototyping",
                "Testing and Iteration",
                "Implementing Solutions"
            ],
            availability: "Spots available"
        },
        {
            id: 3,
            title: "Data Storytelling: Communicating with Impact",
            description: "Learn to transform complex data into compelling narratives that drive decision-making. Master visualization and presentation techniques.",
            duration: "5 weeks",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
            badge: "Trending",
            instructor: {
                name: "Dr. Amanda Liu",
                title: "Data Scientist & Communication Expert",
                avatar: "https://i.pravatar.cc/150?img=5",
                bio: "Amanda combines deep technical expertise with exceptional communication skills, having trained data teams at Fortune 500 companies."
            },
            curriculum: [
                "The Art of Data Storytelling",
                "Effective Visualization Principles",
                "Choosing the Right Chart",
                "Interactive Dashboards",
                "Presentation Skills",
                "Executive Communication"
            ],
            availability: "Filling up fast"
        },
        {
            id: 4,
            title: "Resilience and Well-being: Thriving Under Pressure",
            description: "Build resilience and sustainable well-being practices. Learn science-backed techniques to manage stress and maintain peak performance.",
            duration: "7 weeks",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=450&fit=crop",
            instructor: {
                name: "James Thompson",
                title: "Positive Psychology Practitioner",
                avatar: "https://i.pravatar.cc/150?img=8",
                bio: "James specializes in evidence-based resilience training, working with professionals in high-stress environments to build sustainable well-being."
            },
            curriculum: [
                "Understanding Stress and Resilience",
                "Building Mental Fitness",
                "Emotional Regulation Techniques",
                "Creating Healthy Boundaries",
                "Energy Management",
                "Sustaining Long-term Well-being"
            ],
            availability: "Spots available"
        },
        {
            id: 5,
            title: "Strategic Communication: Influence with Integrity",
            description: "Develop powerful communication skills that inspire action and build trust. Master the art of persuasion with authenticity.",
            duration: "6 weeks",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=450&fit=crop",
            instructor: {
                name: "Elena Kowalski",
                title: "Executive Communication Coach",
                avatar: "https://i.pravatar.cc/150?img=9",
                bio: "Elena has coached C-suite executives and political leaders on strategic communication, helping them articulate vision and drive change."
            },
            curriculum: [
                "Foundations of Strategic Communication",
                "Crafting Your Message",
                "Storytelling for Impact",
                "Non-verbal Communication",
                "Managing Difficult Dialogues",
                "Influencing Across Cultures"
            ],
            availability: "Spots available"
        },
        {
            id: 6,
            title: "Systems Thinking: Seeing the Bigger Picture",
            description: "Learn to navigate complexity and understand interconnections. Apply systems thinking to solve organizational challenges.",
            duration: "8 weeks",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop",
            instructor: {
                name: "Dr. Robert Park",
                title: "Systems Thinking Consultant",
                avatar: "https://i.pravatar.cc/150?img=13",
                bio: "Robert has spent 20 years helping organizations tackle complex challenges through systems thinking and organizational design."
            },
            curriculum: [
                "Introduction to Systems Thinking",
                "Identifying Patterns and Trends",
                "Causal Loop Diagrams",
                "Leverage Points for Change",
                "Unintended Consequences",
                "Systems Leadership"
            ],
            availability: "Spots available"
        }
    ];

    let state = {
        currentStep: 1,
        selectedCourse: null,
        formData: {
            name: '',
            email: '',
            goals: '',
            experience: ''
        }
    };

    // ============================================
    // Initialize
    // ============================================
    function init() {
        renderCourseGrid();
        setupEventListeners();
        loadSavedData();
    }

    // ============================================
    // Course Grid Rendering
    // ============================================
    function renderCourseGrid() {
        const grid = document.getElementById('courses-grid');
        if (!grid) return;

        grid.innerHTML = courses.map((course, index) => `
            <article class="course-card" data-course-id="${course.id}" style="animation-delay: ${index * 0.1}s">
                <div class="course-card__image-wrapper">
                    <img
                        src="${course.image}"
                        alt="${course.title}"
                        class="course-card__image"
                        loading="lazy"
                    >
                    ${course.badge ? `<span class="course-card__badge">${course.badge}</span>` : ''}
                </div>
                <div class="course-card__content">
                    <div class="course-card__duration">${course.duration}</div>
                    <h3 class="course-card__title">${course.title}</h3>
                    <p class="course-card__description">${course.description}</p>
                    <div class="course-card__instructor">
                        <img
                            src="${course.instructor.avatar}"
                            alt="${course.instructor.name}"
                            class="course-card__instructor-avatar"
                        >
                        <div class="course-card__instructor-info">
                            <span class="course-card__instructor-name">${course.instructor.name}</span>
                            <span class="course-card__instructor-title">${course.instructor.title}</span>
                        </div>
                    </div>
                    <div class="course-card__cta">
                        <button class="btn btn--secondary" data-action="view-details">
                            Learn More
                            <span class="btn__icon" aria-hidden="true">→</span>
                        </button>
                    </div>
                </div>
            </article>
        `).join('');

        // Add click handlers
        grid.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('[data-action="view-details"]')) {
                    const courseId = parseInt(card.dataset.courseId);
                    showCourseDetail(courseId);
                }
            });
        });
    }

    // ============================================
    // Skeleton Loading States
    // ============================================
    function createSkeletonCard() {
        return `
            <div class="skeleton-card" aria-hidden="true">
                <div class="skeleton skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text short"></div>
                </div>
            </div>
        `;
    }

    function showModalSkeleton() {
        const content = document.getElementById('course-detail-content');
        content.innerHTML = `
            <div class="course-detail course-detail--skeleton">
                <div class="skeleton skeleton-detail-image"></div>
                <div class="skeleton skeleton-detail-title"></div>
                <div class="skeleton skeleton-detail-meta"></div>
                <div class="skeleton skeleton-detail-text"></div>
                <div class="skeleton skeleton-detail-text"></div>
                <div class="skeleton skeleton-detail-text short"></div>

                <div style="margin-top: var(--spacing-xl);">
                    <div class="skeleton skeleton-detail-subtitle"></div>
                    <div class="skeleton skeleton-detail-list-item"></div>
                    <div class="skeleton skeleton-detail-list-item"></div>
                    <div class="skeleton skeleton-detail-list-item"></div>
                </div>

                <div style="margin-top: var(--spacing-xl);">
                    <div class="skeleton skeleton-detail-subtitle"></div>
                    <div class="skeleton skeleton-detail-instructor"></div>
                </div>
            </div>
        `;
    }

    function hideModalSkeleton() {
        // Skeleton will be replaced by actual content
    }

    // ============================================
    // Course Detail Modal
    // ============================================
    function showCourseDetail(courseId) {
        const course = courses.find(c => c.id === courseId);
        if (!course) return;

        state.selectedCourse = course;

        const modal = document.getElementById('course-detail-modal');
        const content = document.getElementById('course-detail-content');

        // Show skeleton first
        openModal('course-detail-modal');
        showModalSkeleton();

        // Simulate loading delay for demo (remove in production or replace with actual async operation)
        setTimeout(() => {
            populateCourseDetailContent(course, content);
        }, 500);
    }

    function populateCourseDetailContent(course, content) {
        content.innerHTML = `
            <div class="course-detail__header">
                <img
                    src="${course.image}"
                    alt="${course.title}"
                    class="course-detail__image"
                >
                <h2 class="course-detail__title">${course.title}</h2>
                <div class="course-detail__meta">
                    <span>⏱️ ${course.duration}</span>
                    <span>✓ ${course.availability}</span>
                </div>
                <p class="course-detail__description">${course.description}</p>
            </div>

            <div class="course-detail__section">
                <h3 class="course-detail__section-title">What You'll Learn</h3>
                <ul class="course-detail__curriculum">
                    ${course.curriculum.map(item => `
                        <li class="course-detail__curriculum-item">
                            <span class="course-detail__curriculum-icon">✓</span>
                            <span>${item}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="course-detail__section">
                <h3 class="course-detail__section-title">Your Instructor</h3>
                <div class="course-detail__instructor-card">
                    <img
                        src="${course.instructor.avatar}"
                        alt="${course.instructor.name}"
                        class="course-detail__instructor-avatar"
                    >
                    <div class="course-detail__instructor-bio">
                        <h4 class="course-detail__instructor-name">${course.instructor.name}</h4>
                        <p class="course-detail__instructor-title">${course.instructor.title}</p>
                        <p class="course-detail__instructor-description">${course.instructor.bio}</p>
                    </div>
                </div>
            </div>

            <div class="course-detail__actions">
                <button class="btn btn--primary" data-action="start-booking">
                    Start Your Journey
                    <span class="btn__icon" aria-hidden="true">→</span>
                </button>
                <button class="btn btn--link" data-action="save-for-later">
                    Save for Later
                </button>
            </div>
        `;

        // Add event listeners
        content.querySelector('[data-action="start-booking"]').addEventListener('click', () => {
            closeModal('course-detail-modal');
            setTimeout(() => openBookingModal(), 300);
        });

        content.querySelector('[data-action="save-for-later"]').addEventListener('click', () => {
            saveForLater(course);
            closeModal('course-detail-modal');
        });
    }

    // ============================================
    // Booking Form
    // ============================================
    function openBookingModal() {
        state.currentStep = 1;
        updateProgress();
        showStep(1);
        openModal('booking-modal');
    }

    function updateTimeEstimate(currentStep, totalSteps) {
        const secondsPerStep = 45;
        const remaining = (totalSteps - currentStep) * secondsPerStep;
        const text = remaining > 60
            ? `About ${Math.ceil(remaining/60)} min remaining`
            : `About ${remaining} seconds remaining`;

        const timeEstimate = document.querySelector('.time-estimate');
        if (timeEstimate) {
            timeEstimate.textContent = text;
        }
    }

    function updateProgress() {
        const progress = document.querySelector('.progress');
        const steps = progress.querySelectorAll('.progress__step');
        const barFill = progress.querySelector('.progress__bar-fill');

        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('progress__step--active', 'progress__step--completed');

            if (stepNumber === state.currentStep) {
                step.classList.add('progress__step--active');
            } else if (stepNumber < state.currentStep) {
                step.classList.add('progress__step--completed');
            }
        });

        const percentage = (state.currentStep / 3) * 100;
        barFill.style.width = `${percentage}%`;
        progress.setAttribute('aria-valuenow', state.currentStep);

        // Update time estimate
        updateTimeEstimate(state.currentStep, 3);
    }

    function showStep(stepNumber) {
        const steps = document.querySelectorAll('.form-step');
        steps.forEach(step => {
            if (parseInt(step.dataset.step) === stepNumber) {
                step.removeAttribute('hidden');
            } else {
                step.setAttribute('hidden', '');
            }
        });
    }

    function announceStep(stepNumber, totalSteps, stepTitle) {
        const announcer = document.getElementById('step-announcer');
        if (announcer) {
            announcer.textContent = `Step ${stepNumber} of ${totalSteps}: ${stepTitle}`;
        }
    }

    function nextStep() {
        if (validateCurrentStep()) {
            state.currentStep++;
            updateProgress();
            showStep(state.currentStep);

            // Announce step change for screen readers
            const stepTitles = ['About You', 'Your Goals', 'Confirm'];
            announceStep(state.currentStep, 3, stepTitles[state.currentStep - 1]);

            if (state.currentStep === 3) {
                populateBookingSummary();
            }
        }
    }

    function prevStep() {
        state.currentStep--;
        updateProgress();
        showStep(state.currentStep);

        // Announce step change for screen readers
        const stepTitles = ['About You', 'Your Goals', 'Confirm'];
        announceStep(state.currentStep, 3, stepTitles[state.currentStep - 1]);
    }

    function validateCurrentStep() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${state.currentStep}"]`);
        const inputs = currentStepElement.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            const errorElement = input.parentElement.querySelector('.form-error');

            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'This field is required';
                }
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
                input.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email address';
                }
            } else {
                input.classList.remove('error');
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function populateBookingSummary() {
        const summary = document.getElementById('booking-summary');
        const course = state.selectedCourse;

        summary.innerHTML = `
            <div class="booking-summary__item">
                <div class="booking-summary__label">Course</div>
                <div class="booking-summary__value">${course.title}</div>
            </div>
            <div class="booking-summary__item">
                <div class="booking-summary__label">Duration</div>
                <div class="booking-summary__value">${course.duration}</div>
            </div>
            <div class="booking-summary__item">
                <div class="booking-summary__label">Instructor</div>
                <div class="booking-summary__value">${course.instructor.name}</div>
            </div>
            <div class="booking-summary__item">
                <div class="booking-summary__label">Name</div>
                <div class="booking-summary__value">${state.formData.name}</div>
            </div>
            <div class="booking-summary__item">
                <div class="booking-summary__label">Email</div>
                <div class="booking-summary__value">${state.formData.email}</div>
            </div>
            ${state.formData.goals ? `
                <div class="booking-summary__item">
                    <div class="booking-summary__label">Goals</div>
                    <div class="booking-summary__value">${state.formData.goals}</div>
                </div>
            ` : ''}
            ${state.formData.experience ? `
                <div class="booking-summary__item">
                    <div class="booking-summary__label">Experience Level</div>
                    <div class="booking-summary__value">${getExperienceLabelFromValue(state.formData.experience)}</div>
                </div>
            ` : ''}
        `;
    }

    function getExperienceLabelFromValue(value) {
        const labels = {
            'beginner': 'Beginner - Just starting out',
            'intermediate': 'Intermediate - Some experience',
            'advanced': 'Advanced - Looking to deepen expertise'
        };
        return labels[value] || value;
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        if (!validateCurrentStep()) {
            return;
        }

        // Save form data
        updateFormData();
        saveToLocalStorage();

        // Close modal and show confirmation
        closeModal('booking-modal');
        setTimeout(() => showConfirmation(), 300);
    }

    function updateFormData() {
        state.formData.name = document.getElementById('name').value;
        state.formData.email = document.getElementById('email').value;
        state.formData.goals = document.getElementById('goals').value;
        state.formData.experience = document.getElementById('experience').value;
    }

    // ============================================
    // Confirmation Page
    // ============================================
    function showConfirmation() {
        const confirmationPage = document.getElementById('confirmation-page');
        const details = document.getElementById('confirmation-details');
        const course = state.selectedCourse;

        details.innerHTML = `
            <div class="booking-summary">
                <div class="booking-summary__item">
                    <div class="booking-summary__label">Course</div>
                    <div class="booking-summary__value">${course.title}</div>
                </div>
                <div class="booking-summary__item">
                    <div class="booking-summary__label">Instructor</div>
                    <div class="booking-summary__value">${course.instructor.name}</div>
                </div>
                <div class="booking-summary__item">
                    <div class="booking-summary__label">Duration</div>
                    <div class="booking-summary__value">${course.duration}</div>
                </div>
                <div class="booking-summary__item">
                    <div class="booking-summary__label">Confirmation sent to</div>
                    <div class="booking-summary__value">${state.formData.email}</div>
                </div>
            </div>
        `;

        // Populate related courses
        const relatedCourses = courses.filter(c => c.id !== course.id).slice(0, 3);
        const carousel = document.getElementById('related-courses-carousel');

        carousel.innerHTML = relatedCourses.map(c => `
            <article class="course-card" data-course-id="${c.id}" style="cursor: pointer;">
                <div class="course-card__image-wrapper">
                    <img src="${c.image}" alt="${c.title}" class="course-card__image" loading="lazy">
                </div>
                <div class="course-card__content">
                    <div class="course-card__duration">${c.duration}</div>
                    <h3 class="course-card__title">${c.title}</h3>
                    <p class="course-card__description">${c.description.substring(0, 120)}...</p>
                </div>
            </article>
        `).join('');

        // Add click handlers for related courses
        carousel.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', () => {
                confirmationPage.setAttribute('hidden', '');
                const courseId = parseInt(card.dataset.courseId);
                showCourseDetail(courseId);
            });
        });

        confirmationPage.removeAttribute('hidden');

        // Trigger celebration animation
        const celebrationIcon = document.querySelector('.celebration__icon');
        celebrationIcon.style.animation = 'none';
        setTimeout(() => {
            celebrationIcon.style.animation = '';
        }, 10);
    }

    // ============================================
    // Modal Management
    // ============================================
    let lastFocusedElement = null;

    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        modal.addEventListener('keydown', function(e) {
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
                closeModal(modal.id);
            }
        });

        if (firstElement) firstElement.focus();
    }

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        lastFocusedElement = document.activeElement;
        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';

        // Setup focus trap
        setTimeout(() => {
            trapFocus(modal);
        }, 100);
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.setAttribute('hidden', '');
        document.body.style.overflow = '';

        // Return focus to the element that opened the modal
        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }

    // ============================================
    // Local Storage & Save for Later
    // ============================================
    function saveForLater(course) {
        const saved = JSON.parse(localStorage.getItem('savedCourses') || '[]');
        if (!saved.find(c => c.id === course.id)) {
            saved.push(course);
            localStorage.setItem('savedCourses', JSON.stringify(saved));
            showToast('Course saved for later!');
        } else {
            showToast('Course already saved');
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem('lastBooking', JSON.stringify({
            course: state.selectedCourse,
            formData: state.formData,
            timestamp: new Date().toISOString()
        }));
    }

    function loadSavedData() {
        const saved = localStorage.getItem('lastBooking');
        if (saved) {
            const data = JSON.parse(saved);
            // Could pre-populate form fields if returning user
        }
    }

    // ============================================
    // Share & Calendar
    // ============================================
    function shareBooking() {
        const course = state.selectedCourse;
        const text = `I just enrolled in "${course.title}"! 🎉`;

        if (navigator.share) {
            navigator.share({
                title: 'Course Enrollment',
                text: text,
                url: window.location.href
            }).catch(() => {
                copyToClipboard(text);
            });
        } else {
            copyToClipboard(text);
        }
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Link copied to clipboard!');
        }).catch(() => {
            showToast('Unable to copy link');
        });
    }

    function addToCalendar() {
        const course = state.selectedCourse;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 7); // Start in 7 days

        const title = encodeURIComponent(course.title);
        const details = encodeURIComponent(`Course with ${course.instructor.name}`);
        const dateString = startDate.toISOString().replace(/-|:|\.\d+/g, '');

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dateString}/${dateString}`;

        window.open(googleCalendarUrl, '_blank');
    }

    // ============================================
    // Toast Notifications
    // ============================================
    function showToast(message) {
        const toast = document.getElementById('toast');
        const messageElement = toast.querySelector('.toast__message');

        messageElement.textContent = message;
        toast.removeAttribute('hidden');

        setTimeout(() => {
            toast.setAttribute('hidden', '');
        }, 3000);
    }

    // ============================================
    // Event Listeners
    // ============================================
    function setupEventListeners() {
        // Modal close buttons
        document.querySelectorAll('.modal__close').forEach(button => {
            button.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                closeModal(modal.id);
            });
        });

        // Modal overlay clicks
        document.querySelectorAll('.modal__overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                closeModal(modal.id);
            });
        });

        // Form navigation
        document.querySelectorAll('[data-action="next"]').forEach(button => {
            button.addEventListener('click', () => {
                updateFormData();
                nextStep();
            });
        });

        document.querySelectorAll('[data-action="prev"]').forEach(button => {
            button.addEventListener('click', prevStep);
        });

        // Form submission
        const form = document.getElementById('booking-form');
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
        }

        // Confirmation actions
        const addToCalendarBtn = document.getElementById('add-to-calendar');
        if (addToCalendarBtn) {
            addToCalendarBtn.addEventListener('click', addToCalendar);
        }

        const shareBtn = document.getElementById('share-booking');
        if (shareBtn) {
            shareBtn.addEventListener('click', shareBooking);
        }

        // Input validation on blur
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('blur', () => {
                const errorElement = input.parentElement.querySelector('.form-error');

                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.classList.add('error');
                    if (errorElement) {
                        errorElement.textContent = 'This field is required';
                    }
                } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
                    input.classList.add('error');
                    if (errorElement) {
                        errorElement.textContent = 'Please enter a valid email address';
                    }
                } else {
                    input.classList.remove('error');
                    if (errorElement) {
                        errorElement.textContent = '';
                    }
                }
            });

            input.addEventListener('input', () => {
                input.classList.remove('error');
                const errorElement = input.parentElement.querySelector('.form-error');
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        });

        // Keyboard navigation (Escape is now handled in trapFocus function)
        // Additional keyboard shortcuts can be added here if needed
    }

    // ============================================
    // Initialize on DOM Ready
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
