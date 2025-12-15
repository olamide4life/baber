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
        <div class="service-card" data-category="${service.category}" onclick="toggleService(${service.id}, event)">
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="service-info">
                <span>⏱️ ${service.duration}</span>
                <span class="service-price">$${service.price}</span>
            </div>
            <div class="service-details" id="details-${service.id}">
                <p style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--accent-gold);">
                    Perfect for those seeking ${service.category} grooming services. 
                    Book now to experience premium service.
                </p>
            </div>
        </div>
    `).join('');
}

function toggleService(id, event) {
    const card = event.currentTarget;
    card.classList.toggle('expanded');
}

// Service Filters
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderServices(btn.dataset.filter);
    });
});

// ---------------------------
// Populate Booking Form
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

// ---------------------------
// Booking Form Validation
// ---------------------------
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    
    let isValid = true;
    document.querySelectorAll('.error-message').forEach(msg => msg.style.display = 'none');
    
    if (!name) { document.getElementById('nameError').style.display = 'block'; isValid=false; }
    if (!phone || !/^\d{10}$/.test(phone.replace(/\D/g, ''))) { document.getElementById('phoneError').style.display='block'; isValid=false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('emailError').style.display='block'; isValid=false; }
    if (!service) { document.getElementById('serviceError').style.display='block'; isValid=false; }
    if (!date) { document.getElementById('dateError').style.display='block'; isValid=false; }
    if (!time) { document.getElementById('timeError').style.display='block'; isValid=false; }
    
    if (isValid) {
        const bookingData = { name, phone, email, service, date, time };
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push({ ...bookingData, id: Date.now(), timestamp: new Date().toISOString() });
        localStorage.setItem('bookings', JSON.stringify(bookings));
        document.getElementById('successMessage').style.display='block';
        document.getElementById('bookingForm').reset();
        setTimeout(()=>{ document.getElementById('successMessage').style.display='none'; },5000);
    }
});

// ---------------------------
// Horizontal Gallery
// ---------------------------
// Horizontal Gallery (FIXED — no page jump)
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const items = Array.from(gallery.querySelectorAll(".item"));

  let isSwiping = false;
  let startX = 0;
  let startY = 0;

  // helper → center item horizontally ONLY
  function centerItemHorizontally(container, item) {
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const scrollLeft =
      container.scrollLeft +
      (itemRect.left - containerRect.left) -
      (containerRect.width / 2) +
      (itemRect.width / 2);

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth"
    });
  }

  items.forEach(item => {

    // touch start
    item.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = false;
    }, { passive: true });

    // detect swipe
    item.addEventListener("touchmove", (e) => {
      const dx = Math.abs(e.touches[0].clientX - startX);
      const dy = Math.abs(e.touches[0].clientY - startY);
      if (dx > 8 || dy > 8) isSwiping = true;
    }, { passive: true });

    // tap = expand (NO vertical scroll)
    item.addEventListener("touchend", (e) => {
      if (isSwiping) return;

      e.preventDefault();

      items.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      gallery.classList.add("has-active");

      // 🔥 horizontal centering only
      centerItemHorizontally(gallery, item);
    });

    // desktop click support
    item.addEventListener("click", (e) => {
      e.preventDefault();

      items.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      gallery.classList.add("has-active");

      centerItemHorizontally(gallery, item);
    });
  });
});


  // Close button
  items.forEach(item => {
    const closeBtn = item.querySelector(".close-btn");
    if (!closeBtn) return;

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      item.classList.remove("active");
      gallery.classList.remove("has-active");
    });

    closeBtn.addEventListener("touchstart", (e) => {
      e.stopPropagation();
      e.preventDefault();
      item.classList.remove("active");
      gallery.classList.remove("has-active");
    }, { passive: false });
  });



// ---------------------------
// Testimonials
// ---------------------------
let currentTestimonial=0;
function renderTestimonials(){
    const container=document.getElementById('testimonialsContainer');
    const dots=document.getElementById('sliderDots');
    container.innerHTML = testimonialsData.map((test,i)=>`
        <div class="testimonial ${i===0?'active':''}">
            <div class="testimonial-stars">${'★'.repeat(test.stars)}</div>
            <p class="testimonial-text">"${test.text}"</p>
            <p class="testimonial-author">— ${test.author}</p>
        </div>
    `).join('');
    
    dots.innerHTML = testimonialsData.map((_,i)=>`<span class="dot ${i===0?'active':''}" onclick="showTestimonial(${i})"></span>`).join('');
}

function showTestimonial(index){
    document.querySelectorAll('.testimonial').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(d=>d.classList.remove('active'));
    document.querySelectorAll('.testimonial')[index].classList.add('active');
    document.querySelectorAll('.dot')[index].classList.add('active');
    currentTestimonial=index;
}

// Auto rotate
setInterval(()=>{ showTestimonial((currentTestimonial+1)%testimonialsData.length); },5000);

// ---------------------------
// Newsletter
// ---------------------------
function subscribeNewsletter(){
    const email = document.getElementById('newsletterEmail').value;
    if(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        alert('✓ Thank you for subscribing!');
        document.getElementById('newsletterEmail').value='';
    } else {
        alert('Please enter a valid email address');
    }
}

// ---------------------------
// Booking Minimum Date
// ---------------------------
const today = new Date().toISOString().split('T')[0];
document.getElementById('date').setAttribute('min', today);

// ---------------------------
// About Section
// ---------------------------
const circle = document.getElementById("aboutCircle");
const expanded = document.getElementById("aboutExpanded");
const closeBtn = document.getElementById("closeExpanded");

function openAbout(e) {
    e.stopPropagation();

    // temporarily let height auto to measure final height
    expanded.style.height = "auto";
    const fullHeight = expanded.offsetHeight + "px";

    // reset to collapsed state
    expanded.style.height = "0px";
    expanded.style.opacity = "0";
    expanded.style.padding = "0";
    expanded.style.transform = "scale(0.7) translateY(-20px)";
    expanded.style.borderRadius = "50%";

    expanded.classList.add("active");

    setTimeout(() => {
        expanded.style.height = fullHeight;
        expanded.style.opacity = "1";
        expanded.style.padding = "20px";
        expanded.style.transform = "scale(1) translateY(0)";
        expanded.style.borderRadius = "20px";
    }, 10);

    expanded.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeAbout(e) {
    e.stopPropagation();

    // animate back
    expanded.style.height = expanded.offsetHeight + "px";
    setTimeout(() => {
        expanded.style.height = "0px";
        expanded.style.opacity = "0";
        expanded.style.padding = "0";
        expanded.style.transform = "scale(0.7) translateY(-20px)";
        expanded.style.borderRadius = "50%";
    }, 10);

    setTimeout(() => {
        expanded.classList.remove("active");
    }, 600);
}

circle.addEventListener("click", openAbout);
circle.addEventListener("touchstart", openAbout);

closeBtn.addEventListener("click", closeAbout);
closeBtn.addEventListener("touchstart", closeAbout);

// ---------------------------
// Initialize
// ---------------------------
renderServices();
populateBookingForm();
renderTestimonials();

