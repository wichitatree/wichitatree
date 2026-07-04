(() => {
  'use strict';

  const RECIPIENT_EMAIL = 'robert@wichita-treeservice.com';
  const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;
  const PHONE_NUMBER = '316-616-8321';
  const CALL_PANEL_STORAGE_KEY = 'wts-call-widget-open';

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }

  function setStatus(form, message, type = 'info') {
    const status = form.querySelector('[data-form-status]');
    if (!status) return;

    status.textContent = message;
    status.classList.remove('success', 'error', 'info');
    status.classList.add(type);
  }

  function setupHumanCheck(form) {
    const wrapper = form.querySelector('[data-human-check]');
    const input = form.querySelector('input[name="human_check"]');
    if (!wrapper || !input) return;

    let verifyTimer = null;
    form.dataset.humanVerified = 'false';
    form.dataset.humanCheckLoadedAt = String(Date.now());
    input.checked = false;

    function resetHumanCheck() {
      window.clearTimeout(verifyTimer);
      form.dataset.humanVerified = 'false';
      input.checked = false;
      input.disabled = false;
      input.removeAttribute('aria-busy');
      wrapper.classList.remove('checking', 'verified');
    }

    input.addEventListener('change', () => {
      if (input.checked && form.dataset.humanVerified !== 'true') {
        input.checked = false;
        input.disabled = true;
        input.setAttribute('aria-busy', 'true');
        wrapper.classList.add('checking');
        wrapper.classList.remove('verified');

        verifyTimer = window.setTimeout(() => {
          input.disabled = false;
          input.removeAttribute('aria-busy');
          input.checked = true;
          form.dataset.humanVerified = 'true';
          wrapper.classList.remove('checking');
          wrapper.classList.add('verified');
        }, 650);
        return;
      }

      if (!input.checked) {
        resetHumanCheck();
      }
    });

    form.addEventListener('reset', () => {
      window.setTimeout(resetHumanCheck, 0);
    });
  }

  function getFormPayload(form) {
    const formData = new FormData(form);

    return {
      _subject: 'New Wichita Tree Service Website Lead',
      _template: 'table',
      _captcha: 'false',
      _honey: String(formData.get('website') || '').trim(),
      source: 'Wichita Tree Service website',
      page: window.location.href,
      name: String(formData.get('name') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      address: String(formData.get('address') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      human_check: form.dataset.humanVerified === 'true' ? 'checked' : 'not checked',
      submitted_at: new Date().toLocaleString(),
    };
  }

  function validatePayload(form, payload) {
    const humanInput = form.querySelector('input[name="human_check"]');
    const loadedAt = Number(form.dataset.humanCheckLoadedAt || 0);
    const enoughTimePassed = loadedAt && Date.now() - loadedAt > 900;

    if (payload._honey) return 'Spam protection blocked this submission.';
    if (!payload.name) return 'Please add your name first.';
    if (!payload.phone) return 'Please add the best phone number to reach you.';
    if (!humanInput || !humanInput.checked || form.dataset.humanVerified !== 'true') {
      return 'Please check the human verification box before sending.';
    }
    if (!enoughTimePassed) return 'Please wait a second and try again.';

    return '';
  }

  async function sendLead(form, submitButton) {
    const payload = getFormPayload(form);
    const validationError = validatePayload(form, payload);

    if (validationError) {
      setStatus(form, validationError, 'error');
      return;
    }

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.dataset.originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
      }

      setStatus(form, 'Sending request...', 'info');

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let result = null;
      try {
        result = await response.json();
      } catch (error) {
        result = null;
      }

      if (!response.ok) {
        const detail = result && result.message ? ` ${result.message}` : '';
        throw new Error(`Form service returned ${response.status}.${detail}`);
      }

      form.reset();
      setStatus(
        form,
        `Request sent. Wichita Tree Service will follow up soon. First-time FormSubmit setup may require confirming ${RECIPIENT_EMAIL}.`,
        'success'
      );
    } catch (error) {
      console.error('Contact form could not send:', error);
      setStatus(
        form,
        `The form could not send yet. Please call ${PHONE_NUMBER}, text photos, or confirm the FormSubmit activation email for ${RECIPIENT_EMAIL}.`,
        'error'
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.originalText || 'Send Request';
      }
    }
  }

  function setupCallWidget() {
    const widget = document.querySelector('[data-call-widget]');
    const toggle = document.querySelector('[data-call-toggle]');
    const panel = document.querySelector('[data-call-panel]');
    if (!widget || !toggle || !panel) return;

    function setOpen(isOpen) {
      widget.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      try {
        window.sessionStorage.setItem(CALL_PANEL_STORAGE_KEY, isOpen ? '1' : '0');
      } catch (error) {
        // Storage is optional. Some browsers block it in strict modes.
      }
    }

    let storedOpen = false;
    try {
      storedOpen = window.sessionStorage.getItem(CALL_PANEL_STORAGE_KEY) === '1';
    } catch (error) {
      storedOpen = false;
    }

    setOpen(storedOpen);

    toggle.addEventListener('click', () => {
      setOpen(!widget.classList.contains('open'));
    });
  }

  onReady(() => {
    const menuButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('#nav-links');
    const year = document.querySelector('#year');
    const contactForms = document.querySelectorAll('[data-contact-form]');

    if (year) {
      year.textContent = new Date().getFullYear();
    }

    if (menuButton && navLinks) {
      menuButton.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
      });

      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          menuButton.setAttribute('aria-expanded', 'false');
        });
      });
    }

    contactForms.forEach((form) => {
      setupHumanCheck(form);

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        sendLead(form, form.querySelector('button[type="submit"]'));
      });
    });

    setupCallWidget();
  });
})();
