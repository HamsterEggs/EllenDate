document.getElementById('activity').addEventListener('change', function() {
    const customActivityContainer = document.getElementById('custom-activity-container');
    if (this.value === 'custom') {
        customActivityContainer.classList.remove('hidden');
    } else {
        customActivityContainer.classList.add('hidden');
    }
});

document.getElementById('date-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    let activity = document.getElementById('activity').value;
    if (activity === 'custom') {
        activity = document.getElementById('custom-activity').value || 'Custom Activity';
    }

    if (date && time && activity) {
        const confirmation = document.getElementById('confirmation');
        confirmation.classList.remove('hidden');
        confirmation.innerHTML = `❤️ Your romantic date is scheduled for ${date} at ${time} for a ${activity}. ❤️`;

        // Log the date in localStorage
        let logs = JSON.parse(localStorage.getItem('logs')) || [];
        logs.push({ date, time, activity });
        localStorage.setItem('logs', JSON.stringify(logs));

        // Send email notification using EmailJS
        emailjs.send('service_tw9qlws', 'template_fiewtj9', {
            date: date,
            time: time,
            activity: activity,
            to_email: 'stoutmgm@gmail.com'
        })
        .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
        }, (error) => {
            console.error('Failed to send email...', error);
        });
    } else {
        alert('Please fill in all the fields.');
    }
});
