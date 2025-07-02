// Products data
const products = [
    {
        id: 1,
        title: "Crypto Scam Method",
        description: "Crypto method to scam money, earn 100$ to 1000$ a day",
        longDescription: "In this method you'll see how to scam solana crypto.",
        price: "15€",
        originalPrice: "40€",
        features: [
            "PDF files with all the instructions",
            "Free vpn and other stuff",
            "Vocal support if needed",
        ],
        popular: true,
        rating: 5,
        image: "https://cdn.discordapp.com/attachments/1368646652264579197/1389667996045148273/Sans_titre-2.png?ex=686574ad&is=6864232d&hm=889990e2f014fd671b6652c822692f5fcfd869af8d11c352735d3977c52a3469&    ",
        images: [
            "https://cdn.discordapp.com/attachments/1368646652264579197/1389634172091367536/Capture_decran_2025-07-01_140605.png?ex=6865552c&is=686403ac&hm=7a0bdad9e5542b8e069f9fb668eb8abcd08078a10f20515b8631f27d748ddd73&",
            "https://cdn.discordapp.com/attachments/1368646652264579197/1389634294451802303/Capture_decran_2025-06-30_173103.png?ex=68655549&is=686403c9&hm=92d7e628c2f07d1f8b1964ebe6ab3cb325e19269bfe6ca68ec5ac371c0d5513a&",
        ]
    },
    {
        id: 2,
        title: "Paypal Account [ CANADA ]",
        description: "FA Paypal accounts, with balance",
        longDescription: "Minimum balance 50$ + credit card",
        price: "10€",
        features: [
            "Instant delivery",
            "Email + password",
            "2FA disabled",
        ],
        rating: 4,
        image: "https://cdn.discordapp.com/attachments/1368646652264579197/1389668269627019402/Sans_titre-3.png?ex=686574ee&is=6864236e&hm=e54b0debc518d1bee5e6de32f9f1943211f52e70775c9e7a714fa5bcd4e5d545&",
        images: [
            "https://cdn.discordapp.com/attachments/1368646652264579197/1389635121031938100/Capture_decran_2025-07-01_145732.png?ex=6865560f&is=6864048f&hm=ad9d2fe554cdb9f315f13562f98a8f50d443ebf4de9a886ffcb6dccabdd17da2&",
        ]
    },
    {
        id: 3,
        title: "Virtual Credit Card",
        description: "Virtual cc perfect for carding and verification",
        longDescription: "minimum funds : 100$",
        price: "10€",
        features: [
            "Instant delivery",
            "All the informations of the giftcard",
            "3D Secure bypassed",
        ],
        rating: 5,
        image: "https://cdn.discordapp.com/attachments/1368646652264579197/1389668545125679134/Sans_titre-5.png?ex=6865752f&is=686423af&hm=6221ac265f9aacde7d140aa9f3c6424eec1c022c21d5e282c4b43de3b31baa66&",
        images: [
            "https://cdn.discordapp.com/attachments/1368646652264579197/1389637252480766002/4_CreditCard_What-is-a-Virtual-Credit-Card-All-You-Need-to-Know_option-2.jpg?ex=6865580b&is=6864068b&hm=34552c6255e2356c886cddd188713112e2654c525deb7336e4cfb553bb9c7fff&",
        ]
    }
];

let selectedProduct = null;

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const productsGrid = document.getElementById('products-grid');
const productModal = document.getElementById('product-modal');
const paymentModal = document.getElementById('payment-modal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCounters();
    renderProducts();
    initializeModals();
});

