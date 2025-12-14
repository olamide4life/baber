// --------------------------- 
// Data
// ---------------------------
const servicesData = [
    { id: 1, name: "Classic Haircut", category: "men", price: 25, duration: "30 min", description: "Traditional barbering with modern techniques. Includes consultation, cut, and styling." },
    { id: 2, name: "Premium Haircut", category: "men", price: 35, duration: "45 min", description: "Detailed styling with hot towel treatment and shoulder massage." },
    { id: 3, name: "Beard Trim", category: "men", price: 15, duration: "20 min", description: "Professional beard shaping and grooming." },
    { id: 4, name: "Hot Shave", category: "men", price: 30, duration: "40 min", description: "Straight razor shave with hot towels and premium oils." },
    { id: 5, name: "Hair & Beard Combo", category: "men", price: 45, duration: "60 min", description: "Complete grooming package combining haircut and beard service." },
    { id: 6, name: "Women's Cut & Style", category: "women", price: 40, duration: "60 min", description: "Expert cutting and styling for all hair types." },
    { id: 7, name: "Hair Wash & Blow Dry", category: "women", price: 25, duration: "30 min", description: "Professional washing and blow drying service." },
    { id: 8, name: "Kids Haircut", category: "kids", price: 20, duration: "25 min", description: "Patient, friendly service for children under 12." }
];

const testimonialsData = [
    { text: "Best barber in town! Always on point with my fade. Never disappoints!", author: "Alex Thompson, 28", stars: 5 },
    { text: "Incredible service! Professional, friendly, and the salon atmosphere is amazing!", author: "Jessica Martinez, 32", stars: 5 },
    { text: "Great experience! Clean shop, skilled work, fair prices. Been coming here for years.", author: "Robert Lee, 45", stars: 5 },
    { text: "My son loves getting his hair cut here. Patient and makes it fun for kids!", author: "Michelle Davis, 38", stars: 5 }
];

// ---------------------------
// Theme Toggle
// ---------------------------
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeIcon.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ---------------------------
// Navigation Hamburger
// ---------------------------
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-center').classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-center').classList.remove('active');
    });
});

// ---------------------------
// Smooth Scrolling
// ---------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ---------------------------
// Render Services
// ---------------------------
function renderServices(filter = 'all') {
    const grid = document.getElementById('servicesGrid');
    const filtered = filter === 'all' ? servicesData : servicesData.filter(s => s.category === filter);
    
    grid.innerHTML = filtered.map(service => `
        <div class="service-card" onclick="toggleService(${service.id}, event)">
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="service-info">
                <span>⏱️ ${service.duration}</span>
                <span class="service-price">$${service.price}</span>
            </div>
            <div class="service-details"></div>
        </div>
    `).join('');
}

function toggleService(id, event) {
    event.currentTarget.classList.toggle('expanded');
}

// ---------------------------
// Booking + Form logic (UNCHANGED)
// ---------------------------
function populateBookingForm() {
    const serviceSelect = document.getElementById('service');
    servicesData.forEach(service => {
        const option = document.createElement('option');
        option.value = service.name;
        option.textContent = `${service.name} - $${service.price}`;
        serviceSelect.appendChild(option);
    });
}

document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('successMessage').style.display = 'block';
    e.target.reset();
    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
    }, 4000);
});

// ---------------------------
// ✅ FIXED GALLERY (iOS / Android / Desktop)
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const items = Array.from(document.querySelectorAll(".gallery .item"));

    // ---------- Desktop drag ----------
    let mouseDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let dragged = false;

    gallery.addEventListener("mousedown", (e) => {
        mouseDown = true;
        dragged = false;
        startX = e.pageX;
        scrollLeft = gallery.scrollLeft;
        if (e.target.tagName === "IMG") e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
        if (!mouseDown) return;
        const x = e.pageX - startX;
        if (Math.abs(x) > 5) dragged = true;
        gallery.scrollLeft = scrollLeft - x;
    });

    document.addEventListener("mouseup", () => {
        mouseDown = false;
    });

    // ---------- Desktop click expand ----------
    items.forEach(item => {
        item.addEventListener("click", () => {
            if (dragged) return;
            items.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            item.scrollIntoView({ behavior: "smooth", inline: "center" });
        });
    });

    // ---------- Mobile tap expand (FIX) ----------
    items.forEach(item => {
        let startX = 0;
        let startY = 0;

        item.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        item.addEventListener("touchend", (e) => {
            const dx = Math.abs(e.changedTouches[0].clientX - startX);
            const dy = Math.abs(e.changedTouches[0].clientY - startY);

            // REAL TAP (not swipe)
            if (dx < 10 && dy < 10) {
                items.forEach(i => i.classList.remove("active"));
                item.classList.add("active");
                item.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest"
                });
            }
        }, { passive: true });
    });
});

// ---------------------------
// Testimonials
// ---------------------------
let currentTestimonial = 0;
function renderTestimonials() {
    const container = document.getElementById('testimonialsContainer');
    container.innerHTML = testimonialsData.map((t, i) => `
        <div class="testimonial ${i === 0 ? 'active' : ''}">
            <p>"${t.text}"</p>
            <strong>${t.author}</strong>
        </div>
    `).join('');
}

setInterval(() => {
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(t => t.classList.remove('active'));
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
}, 5000);

// ---------------------------
// About Section
// ---------------------------
const circle = document.getElementById("aboutCircle");
const expanded = document.getElementById("aboutExpanded");
const closeBtn = document.getElementById("closeExpanded");

circle.addEventListener("click", () => expanded.classList.add("active"));
closeBtn.addEventListener("click", () => expanded.classList.remove("active"));

// ---------------------------
// Init
// ---------------------------
renderServices();
populateBookingForm();
renderTestimonials();
