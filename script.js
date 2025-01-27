// Function to format date as DD.MM.YYYY
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// Function to validate date format DD.MM.YYYY
function isValidDate(dateString) {
    // Regular expression to match DD.MM.YYYY format
    const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    
    // Check if the string matches the format
    if (!dateRegex.test(dateString)) {
        return false;
    }
    
    // Parse the date components
    const [, day, month, year] = dateString.match(dateRegex);
    
    // Convert to numbers
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    
    // Basic date validation
    if (monthNum < 1 || monthNum > 12) return false;
    
    // Days in each month (accounting for leap years)
    const daysInMonth = [31, 
        (yearNum % 4 === 0 && (yearNum % 100 !== 0 || yearNum % 400 === 0)) ? 29 : 28, 
        31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    // Check if day is valid for the specific month
    return dayNum >= 1 && dayNum <= daysInMonth[monthNum - 1];
}

// Set task date when the page loads
window.addEventListener('load', function() {
    const taskDateInput = document.getElementById('taskDate');
    taskDateInput.value = formatDate(new Date());
});

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskDate = document.getElementById('taskDate').value;
    const deadline = document.getElementById('deadline').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Validate deadline
    if (!isValidDate(deadline)) {
        alert('Пожалуйста, введите корректную дату в формате ДД.ММ.ГГГГ');
        return;
    }
    
    // Простая базовая валидация
    if (deadline && email && phone) {
        alert('Форма успешно отправлена!\n\n' + 
              `Дата задания: ${taskDate}\n` +
              `Срок сдачи: ${deadline}\n` +
              `Email: ${email}\n` +
              `Телефон: ${phone}\n` +
              `Сообщение: ${message}`);
        
        // Очистка формы после отправки
        this.reset();
        
        // Restore the task date after reset
        document.getElementById('taskDate').value = formatDate(new Date());
    } else {
        alert('Пожалуйста, заполните все обязательные поля');
    }
});