const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Fix nav state on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
    }
});

function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.submit-button');
    const successMessage = document.getElementById('success-message');
    
    // Disable submit button while submitting
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Get form data
    const formData = new FormData(form);
    
    // Submit form using fetch
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            successMessage.style.display = 'block';
            // Reset form
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sorry, there was a problem submitting your form. Please try again.');
    })
    .finally(() => {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    });
    
    return false;
}

// --- Automatic Resume Download ---
document.addEventListener('DOMContentLoaded', () => {
    const downloadLink = document.getElementById('download-link');
    
    if (downloadLink) {
        downloadLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const fileUrl = this.getAttribute('href');
            const fileName = "Alex Norman's Resume.pdf";

            fetch(fileUrl)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.blob();
                })
                .then(blob => {
                    const blobUrl = window.URL.createObjectURL(blob);
                    const tempLink = document.createElement('a');
                    
                    tempLink.href = blobUrl;
                    tempLink.download = fileName;
                    
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    
                    window.URL.revokeObjectURL(blobUrl);
                })
                .catch(error => {
                    console.error('Download failed, falling back to standard link:', error);
                    window.location.href = fileUrl;
                });
        });
    }
});
} 
