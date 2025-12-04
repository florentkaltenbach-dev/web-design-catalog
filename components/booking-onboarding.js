// Course data
const courses = {
    1: {
        id: 1,
        title: "Introduction to Web Design",
        instructor: "Sarah Chen",
        duration: "4 weeks",
        price: "$299",
        description: "Perfect for complete beginners! Learn the basics of creating beautiful websites with no prior experience needed.",
        whatYouLearn: [
            "HTML fundamentals and semantic markup",
            "CSS styling and responsive layouts",
            "Modern design principles and best practices",
            "Build and deploy your first website",
            "Accessibility and user experience basics"
        ],
        whatToExpect: {
            schedule: "Tuesdays & Thursdays, 6:00 PM - 8:00 PM EST",
            location: "Online via Zoom (link sent 24 hours before class)",
            requirements: "A computer with internet access. No prior coding experience needed!",
            preparation: "We'll email you a welcome packet with setup instructions 3 days before the course starts."
        }
    },
    2: {
        id: 2,
        title: "Digital Photography Basics",
        instructor: "Marcus Lee",
        duration: "3 weeks",
        price: "$249",
        description: "Unlock your creative eye! Learn to take stunning photos with any camera, from smartphone to DSLR.",
        whatYouLearn: [
            "Understanding exposure, aperture, and shutter speed",
            "Composition techniques and the rule of thirds",
            "Lighting fundamentals for indoor and outdoor shots",
            "Basic photo editing with free software",
            "Building a cohesive photography portfolio"
        ],
        whatToExpect: {
            schedule: "Saturdays, 10:00 AM - 1:00 PM EST",
            location: "Hybrid: In-person at 123 Main St, Suite 200 OR online via Zoom",
            requirements: "Any camera (smartphone, point-and-shoot, or DSLR). Enthusiasm to learn!",
            preparation: "Bring your camera to the first class. We'll provide a camera basics guide beforehand."
        }
    },
    3: {
        id: 3,
        title: "Creative Writing Workshop",
        instructor: "Emma Rodriguez",
        duration: "6 weeks",
        price: "$349",
        description: "Discover your storytelling voice in a supportive environment. No experience required—just bring your imagination!",
        whatYouLearn: [
            "Character development and compelling dialogue",
            "Story structure and narrative arcs",
            "Finding your unique writing voice",
            "Giving and receiving constructive feedback",
            "Publishing options and next steps"
        ],
        whatToExpect: {
            schedule: "Wednesdays, 7:00 PM - 9:00 PM EST",
            location: "Online via Zoom with optional in-person coffee meetups",
            requirements: "A notebook or laptop for writing. An open mind and willingness to share your work.",
            preparation: "We'll send reading materials one week before the course. Optional, but recommended!"
        }
    }
};

// Current state
let currentCourse = null;
let currentStep = 1;
let formData = {};

