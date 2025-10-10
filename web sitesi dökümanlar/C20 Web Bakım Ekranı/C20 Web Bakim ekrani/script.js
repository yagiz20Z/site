// Enhanced JavaScript for Background Animation with Collision Avoidance
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the background animation system
    initBackgroundAnimation();
    initTextAnimations();
    initContactHover();
    initDynamicTextGeneration();
});

// Background Animation System with Collision Avoidance
function initBackgroundAnimation() {
    const container = document.querySelector('.background-animation');
    const columns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'];
    
    // Add cosmic background
    const cosmicBackground = document.createElement('div');
    cosmicBackground.className = 'cosmic-background';
    document.body.insertBefore(cosmicBackground, container);
    
    // Initialize existing text elements with proper timing
    const textElements = container.querySelectorAll('span');
    textElements.forEach((element, index) => {
        // Ensure proper initial positioning
        element.style.transform = 'translateY(100vh)';
        
        // Add slight random variation to prevent perfect synchronization
        const randomDelay = Math.random() * 2; // 0-2 seconds
        const currentDelay = parseFloat(element.style.animationDelay) || 0;
        element.style.animationDelay = `${currentDelay + randomDelay}s`;
        
        // Add unique identifier for tracking
        element.setAttribute('data-id', `text-${index}`);
    });
}

// Dynamic Text Generation with Collision Avoidance
function initDynamicTextGeneration() {
    const container = document.querySelector('.background-animation');
    const columns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'];
    
    const techTerms = [
        'Yapay Zeka ve Makine Öğrenmesi',
        'Kuantum Hesaplama',
        'Blockchain Teknolojileri',
        'IoT ve Akıllı Sistemler',
        'Siber Güvenlik',
        'Veri Analizi ve Büyük Veri',
        'Bulut Bilişim',
        'Mobil Uygulama Geliştirme',
        'Web Geliştirme',
        'DevOps ve CI/CD',
        'Makine Öğrenmesi Algoritmaları',
        'Derin Öğrenme ve Sinir Ağları',
        'Doğal Dil İşleme (NLP)',
        'Bilgisayarlı Görü ve Görüntü İşleme',
        'Robotik ve Otonom Sistemler',
        'Akıllı Şehir Teknolojileri',
        'Dijital Dönüşüm',
        'Yazılım Mimarisi ve Tasarım Desenleri',
        'API Geliştirme ve Entegrasyon',
        'Veri Güvenliği ve Şifreleme',
        'Yapay Zeka Destekli Yarı İletken Tasarımı',
        'Üretken Yapay Zeka ile Mühendislik',
        'Yapay Zeka için Özelleştirilmiş Donanımlar',
        'Fiziksel Yapay Zeka (Embodied AI)',
        'Edge AI (Sınır Bilişim)',
        'Yeni Nesil İtki Sistemleri',
        'Havacılık ve Uzay için İleri Malzemeler',
        'Otonom Uçuş ve Uydu Sistemleri',
        'Yeniden Kullanılabilir Fırlatma Sistemleri',
        'Yörünge Mekaniği ve Uzay Çöpleri'
    ];
    
    // Generate new text elements periodically
    setInterval(() => {
        if (Math.random() < 0.4) { // 40% chance every interval
            const newText = document.createElement('span');
            newText.textContent = techTerms[Math.floor(Math.random() * techTerms.length)];
            
            // Assign random column
            const randomColumn = columns[Math.floor(Math.random() * columns.length)];
            newText.className = randomColumn;
            
            // Generate unique timing to prevent collisions
            const duration = 25 + Math.random() * 15; // 25-40 seconds
            const delay = Math.random() * 30; // 0-30 seconds delay
            
            newText.style.animationDuration = `${duration}s`;
            newText.style.animationDelay = `${delay}s`;
            newText.style.transform = 'translateY(100vh)';
            
            // Add unique identifier
            newText.setAttribute('data-id', `dynamic-${Date.now()}`);
            
            container.appendChild(newText);
            
            // Remove after animation completes
            setTimeout(() => {
                if (newText.parentNode) {
                    newText.parentNode.removeChild(newText);
                }
            }, (duration + delay) * 1000);
        }
    }, 8000); // Add new text every 8 seconds
}

