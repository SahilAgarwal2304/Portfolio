// Portfolio Main JavaScript - No Animations
class Portfolio {
    constructor() {
        this.lastScrollY = window.scrollY;
        this.header = document.getElementById('header');
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.querySelector('.nav-links');
        this.isMobileMenuOpen = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.highlightActiveNav();
    }

    setupEventListeners() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    this.handleScroll();
                    scrollTimeout = null;
                }, 10);
            }
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    setupScrollEffects() {
        this.handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Hide navbar when scrolling down, show when scrolling up
            if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                // Scrolling down
                this.header.classList.add('hidden');
                this.header.classList.remove('scrolled');
            } else {
                // Scrolling up
                this.header.classList.remove('hidden');
                if (currentScrollY > 50) {
                    this.header.classList.add('scrolled');
                } else {
                    this.header.classList.remove('scrolled');
                }
            }
            
            this.lastScrollY = currentScrollY;
            this.highlightActiveNav();
        };

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu after clicking link
                    if (this.isMobileMenuOpen) {
                        this.closeMobileMenu();
                    }
                }
            });
        });
    }

    setupMobileMenu() {
        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && 
                !this.navLinks.contains(e.target) && 
                !this.hamburger.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.navLinks.classList.toggle('active');
        this.isMobileMenuOpen = this.navLinks.classList.contains('active');
        
        // Update hamburger icon
        const icon = this.hamburger.querySelector('i');
        if (this.isMobileMenuOpen) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    closeMobileMenu() {
        this.navLinks.classList.remove('active');
        this.isMobileMenuOpen = false;
        
        // Reset hamburger icon
        const icon = this.hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }

    highlightActiveNav() {
        let current = '';
        const scrollY = window.pageYOffset + 100;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        document.querySelectorAll('.nav-links a').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});