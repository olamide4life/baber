// ---------------------------
// Data
// ---------------------------
const servicesData = [
  { id: 1, name: "Classic Haircut", category: "men", price: 25, duration: "30 min", description: "Traditional barbering with modern techniques." },
  { id: 2, name: "Premium Haircut", category: "men", price: 35, duration: "45 min", description: "Detailed styling with hot towel treatment." },
  { id: 3, name: "Beard Trim", category: "men", price: 15, duration: "20 min", description: "Professional beard shaping." },
  { id: 4, name: "Hot Shave", category: "men", price: 30, duration: "40 min", description: "Straight razor shave with hot towels." },
  { id: 5, name: "Hair & Beard Combo", category: "men", price: 45, duration: "60 min", description: "Complete grooming package." },
  { id: 6, name: "Women's Cut & Style", category: "women", price: 40, duration: "60 min", description: "Expert cutting and styling." },
  { id: 7, name: "Hair Wash & Blow Dry", category: "women", price: 25, duration: "30 min", description: "Professional wash & blow dry." },
  { id: 8, name: "Kids Haircut", category: "kids", price: 20, duration: "25 min", description: "Friendly haircut for kids." }
];

const testimonialsData = [
  { text: "Best barber in town!", author: "Alex Thompson", stars: 5 },
  { text: "Amazing service and clean shop.", author: "Jessica Martinez", stars: 5 },
  { text: "Professional and skilled.", author: "Robert Lee", stars: 5 }
];

// ---------------------------
// DOM Ready
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {

  // ---------------------------
  // Render Services
  // ---------------------------
  const servicesGrid = document.getElementById("servicesGrid");
  if (servicesGrid) {
    servicesGrid.innerHTML = servicesData.map(service => `
      <div class="service-card">
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <div class="service-info">
          <span>${service.duration}</span>
          <span>$${service.price}</span>
        </div>
      </div>
    `).join("");
  }

  // ---------------------------
  // Populate Booking Services
  // ---------------------------
  const serviceSelect = document.getElementById("service");
  if (serviceSelect) {
    servicesData.forEach(service => {
      const option = document.createElement("option");
      option.value = service.name;
      option.textContent = `${service.name} - $${service.price}`;
      serviceSelect.appendChild(option);
    });
  }

  // ---------------------------
  // Booking Form
  // ---------------------------
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const service = document.getElementById("service").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const successMessage = document.getElementById("successMessage");

      if (!name || !phone || !email || !service || !date || !time) return;

      // ---------------------------
      // ✅ STRONG BOOKING ID
      // ---------------------------
      const bookingId = `GC-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;

      const bookingData = {
        bookingId,
        name,
        phone,
        email,
        service,
        date,
        time,
        createdAt: new Date().toISOString()
      };

      // Save booking
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      bookings.push(bookingData);
      localStorage.setItem("bookings", JSON.stringify(bookings));

      // Success UI
      successMessage.innerHTML = `
        ✓ Appointment booked successfully!<br>
        <strong>Booking ID:</strong> ${bookingId}<br>
        Please keep this number for reference.
      `;
      successMessage.style.display = "block";

      bookingForm.reset();

      setTimeout(() => {
        successMessage.style.display = "none";
      }, 7000);
    });
  }

  // ---------------------------
  // Testimonials
  // ---------------------------
  function renderTestimonials(){
        const container = document.getElementById('testimonialsContainer');
        const dots = document.getElementById('sliderDots');
        if(!container || !dots) return;

        container.innerHTML = testimonialsData.map((test,i)=>`
            <div class="testimonial ${i===0?'active':''}">
                <div class="testimonial-stars">${'★'.repeat(test.stars)}</div>
                <p class="testimonial-text">"${test.text}"</p>
                <p class="testimonial-author">— ${test.author}</p>
            </div>
        `).join('');

        dots.innerHTML = testimonialsData.map((_,i)=>`<span class="dot ${i===0?'active':''}" onclick="showTestimonial(${i})"></span>`).join('');
    }

    window.showTestimonial = function(index){
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');
        if(!testimonials[index] || !dots[index]) return;

        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        testimonials[index].classList.add('active');
        dots[index].classList.add('active');

        currentTestimonial = index;
    }

    renderTestimonials();
    setInterval(()=>showTestimonial((currentTestimonial+1)%testimonialsData.length),5000);
});
