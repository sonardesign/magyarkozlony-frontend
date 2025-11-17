// ============================================
// Date Picker Component
// ============================================
// Beautiful, pixel-perfect date picker

export class DatePicker {
  constructor() {
    this.pickers = [];
    this.currentDate = new Date();
    this.selectedDate = null;
    this.init();
  }

  init() {
    // Find all inputs with data-datepicker attribute
    const dateInputs = document.querySelectorAll('[data-datepicker]');
    
    dateInputs.forEach((input) => {
      this.createDatePicker(input);
    });

    console.log(`✓ ${this.pickers.length} Date Picker(s) initialized`);
  }

  createDatePicker(input) {
    // Create calendar container
    const calendar = document.createElement('div');
    calendar.className = 'datepicker-calendar';
    calendar.style.cssText = `
      display: none;
      position: absolute;
      background: white;
      border: 1px solid #e2e2e2;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 16px;
      z-index: 1000;
      min-width: 280px;
    `;

    // Insert calendar after input
    input.parentNode.style.position = 'relative';
    input.parentNode.appendChild(calendar);

    const picker = {
      input,
      calendar,
      isOpen: false,
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear()
    };

    // Show calendar on input click
    input.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeAll();
      this.open(picker);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.datepicker-calendar') && e.target !== input) {
        this.close(picker);
      }
    });

    this.pickers.push(picker);
    this.renderCalendar(picker);
  }

  renderCalendar(picker) {
    const { calendar, currentMonth, currentYear } = picker;
    
    // Month names
    const months = [
      'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
      'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
    ];

    // Day names (Hungarian)
    const days = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];

    // Header with month/year navigation
    const header = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <button class="datepicker-prev" style="border: none; background: none; cursor: pointer; font-size: 20px; padding: 4px 8px;">‹</button>
        <div style="font-weight: 600; font-size: 16px;">${months[currentMonth]} ${currentYear}</div>
        <button class="datepicker-next" style="border: none; background: none; cursor: pointer; font-size: 20px; padding: 4px 8px;">›</button>
      </div>
    `;

    // Day headers
    const dayHeaders = `
      <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-bottom: 8px;">
        ${days.map(day => `<div style="text-align: center; font-size: 12px; font-weight: 600; color: #666;">${day}</div>`).join('')}
      </div>
    `;

    // Get days in month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Monday = 0

    let daysHTML = '<div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px;">';
    
    // Empty cells before first day
    for (let i = 0; i < adjustedFirstDay; i++) {
      daysHTML += '<div></div>';
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === new Date().getDate() && 
                      currentMonth === new Date().getMonth() && 
                      currentYear === new Date().getFullYear();
      
      const style = `
        text-align: center;
        padding: 8px;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.2s;
        ${isToday ? 'background: #0b3d3e; color: white; font-weight: 600;' : ''}
      `;
      
      daysHTML += `<div class="datepicker-day" data-day="${day}" style="${style}">${day}</div>`;
    }
    
    daysHTML += '</div>';

    calendar.innerHTML = header + dayHeaders + daysHTML;

    // Bind events
    calendar.querySelector('.datepicker-prev').addEventListener('click', (e) => {
      e.stopPropagation();
      this.previousMonth(picker);
    });

    calendar.querySelector('.datepicker-next').addEventListener('click', (e) => {
      e.stopPropagation();
      this.nextMonth(picker);
    });

    // Day selection
    calendar.querySelectorAll('.datepicker-day').forEach((dayEl) => {
      dayEl.addEventListener('mouseenter', (e) => {
        if (!dayEl.style.background.includes('#0b3d3e')) {
          dayEl.style.background = '#f5f5f5';
        }
      });
      
      dayEl.addEventListener('mouseleave', (e) => {
        if (!dayEl.style.background.includes('#0b3d3e')) {
          dayEl.style.background = 'transparent';
        }
      });

      dayEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const day = parseInt(dayEl.getAttribute('data-day'));
        this.selectDate(picker, day);
      });
    });
  }

  selectDate(picker, day) {
    const { input, currentMonth, currentYear } = picker;
    const date = new Date(currentYear, currentMonth, day);
    
    // Format date (YYYY-MM-DD)
    const formatted = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    input.value = formatted;
    
    // Trigger change event
    input.dispatchEvent(new Event('change', { bubbles: true }));
    
    this.close(picker);
    console.log('📅 Date selected:', formatted);
  }

  previousMonth(picker) {
    if (picker.currentMonth === 0) {
      picker.currentMonth = 11;
      picker.currentYear--;
    } else {
      picker.currentMonth--;
    }
    this.renderCalendar(picker);
  }

  nextMonth(picker) {
    if (picker.currentMonth === 11) {
      picker.currentMonth = 0;
      picker.currentYear++;
    } else {
      picker.currentMonth++;
    }
    this.renderCalendar(picker);
  }

  open(picker) {
    const { input, calendar } = picker;
    
    // Position below input
    const rect = input.getBoundingClientRect();
    calendar.style.top = `${rect.bottom + 8}px`;
    calendar.style.left = `${rect.left}px`;
    
    calendar.style.display = 'block';
    calendar.style.opacity = '0';
    calendar.style.transform = 'translateY(-10px)';
    calendar.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    
    requestAnimationFrame(() => {
      calendar.style.opacity = '1';
      calendar.style.transform = 'translateY(0)';
    });
    
    picker.isOpen = true;
    console.log('📅 Date picker opened');
  }

  close(picker) {
    const { calendar } = picker;
    
    calendar.style.opacity = '0';
    calendar.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      calendar.style.display = 'none';
      picker.isOpen = false;
    }, 200);
    
    console.log('📅 Date picker closed');
  }

  closeAll() {
    this.pickers.forEach((picker) => {
      if (picker.isOpen) {
        this.close(picker);
      }
    });
  }

  destroy() {
    // Close all pickers
    this.closeAll();
    
    // Remove all event listeners and clean up
    this.pickers.forEach((picker) => {
      if (picker.trigger) {
        picker.trigger.replaceWith(picker.trigger.cloneNode(true));
      }
      if (picker.calendar) {
        picker.calendar.remove();
      }
    });
    
    // Clear pickers array
    this.pickers = [];
    
    console.log('🧹 Date pickers destroyed');
  }
}

