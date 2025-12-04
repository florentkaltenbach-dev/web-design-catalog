/**
 * Lightning Booking - Fast Flow JavaScript
 * Handles course selection, form validation, booking submission, and success state
 */

(function() {
    'use strict';

    // Course data (in a real app, this would come from an API)
    const coursesData = {
        '1': {
            id: '1',
            title: 'Python Fundamentals',
            date: 'Dec 15, 2025',
            dateISO: '2025-12-15',
            duration: '4 weeks',
            price: '$299',
            priceValue: 299,
            spots: 3
        },
        '2': {
            id: '2',
            title: 'React Masterclass',
            date: 'Jan 8, 2026',
            dateISO: '2026-01-08',
            duration: '6 weeks',
            price: '$449',
            priceValue: 449,
            spots: 12
        },
        '3': {
            id: '3',
            title: 'Data Science Bootcamp',
            date: 'Jan 22, 2026',
            dateISO: '2026-01-22',
            duration: '8 weeks',
            price: '$599',
            priceValue: 599,
            spots: 8
        },
        '4': {
            id: '4',
            title: 'Advanced JavaScript',
            date: 'Feb 5, 2026',
            dateISO: '2026-02-05',
            duration: '5 weeks',
            price: '$379',
            priceValue: 379,
            spots: 2
        }
    };

    // State
    let selectedCourseId = null;

    // DOM Elements
    const courseCards = document.querySelectorAll('.course-card');
    const bookingFormContainer = document.getElementById('booking-form-container');
    const bookingForm = document.getElementById('booking-form');
    const bookingSuccess = document.getElementById('booking-success');
    const cancelBookingBtn = document.getElementById('cancel-booking');
    const submitBookingBtn = document.getElementById('submit-booking');
    const addToCalendarBtn = document.getElementById('add-to-calendar');
    const editBookingBtn = document.getElementById('edit-booking');
    const bookAnotherBtn = document.getElementById('book-another');

    // Form inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // Summary elements
    const summaryCourse = document.getElementById('summary-course');
    const summaryDate = document.getElementById('summary-date');
    const summaryDuration = document.getElementById('summary-duration');
    const summaryPrice = document.getElementById('summary-price');
    const successDetails = document.getElementById('success-details');

    /**
     * Initialize event listeners
     */
    function init() {
        // Course card selection (click)
        courseCards.forEach(card => {
            card.addEventListener('click', handleCourseSelect);
            card.addEventListener('keydown', handleCourseKeydown);
        });

        // Form events
        if (bookingForm) {
            bookingForm.addEventListener('submit', handleFormSubmit);
        }

        if (cancelBookingBtn) {
            cancelBookingBtn.addEventListener('click', handleCancelBooking);
        }

        if (addToCalendarBtn) {
            addToCalendarBtn.addEventListener('click', handleAddToCalendar);
        }

        if (editBookingBtn) {
            editBookingBtn.addEventListener('click', handleEditBooking);
        }

        if (bookAnotherBtn) {
            bookAnotherBtn.addEventListener('click', handleBookAnother);
        }

        // Restore form data on load
        restoreFormData();

        // Real-time validation
        if (nameInput) {
            nameInput.addEventListener('blur', () => validateField('name'));
            nameInput.addEventListener('input', () => clearError('name'));
        }

        if (emailInput) {
            emailInput.addEventListener('blur', () => validateField('email'));
            emailInput.addEventListener('input', () => clearError('email'));
        }
    }

    /**
     * Handle course selection
     */
    function handleCourseSelect(e) {
        const card = e.currentTarget;
        const courseId = card.dataset.courseId;

        // Toggle selection
        if (selectedCourseId === courseId) {
            deselectCourse();
        } else {
            selectCourse(courseId);
        }
    }

    /**
     * Handle keyboard navigation for course cards
     */
    function handleCourseKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCourseSelect(e);
        }
    }

    /**
     * Select a course and show booking form
     */
    function selectCourse(courseId) {
        // Deselect all cards
        courseCards.forEach(card => card.classList.remove('selected'));

        // Select the clicked card
        const selectedCard = document.querySelector(`[data-course-id="${courseId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCourseId = courseId;

            // Update summary
            const course = coursesData[courseId];
            if (course) {
                summaryCourse.textContent = course.title;
                summaryDate.textContent = course.date;
                summaryDuration.textContent = course.duration;
                summaryPrice.textContent = course.price;
            }

            // Show booking form
            bookingFormContainer.hidden = false;
            bookingSuccess.hidden = true;

            // Auto-focus first input (with slight delay for animation)
            setTimeout(() => {
                nameInput.focus();
            }, 200);

            // Smooth scroll to form
            bookingFormContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    /**
     * Deselect course
     */
    function deselectCourse() {
        courseCards.forEach(card => card.classList.remove('selected'));
        selectedCourseId = null;
        bookingFormContainer.hidden = true;
        bookingSuccess.hidden = true;
    }

    /**
     * Handle cancel booking
     */
    function handleCancelBooking() {
        deselectCourse();
        resetForm();
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
            required: 'We need your email to send confirmation',
            invalid: 'Please check your email format (e.g., name@example.com)'
        },
        phone: {
            invalid: 'Please enter a valid phone number (e.g., +1 555-123-4567)'
        }
    };

    /**
     * Validate individual field
     */
    function validateField(fieldName) {
        const input = document.getElementById(fieldName);
        const errorSpan = document.getElementById(`${fieldName}-error`);

        if (!input || !errorSpan) return true;

        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (!input.value.trim()) {
                    isValid = false;
                    errorMessage = errorMessages.name.required;
                } else if (input.value.trim().length < 2) {
                    isValid = false;
                    errorMessage = errorMessages.name.minLength;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!input.value.trim()) {
                    isValid = false;
                    errorMessage = errorMessages.email.required;
                } else if (!emailRegex.test(input.value)) {
                    isValid = false;
                    errorMessage = errorMessages.email.invalid;
                }
                break;

            case 'phone':
                if (input.value.trim()) {
                    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                    if (!phoneRegex.test(input.value)) {
                        isValid = false;
                        errorMessage = errorMessages.phone.invalid;
                    }
                }
                break;
        }

        if (!isValid) {
            showFieldError(input, errorSpan, errorMessage);
        } else {
            showFieldSuccess(input, errorSpan);
        }

        return isValid;
    }

    /**
     * Show field error with styling
     */
    function showFieldError(input, errorSpan, errorMessage) {
        input.classList.add('error');
        input.classList.remove('success');
        errorSpan.textContent = errorMessage;

        const wrapper = input.closest('.form-group');
        if (wrapper) {
            wrapper.classList.add('has-error');
            wrapper.classList.remove('has-success');
        }
    }

    /**
     * Show field success with checkmark
     */
    function showFieldSuccess(input, errorSpan) {
        input.classList.remove('error');
        input.classList.add('success');
        errorSpan.textContent = '';

        const wrapper = input.closest('.form-group');
        if (wrapper) {
            wrapper.classList.remove('has-error');
            wrapper.classList.add('has-success');
        }
    }

    /**
     * Clear error for a field
     */
    function clearError(fieldName) {
        const input = document.getElementById(fieldName);
        const errorSpan = document.getElementById(`${fieldName}-error`);

        if (input && errorSpan) {
            input.classList.remove('error');
            input.classList.remove('success');
            errorSpan.textContent = '';

            const wrapper = input.closest('.form-group');
            if (wrapper) {
                wrapper.classList.remove('has-error');
                wrapper.classList.remove('has-success');
            }
        }
    }

    /**
     * Validate all required fields
     */
    function validateForm() {
        const nameValid = validateField('name');
        const emailValid = validateField('email');

        return nameValid && emailValid;
    }

    /**
     * Handle form submission
     */
    function handleFormSubmit(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Save form data to sessionStorage
        saveFormData();

        // Show loading state
        submitBookingBtn.classList.add('loading');
        submitBookingBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Hide loading state
            submitBookingBtn.classList.remove('loading');
            submitBookingBtn.disabled = false;

            // Show success state
            showSuccessState();
        }, 800);
    }

    /**
     * Show success state
     */
    function showSuccessState() {
        const course = coursesData[selectedCourseId];
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        // Build success details
        const detailsHTML = `
            <div class="booking-summary">
                <div class="booking-summary__item">
                    <span class="booking-summary__label">Name:</span>
                    <span class="booking-summary__value">${escapeHtml(name)}</span>
                </div>
                <div class="booking-summary__item">
                    <span class="booking-summary__label">Email:</span>
                    <span class="booking-summary__value">${escapeHtml(email)}</span>
                </div>
                <div class="booking-summary__item">
                    <span class="booking-summary__label">Course:</span>
                    <span class="booking-summary__value">${escapeHtml(course.title)}</span>
                </div>
                <div class="booking-summary__item">
                    <span class="booking-summary__label">Start Date:</span>
                    <span class="booking-summary__value">${escapeHtml(course.date)}</span>
                </div>
                <div class="booking-summary__item">
                    <span class="booking-summary__label">Duration:</span>
                    <span class="booking-summary__value">${escapeHtml(course.duration)}</span>
                </div>
                <div class="booking-summary__item booking-summary__item--total">
                    <span class="booking-summary__label">Total Paid:</span>
                    <span class="booking-summary__value">${escapeHtml(course.price)}</span>
                </div>
            </div>
        `;

        successDetails.innerHTML = detailsHTML;

        // Hide form, show success
        bookingFormContainer.hidden = true;
        bookingSuccess.hidden = false;

        // Scroll to success message
        bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /**
     * Generate ICS file content for calendar
     */
    function generateICS(course) {
        const startDate = course.dateISO.replace(/-/g, '');
        const endDate = startDate; // Same day event
        const summary = course.title;
        const description = `${course.title} - ${course.duration} course`;

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Lightning Booking//EN',
            'BEGIN:VEVENT',
            `DTSTART:${startDate}`,
            `DTEND:${endDate}`,
            `SUMMARY:${summary}`,
            `DESCRIPTION:${description}`,
            'STATUS:CONFIRMED',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        return icsContent;
    }

    /**
     * Handle add to calendar
     */
    function handleAddToCalendar() {
        if (!selectedCourseId) return;

        const course = coursesData[selectedCourseId];
        const icsContent = generateICS(course);
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${course.title.replace(/\s+/g, '-').toLowerCase()}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    /**
     * Handle edit booking
     */
    function handleEditBooking() {
        // Hide success, show form
        bookingSuccess.hidden = true;
        bookingFormContainer.hidden = false;

        // Form data already preserved in fields - user can edit and resubmit
        nameInput.focus();

        // Smooth scroll to form
        bookingFormContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Handle book another course
     */
    function handleBookAnother() {
        deselectCourse();
        resetForm();

        // Optionally restore previous data for quick re-booking
        const shouldPrefill = sessionStorage.getItem('bookingData');
        if (shouldPrefill) {
            // Show a subtle notification that previous data is available
            restoreFormData();
        }

        // Scroll back to courses
        document.querySelector('.courses-grid').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    /**
     * Save form data to sessionStorage
     */
    function saveFormData() {
        const data = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value
        };
        sessionStorage.setItem('bookingData', JSON.stringify(data));
    }

    /**
     * Restore form data from sessionStorage
     */
    function restoreFormData() {
        const savedData = sessionStorage.getItem('bookingData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                if (data.name) nameInput.value = data.name;
                if (data.email) emailInput.value = data.email;
                if (data.phone) phoneInput.value = data.phone;
            } catch (e) {
                // Invalid data, ignore
                console.warn('Failed to restore form data:', e);
            }
        }
    }

    /**
     * Reset form
     */
    function resetForm() {
        if (bookingForm) {
            bookingForm.reset();
        }

        // Clear errors
        clearError('name');
        clearError('email');
    }

    /**
     * Escape HTML to prevent XSS
     * Uses robust string replacement approach to sanitize user input
     */
    function escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /**
     * Create a safe DOM element with text content
     * Alternative to innerHTML for dynamic content creation
     */
    function createSafeElement(tag, className, textContent) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (textContent) el.textContent = textContent; // textContent is safe
        return el;
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