// Utility Functions
function scrollToCourses() {
    const coursesSection = document.getElementById('courses-section');
    coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

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
            if (modal.id === 'course-details-modal') {
                closeModal();
            } else if (modal.id === 'booking-form-modal') {
                closeBookingForm();
            } else if (modal.id === 'confirmation-modal') {
                closeConfirmation();
            }
        }
    };

    modal.addEventListener('keydown', modalKeydownHandler);

    if (firstElement) firstElement.focus();
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    lastFocusedElement = document.activeElement;
    modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';

    // Setup focus trap
    setTimeout(() => {
        trapFocus(modal);
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('course-details-modal');
    modal.classList.remove('modal--open');
    document.body.style.overflow = '';

    // Return focus to the element that opened the modal
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

function closeBookingForm() {
    const modal = document.getElementById('booking-form-modal');
    modal.classList.remove('modal--open');
    document.body.style.overflow = '';
    resetForm();

    // Return focus to the element that opened the modal
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

function closeConfirmation() {
    const modal = document.getElementById('confirmation-modal');
    modal.classList.remove('modal--open');
    document.body.style.overflow = '';

    // Return focus to the element that opened the modal
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }

    // Scroll to courses section for potential next booking
    setTimeout(() => {
        scrollToCourses();
    }, 300);
}

// Course Details Functions
function showCourseDetails(courseId) {
    currentCourse = courses[courseId];
    const content = document.getElementById('course-details-content');

    content.innerHTML = `
        <div class="course-details">
            <div class="course-details__header">
                <h2 class="course-details__title">${currentCourse.title}</h2>
                <p class="course-details__instructor">
                    <svg class="course-card__icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M2 14C2 11.2386 4.68629 9 8 9C11.3137 9 14 11.2386 14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    with ${currentCourse.instructor}
                </p>
                <div class="course-details__meta">
                    <span class="course-details__meta-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M8 5V8L10 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        ${currentCourse.duration}
                    </span>
                    <span class="course-details__meta-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1L10 6L15 6L11 9L13 14L8 11L3 14L5 9L1 6L6 6L8 1Z" fill="currentColor"/>
                        </svg>
                        ${currentCourse.price}
                    </span>
                </div>
            </div>

            <div class="course-details__section">
                <h3 class="course-details__section-title">What you'll learn</h3>
                <ul class="course-details__list">
                    ${currentCourse.whatYouLearn.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>

            <div class="course-details__section">
                <h3 class="course-details__section-title">What to expect</h3>
                <div class="accordion">
                    <div class="accordion__item">
                        <button class="accordion__header" onclick="toggleAccordion(this)">
                            Schedule
                            <svg class="accordion__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 8L10 13L15 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <div class="accordion__content">
                            <div class="accordion__body">${currentCourse.whatToExpect.schedule}</div>
                        </div>
                    </div>
                    <div class="accordion__item">
                        <button class="accordion__header" onclick="toggleAccordion(this)">
                            Location
                            <svg class="accordion__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 8L10 13L15 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <div class="accordion__content">
                            <div class="accordion__body">${currentCourse.whatToExpect.location}</div>
                        </div>
                    </div>
                    <div class="accordion__item">
                        <button class="accordion__header" onclick="toggleAccordion(this)">
                            What you'll need
                            <svg class="accordion__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 8L10 13L15 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <div class="accordion__content">
                            <div class="accordion__body">${currentCourse.whatToExpect.requirements}</div>
                        </div>
                    </div>
                    <div class="accordion__item">
                        <button class="accordion__header" onclick="toggleAccordion(this)">
                            How to prepare
                            <svg class="accordion__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M5 8L10 13L15 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <div class="accordion__content">
                            <div class="accordion__body">${currentCourse.whatToExpect.preparation}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="course-details__actions">
                <button class="btn btn--primary btn--large" onclick="startBooking()">
                    Sign Me Up
                    <span aria-hidden="true">→</span>
                </button>
                <p style="text-align: center; color: var(--color-text-secondary); font-size: 0.875rem; margin-top: var(--spacing-sm);">
                    Have questions? <a href="#" style="color: var(--color-primary); text-decoration: underline;">Chat with us</a> or call (555) 123-4567
                </p>
            </div>
        </div>
    `;

    openModal('course-details-modal');
}

function toggleAccordion(button) {
    const item = button.closest('.accordion__item');
    const wasOpen = item.classList.contains('accordion__item--open');

    // Close all accordion items
    document.querySelectorAll('.accordion__item').forEach(i => {
        i.classList.remove('accordion__item--open');
    });

    // Open clicked item if it wasn't already open
    if (!wasOpen) {
        item.classList.add('accordion__item--open');
    }
}

// Booking Form Functions
function startBooking() {
    closeModal();
    setTimeout(() => {
        resetForm();
        currentStep = 1;
        updateProgress();
        openModal('booking-form-modal');
    }, 300);
}

function resetForm() {
    currentStep = 1;
    formData = {};
    document.getElementById('booking-form').reset();

    // Reset form steps
    document.querySelectorAll('.form-step').forEach((step, index) => {
        step.classList.toggle('form-step--active', index === 0);
    });

    // Clear errors
    document.querySelectorAll('.form-error').forEach(error => {
        error.classList.remove('form-error--visible');
        error.textContent = '';
    });

    updateProgress();
}

function announceStep(stepNumber, totalSteps, stepTitle) {
    const announcer = document.getElementById('step-announcer');
    if (announcer) {
        announcer.textContent = `Step ${stepNumber} of ${totalSteps}: ${stepTitle}`;
    }
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
    const progressFill = document.getElementById('progress-fill');
    const progressBar = document.querySelector('.progress-bar');
    const steps = document.querySelectorAll('.progress-bar__step');

    const progressPercent = (currentStep / 3) * 100;
    progressFill.style.width = `${progressPercent}%`;
    progressBar.setAttribute('aria-valuenow', progressPercent);

    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('progress-bar__step--active', 'progress-bar__step--completed');

        if (stepNumber === currentStep) {
            step.classList.add('progress-bar__step--active');
        } else if (stepNumber < currentStep) {
            step.classList.add('progress-bar__step--completed');
        }
    });

    // Update time estimate
    updateTimeEstimate(currentStep, 3);
}

