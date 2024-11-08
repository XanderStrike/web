document.addEventListener('mousemove', function (e) {
    const elements = document.querySelectorAll('.container, .header, .bio, .music, .contact');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const distance = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
        if (distance < 100) { // Adjust this value to change sensitivity
            const angle = Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2));
            element.style.transform = `translate(${Math.cos(angle) * 20}px, ${Math.sin(angle) * 20}px)`;
        } else {
            element.style.transform = 'translate(0, 0)';
        }
    });
});