// Text Animations
function initTextAnimations() {
    const teamName = document.querySelector('.team-name');
    const maintenanceText = document.querySelector('.maintenance-text');
    const description = document.querySelector('.maintenance-description');
    
    // Staggered text appearance
    setTimeout(() => {
        if (teamName) {
            teamName.style.animation = 'fadeInUp 1s ease-out';
        }
    }, 500);
    
    setTimeout(() => {
        if (maintenanceText) {
            maintenanceText.style.animation = 'fadeInUp 1s ease-out';
        }
    }, 1000);
    
    setTimeout(() => {
        if (description) {
            description.style.animation = 'fadeInUp 1s ease-out';
        }
    }, 1500);
}

// Contact Link Hover Effects
function initContactHover() {
    const contactLink = document.querySelector('.contact-link');
    
    if (contactLink) {
        contactLink.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.3)';
        });
        
        contactLink.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.2)';
        });
    }
}

// Enhanced collision detection and prevention
function preventTextCollisions() {
    const textElements = document.querySelectorAll('.background-animation span');
    const columns = {};
    
    // Group elements by column
    textElements.forEach(element => {
        const columnClass = Array.from(element.classList).find(cls => cls.startsWith('column-'));
        if (columnClass) {
            if (!columns[columnClass]) {
                columns[columnClass] = [];
            }
            columns[columnClass].push(element);
        }
    });
    
    // Check for potential collisions within each column
    Object.keys(columns).forEach(columnKey => {
        const columnElements = columns[columnKey];
        columnElements.forEach((element, index) => {
            if (index > 0) {
                const prevElement = columnElements[index - 1];
                const currentRect = element.getBoundingClientRect();
                const prevRect = prevElement.getBoundingClientRect();
                
                // If elements are too close, adjust timing
                if (Math.abs(currentRect.top - prevRect.top) < 100) {
                    const currentDelay = parseFloat(element.style.animationDelay) || 0;
                    element.style.animationDelay = `${currentDelay + 2}s`;
                }
            }
        });
    });
}

// Call collision prevention periodically
setInterval(preventTextCollisions, 2000);

// Add subtle parallax effect for background texts
window.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const textContainer = document.querySelector('.background-animation');
    const cosmicBackground = document.querySelector('.cosmic-background');
    
    if (textContainer) {
        const parallaxX = (mouseX - 0.5) * 10;
        const parallaxY = (mouseY - 0.5) * 10;
        textContainer.style.transform = `translate(${parallaxX}px, ${parallaxY}px)`;
    }
    
    if (cosmicBackground) {
        const parallaxX = (mouseX - 0.5) * 5;
        const parallaxY = (mouseY - 0.5) * 5;
        cosmicBackground.style.transform = `translate(${parallaxX}px, ${parallaxY}px)`;
    }
});

// Page load animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loading styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 1s ease-in-out;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Add typing effect for maintenance text
function initTypingEffect() {
    const maintenanceText = document.querySelector('.maintenance-text');
    if (!maintenanceText) return;
    
    const text = maintenanceText.textContent;
    maintenanceText.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            maintenanceText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 2000);
}

// Initialize typing effect
initTypingEffect();

// Performance optimization: Reduce animation frequency on low-end devices
function optimizeForPerformance() {
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    if (isLowEndDevice) {
        // Reduce animation complexity for low-end devices
        const textElements = document.querySelectorAll('.background-animation span');
        textElements.forEach(element => {
            element.style.willChange = 'auto';
            element.style.backfaceVisibility = 'visible';
        });
    }
}

// Call performance optimization
optimizeForPerformance();