/**
 * Error messages with recovery guidance
 */
const errorMessages = {
    name: {
        required: 'Please enter your name so we know who to expect',
        minLength: 'Please enter your full name (at least 2 characters)'
    },
    email: {
        required: 'We need your email to send you course details and confirmation',
        invalid: 'Please check your email format (e.g., name@example.com)'
    },
    phone: {
        invalid: 'Please enter a valid phone number (e.g., +1 555-123-4567)'
    }
};

function validateStep(step) {
    let isValid = true;

    if (step === 1) {
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('name-error');

        if (!nameInput.value.trim()) {
            showStepError(nameInput, nameError, errorMessages.name.required);
            nameInput.focus();
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showStepError(nameInput, nameError, errorMessages.name.minLength);
            nameInput.focus();
            isValid = false;
        } else {
            showStepSuccess(nameInput, nameError);
            formData.name = nameInput.value.trim();
        }
    }

    if (step === 2) {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailInput.value.trim()) {
            showStepError(emailInput, emailError, errorMessages.email.required);
            emailInput.focus();
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showStepError(emailInput, emailError, errorMessages.email.invalid);
            emailInput.focus();
            isValid = false;
        } else {
            showStepSuccess(emailInput, emailError);
            formData.email = emailInput.value.trim();
        }

        // Validate phone if provided
        if (phoneInput && phoneInput.value.trim()) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phoneInput.value.trim())) {
                if (phoneError) {
                    showStepError(phoneInput, phoneError, errorMessages.phone.invalid);
                }
                if (isValid) {
                    phoneInput.focus();
                    isValid = false;
                }
            } else {
                if (phoneError) {
                    showStepSuccess(phoneInput, phoneError);
                }
                formData.phone = phoneInput.value.trim();
            }
        } else {
            formData.phone = 'Not provided';
        }
    }

    return isValid;
}

/**
 * Show step error with styling
 */
function showStepError(input, errorElement, errorMessage) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form-error--visible');
    input.classList.add('error');
    input.classList.remove('success');

    const wrapper = input.closest('.form-group');
    if (wrapper) {
        wrapper.classList.add('has-error');
        wrapper.classList.remove('has-success');
    }
}

/**
 * Show step success with checkmark
 */
function showStepSuccess(input, errorElement) {
    errorElement.classList.remove('form-error--visible');
    errorElement.textContent = '';
    input.classList.remove('error');
    input.classList.add('success');

    const wrapper = input.closest('.form-group');
    if (wrapper) {
        wrapper.classList.remove('has-error');
        wrapper.classList.add('has-success');
    }
}