// Navigation functionality
function initializeNavigation() {
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Counter animation
function animateCounter(element, start, end, duration, suffix = '') {
    let startTime = null;
    
    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * (end - start) + start);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Initialize counters
function initializeCounters() {
    const clientsCounter = document.getElementById('clients-counter');
    const satisfactionCounter = document.getElementById('satisfaction-counter');
    
    // Start counters when page loads
    setTimeout(() => {
        animateCounter(clientsCounter, 0, 1000, 2500, '+');
        animateCounter(satisfactionCounter, 0, 99, 2000, '%');
    }, 500);
}

// Render products
function renderProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card ${product.popular ? 'popular' : ''}" onclick="openProductModal(${product.id})">
            ${product.popular ? '<div class="popular-badge">Most popular</div>' : ''}
            
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            
            <div class="product-content">
                <div class="product-header">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span class="rating-text">(${product.rating}/5)</span>
                    </div>
                </div>
                
                <p class="product-description">${product.description}</p>
                
                <div class="product-price">
                    <span class="current-price">${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                </div>
                
                <div class="product-features">
                    <ul>
                        ${product.features.slice(0, 3).map(feature => `<li>${feature}</li>`).join('')}
                        ${product.features.length > 3 ? `<li class="more-features">+${product.features.length - 3} autres fonctionnalités...</li>` : ''}
                    </ul>
                </div>
                
                <button class="product-btn ${product.popular ? 'popular' : ''}">
                    View details
                </button>
            </div>
        </div>
    `).join('');
}

// Generate stars HTML
function generateStars(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += `<span class="star ${i <= rating ? '' : 'empty'}">★</span>`;
    }
    return starsHTML;
}

// Modal functionality
function initializeModals() {
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-backdrop')) {
            closeAllModals();
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Open product modal
function openProductModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    if (!selectedProduct) return;

    // Populate modal content
    document.getElementById('modal-product-title').textContent = selectedProduct.title;
    document.getElementById('modal-product-price').textContent = selectedProduct.price;
    document.getElementById('modal-product-description').textContent = selectedProduct.longDescription;
    
    if (selectedProduct.originalPrice) {
        document.getElementById('modal-product-original-price').textContent = selectedProduct.originalPrice;
        document.getElementById('modal-product-original-price').style.display = 'inline';
    } else {
        document.getElementById('modal-product-original-price').style.display = 'none';
    }

    // Set main image
    document.getElementById('main-product-image').src = selectedProduct.images[0];
    document.getElementById('main-product-image').alt = selectedProduct.title;

    // Generate thumbnails
    const thumbnailsContainer = document.getElementById('thumbnail-images');
    thumbnailsContainer.innerHTML = selectedProduct.images.slice(1).map((image, index) => `
        <div class="thumbnail" onclick="changeMainImage('${image}')">
            <img src="${image}" alt="${selectedProduct.title} ${index + 2}">
        </div>
    `).join('');

    // Generate rating stars
    document.getElementById('modal-product-rating').innerHTML = generateStars(selectedProduct.rating);

    // Generate features list
    document.getElementById('modal-product-features').innerHTML = selectedProduct.features.map(feature => `
        <li>${feature}</li>
    `).join('');

    // Show modal
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Change main image in product modal
function changeMainImage(imageSrc) {
    document.getElementById('main-product-image').src = imageSrc;
}

// Close product modal
function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Open payment modal
function openPaymentModal() {
    if (!selectedProduct) return;

    // Populate payment modal
    document.getElementById('payment-product-title').textContent = selectedProduct.title;
    document.getElementById('payment-product-price').textContent = selectedProduct.price;

    // Show payment modal and hide product modal
    productModal.classList.remove('active');
    paymentModal.classList.add('active');
}

// Close payment modal
function closePaymentModal() {
    paymentModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close all modals
function closeAllModals() {
    productModal.classList.remove('active');
    paymentModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Payment method selection
function selectPaymentMethod(method) {
    // Update active payment option
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-method="${method}"]`).classList.add('active');

    // Show corresponding payment details
    document.querySelectorAll('.payment-method-details').forEach(details => {
        details.classList.remove('active');
    });
    document.getElementById(`${method}-payment`).classList.add('active');
}

// Copy to clipboard functionality
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        const copyBtn = element.nextElementSibling;
        const originalHTML = copyBtn.innerHTML;
        
        copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
        `;
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error(':', err);
    });
}