function nextStep() {
    if (!validateStep(currentStep)) {
        return;
    }

    if (currentStep < 3) {
        // Hide current step
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('form-step--active');

        currentStep++;

        // Show next step
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('form-step--active');

        updateProgress();

        // Announce step change for screen readers
        const stepTitles = ['Your Info', 'Contact', 'Confirm'];
        announceStep(currentStep, 3, stepTitles[currentStep - 1]);

        // If step 3, populate summary
        if (currentStep === 3) {
            populateBookingSummary();
        }

        // Focus first input in new step
        setTimeout(() => {
            const nextStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            const firstInput = nextStepElement.querySelector('input, select');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }
}

function previousStep() {
    if (currentStep > 1) {
        // Hide current step
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('form-step--active');

        currentStep--;

        // Show previous step
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('form-step--active');

        updateProgress();

        // Announce step change for screen readers
        const stepTitles = ['Your Info', 'Contact', 'Confirm'];
        announceStep(currentStep, 3, stepTitles[currentStep - 1]);

        // Focus first input in new step
        setTimeout(() => {
            const prevStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            const firstInput = prevStepElement.querySelector('input, select');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }
}

function populateBookingSummary() {
    const summaryContent = document.getElementById('booking-summary-content');
    const hearAboutSelect = document.getElementById('hear-about');
    const hearAboutValue = hearAboutSelect.options[hearAboutSelect.selectedIndex].text;

    summaryContent.innerHTML = `
        <div class="booking-summary__item">
            <span class="booking-summary__label">Course</span>
            <span class="booking-summary__value">${currentCourse.title}</span>
        </div>
        <div class="booking-summary__item">
            <span class="booking-summary__label">Instructor</span>
            <span class="booking-summary__value">${currentCourse.instructor}</span>
        </div>
        <div class="booking-summary__item">
            <span class="booking-summary__label">Duration</span>
            <span class="booking-summary__value">${currentCourse.duration}</span>
        </div>
        <div class="booking-summary__item">
            <span class="booking-summary__label">Name</span>
            <span class="booking-summary__value">${formData.name}</span>
        </div>
        <div class="booking-summary__item">
            <span class="booking-summary__label">Email</span>
            <span class="booking-summary__value">${formData.email}</span>
        </div>
        ${formData.phone !== 'Not provided' ? `
            <div class="booking-summary__item">
                <span class="booking-summary__label">Phone</span>
                <span class="booking-summary__value">${formData.phone}</span>
            </div>
        ` : ''}
        <div class="booking-summary__item">
            <span class="booking-summary__label">Total</span>
            <span class="booking-summary__value">${currentCourse.price}</span>
        </div>
    `;
}

function showConfirmation() {
    const confirmationDetails = document.getElementById('confirmation-details');

    confirmationDetails.innerHTML = `
        <div class="booking-summary">
            <h3 class="booking-summary__title">Your booking</h3>
            <div class="booking-summary__item">
                <span class="booking-summary__label">Course</span>
                <span class="booking-summary__value">${currentCourse.title}</span>
            </div>
            <div class="booking-summary__item">
                <span class="booking-summary__label">Instructor</span>
                <span class="booking-summary__value">${currentCourse.instructor}</span>
            </div>
            <div class="booking-summary__item">
                <span class="booking-summary__label">When</span>
                <span class="booking-summary__value">${currentCourse.whatToExpect.schedule}</span>
            </div>
            <div class="booking-summary__item">
                <span class="booking-summary__label">Email sent to</span>
                <span class="booking-summary__value">${formData.email}</span>
            </div>
        </div>
    `;

    closeBookingForm();

    setTimeout(() => {
        openModal('confirmation-modal');

        // Create confetti effect (if motion is allowed)
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            createConfetti();
        }
    }, 300);
}

function createConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';

    const colors = ['#059669', '#EC4899', '#10B981', '#F59E0B'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
    }

    // Clean up after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

function showQuizPrompt() {
    alert("The quiz feature is coming soon! For now, feel free to browse our courses or contact us at hello@example.com for personalized recommendations.");
}

// Form submission
document.getElementById('booking-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateStep(currentStep)) {
        return;
    }

    // Collect final form data
    const hearAboutSelect = document.getElementById('hear-about');
    formData.hearAbout = hearAboutSelect.value || 'Not specified';

    // Simulate API call
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Processing... <span aria-hidden="true">⏳</span>';

    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        showConfirmation();
    }, 1500);
});

// Keyboard navigation for modals (Escape is now handled in trapFocus function)
// Additional keyboard shortcuts can be added here if needed

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScroll = function(target) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Guided First Booking showcase initialized');

    // Add hover effects to course cards
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.setProperty('--hover', '1');
        });

        card.addEventListener('mouseleave', function() {
            this.style.setProperty('--hover', '0');
        });
    });
});
