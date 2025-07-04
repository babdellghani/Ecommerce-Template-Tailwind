// Menu (Legacy - keeping for compatibility)
let spanOne = document.querySelector(".spanone");
let spanTwo = document.querySelector(".spantwo");
let spanThree = document.querySelector(".spanthree");
let menu = document.querySelector(".menu");
let nav = document.querySelector(".nav-menu");

if (menu && nav) {
  menu.addEventListener("click", () => {
    if (spanOne && spanTwo && spanThree) {
      spanOne.classList.toggle("one");
      spanTwo.classList.toggle("two");
      spanThree.classList.toggle("three");
    }
    if (nav.classList.contains("active")) {
      nav.classList.remove("active");
      nav.classList.add("desactive");
    } else {
      nav.classList.remove("hidden");
      nav.classList.remove("desactive");
      nav.classList.add("active");
    } 
  });
}

// Sub Menu (Legacy - keeping for compatibility)
let subMenu = document.querySelector(".subMenu");
let subMenuList = document.querySelector(".sub-menu");
let icon = document.querySelector(".subMenu .fa-angle-down");

if (subMenu && subMenuList && icon) {
  subMenu.addEventListener("click", () => {
    if (subMenuList.classList.contains("h-0")) {
      subMenuList.classList.remove("h-0");
      subMenuList.classList.add("h-full");
      icon.classList.remove("rotate-90");
      icon.classList.add("rotate-0");
    } else {
      subMenuList.classList.remove("h-full");
      subMenuList.classList.add("h-0");
      icon.classList.remove("rotate-0");
      icon.classList.add("rotate-90");
    } 
  })
}

// Input (Product page only - add null checks)
let input = document.querySelector(".input");
let minus = document.querySelector(".minus");
let plus = document.querySelector(".plus");

if (minus && input) {
  minus.addEventListener("click", () => {
    if (input.value > 1) {
      input.value--;
    }
  })
}

if (plus && input) {
  plus.addEventListener("click", () => {
    input.value++;
  })
}

// Image Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const mainImage = document.getElementById('mainProductImage');
  const thumbnailBtns = document.querySelectorAll('.thumbnail-btn');
  
  if (mainImage && thumbnailBtns.length > 0) {
    // Add click event to each thumbnail
    thumbnailBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all thumbnails
        thumbnailBtns.forEach(thumb => {
          thumb.classList.remove('active');
          thumb.classList.remove('border-blue-600');
          thumb.classList.add('border-2');
        });
        
        // Add active class to clicked thumbnail
        this.classList.add('active');
        this.classList.add('border-blue-600');
        this.classList.remove('border-2');
        
        // Change main image source
        const newImageSrc = this.getAttribute('data-image');
        if (newImageSrc) {
          // Add fade effect
          mainImage.style.opacity = '0.5';
          
          setTimeout(() => {
            mainImage.src = newImageSrc;
            mainImage.style.opacity = '1';
          }, 150);
        }
      });
    });
    
    // Set initial active state
    if (thumbnailBtns[0]) {
      thumbnailBtns[0].classList.add('active');
      thumbnailBtns[0].classList.add('border-blue-600');
    }
    
    // Keyboard navigation for carousel
    document.addEventListener('keydown', function(e) {
      const activeIndex = Array.from(thumbnailBtns).findIndex(btn => btn.classList.contains('active'));
      
      if (e.key === 'ArrowLeft' && activeIndex > 0) {
        thumbnailBtns[activeIndex - 1].click();
      } else if (e.key === 'ArrowRight' && activeIndex < thumbnailBtns.length - 1) {
        thumbnailBtns[activeIndex + 1].click();
      }
    });
  }
});

// Image zoom functionality (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
  const mainImageContainer = document.querySelector('.image');
  const mainImage = document.getElementById('mainProductImage');
  
  if (mainImageContainer && mainImage) {
    mainImageContainer.addEventListener('click', function() {
      // Create modal for image zoom
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
      modal.innerHTML = `
        <div class="relative max-w-4xl max-h-full">
          <img src="${mainImage.src}" alt="${mainImage.alt}" class="max-w-full max-h-full object-contain rounded-lg">
          <button class="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;
      
      // Add modal to body
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
      
      // Close modal functionality
      const closeModal = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
      };
      
      // Close on button click
      modal.querySelector('button').addEventListener('click', closeModal);
      
      // Close on overlay click
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
      
      // Close on escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
    });
  }
});

// Enhanced Buy Section Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Quantity controls
  const minusBtn = document.querySelector('.minus');
  const plusBtn = document.querySelector('.plus');
  const quantityInput = document.querySelector('.input');
  
  if (minusBtn && plusBtn && quantityInput) {
    minusBtn.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        updatePrice();
      }
    });
    
    plusBtn.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
      updatePrice();
    });
  }
  
  // Update price based on quantity
  function updatePrice() {
    const quantity = parseInt(quantityInput.value);
    const basePrice = 499.00;
    const totalPrice = (basePrice * quantity).toFixed(2);
    
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
      addToCartBtn.innerHTML = `<i class="fas fa-shopping-cart mr-2"></i>Add to Cart - $${totalPrice}`;
    }
  }
  
  // Add to cart functionality
  const addToCartBtn = document.querySelector('.add-to-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      // Add loading state
      this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Adding to Cart...';
      this.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-check mr-2"></i>Added to Cart!';
        this.classList.remove('from-blue-600', 'to-blue-700');
        this.classList.add('from-green-600', 'to-green-700');
        
        // Update cart badge
        const cartBadges = document.querySelectorAll('.badge');
        cartBadges.forEach(badge => {
          if (badge.textContent === '0') {
            badge.textContent = quantityInput.value;
          }
        });
        
        // Reset button after 2 seconds
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i>Add to Cart - $499.00';
          this.classList.remove('from-green-600', 'to-green-700');
          this.classList.add('from-blue-600', 'to-blue-700');
          this.disabled = false;
          updatePrice();
        }, 2000);
      }, 1000);
    });
  }
  
  // Buy now functionality
  const buyNowBtn = document.querySelector('.buy-now');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function() {
      alert('Redirecting to checkout...');
    });
  }
  
  // Wishlist functionality
  const wishlistBtn = document.querySelector('.secondary-actions button:first-child');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        this.classList.add('text-red-600', 'border-red-600');
        this.innerHTML = '<i class="fas fa-heart mr-2"></i>Wishlisted';
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        this.classList.remove('text-red-600', 'border-red-600');
        this.innerHTML = '<i class="far fa-heart mr-2"></i>Wishlist';
      }
    });
  }
});

// Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all tabs and panes
      tabBtns.forEach(tab => {
        tab.classList.remove('active', 'text-blue-600', 'border-blue-600');
        tab.classList.add('text-gray-600');
      });
      
      tabPanes.forEach(pane => {
        pane.classList.add('hidden');
        pane.classList.remove('active');
      });
      
      // Add active class to clicked tab
      this.classList.add('active', 'text-blue-600', 'border-blue-600');
      this.classList.remove('text-gray-600');
      
      // Show corresponding pane
      const targetPane = document.getElementById(targetTab + '-tab');
      if (targetPane) {
        targetPane.classList.remove('hidden');
        targetPane.classList.add('active');
      }
    });
  });
  
  // Review filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(filter => {
        filter.classList.remove('active', 'bg-blue-600', 'text-white');
        filter.classList.add('bg-gray-100', 'text-gray-700');
      });
      
      this.classList.add('active', 'bg-blue-600', 'text-white');
      this.classList.remove('bg-gray-100', 'text-gray-700');
    });
  });
  
  // Review helpful buttons
  const helpfulBtns = document.querySelectorAll('.review-actions button:first-child');
  helpfulBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const countMatch = this.textContent.match(/\((\d+)\)/);
      if (countMatch) {
        const currentCount = parseInt(countMatch[1]);
        const newCount = currentCount + 1;
        this.innerHTML = this.innerHTML.replace(/\(\d+\)/, `(${newCount})`);
        this.classList.add('text-blue-600');
      }
    });
  });
});

// Modern Header JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const closeMobileMenu = document.getElementById('closeMobileMenu');

  function openMobileMenu() {
    mobileMenu.classList.remove('-translate-x-full');
    mobileMenuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenuFunc() {
    mobileMenu.classList.add('-translate-x-full');
    mobileMenuOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }

  if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenuFunc);
  }

  // Mobile Search Toggle
  const mobileSearchBtn = document.getElementById('mobileSearchBtn');
  const mobileSearchBar = document.getElementById('mobileSearchBar');

  if (mobileSearchBtn && mobileSearchBar) {
    mobileSearchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const isHidden = mobileSearchBar.classList.contains('hidden');
      
      if (isHidden) {
        mobileSearchBar.classList.remove('hidden');
        // Focus on the search input
        const searchInput = mobileSearchBar.querySelector('input');
        if (searchInput) {
          setTimeout(() => searchInput.focus(), 100);
        }
      } else {
        mobileSearchBar.classList.add('hidden');
      }
    });
  }

  // Unified Dropdown Management System
  const dropdowns = {
    categories: {
      btn: document.getElementById('categoriesBtn'),
      dropdown: document.getElementById('categoriesDropdown'),
      icon: document.getElementById('categoriesIcon')
    },
    mobileCategories: {
      btn: document.getElementById('mobileCategoriesBtn'),
      dropdown: document.getElementById('mobileCategoriesDropdown'),
      icon: document.getElementById('mobileCategoriesIcon')
    },
    mobileNav: {
      btn: document.getElementById('mobileNavBtn'),
      dropdown: document.getElementById('mobileNavDropdown'),
      icon: document.getElementById('mobileNavIcon')
    }
  };

  console.log('Dropdown elements found:', {
    categories: {
      btn: !!dropdowns.categories.btn,
      dropdown: !!dropdowns.categories.dropdown,
      icon: !!dropdowns.categories.icon
    },
    mobileCategories: {
      btn: !!dropdowns.mobileCategories.btn,
      dropdown: !!dropdowns.mobileCategories.dropdown,
      icon: !!dropdowns.mobileCategories.icon
    },
    mobileNav: {
      btn: !!dropdowns.mobileNav.btn,
      dropdown: !!dropdowns.mobileNav.dropdown,
      icon: !!dropdowns.mobileNav.icon
    }
  });

  // Function to toggle any dropdown
  function toggleDropdown(name) {
    const { btn, dropdown, icon } = dropdowns[name];
    
    if (!btn || !dropdown || !icon) {
      console.log(`${name} dropdown elements not found`);
      return;
    }

    const isHidden = dropdown.classList.contains('hidden');
    
    // Close all other dropdowns first
    Object.keys(dropdowns).forEach(key => {
      if (key !== name) {
        const { dropdown: otherDropdown, icon: otherIcon } = dropdowns[key];
        if (otherDropdown && otherIcon) {
          otherDropdown.classList.add('hidden');
          otherIcon.classList.remove('rotate-180');
        }
      }
    });

    if (isHidden) {
      // Show this dropdown
      dropdown.classList.remove('hidden');
      icon.classList.add('rotate-180');
      console.log(`${name} dropdown opened`);
    } else {
      // Hide this dropdown
      dropdown.classList.add('hidden');
      icon.classList.remove('rotate-180');
      console.log(`${name} dropdown closed`);
    }
  }

  // Function to close all dropdowns
  function closeAllDropdowns() {
    Object.keys(dropdowns).forEach(name => {
      const { dropdown, icon } = dropdowns[name];
      if (dropdown && icon) {
        dropdown.classList.add('hidden');
        icon.classList.remove('rotate-180');
      }
    });
  }

  // Add click event listeners to each dropdown button
  Object.keys(dropdowns).forEach(name => {
    const { btn } = dropdowns[name];
    if (btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(`${name} button clicked`);
        toggleDropdown(name);
      });
    }
  });

  // Single document click listener to close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    let clickedInsideDropdown = false;
    
    Object.keys(dropdowns).forEach(name => {
      const { btn, dropdown } = dropdowns[name];
      if (btn && dropdown) {
        if (btn.contains(e.target) || dropdown.contains(e.target)) {
          clickedInsideDropdown = true;
        }
      }
    });

    if (!clickedInsideDropdown) {
      closeAllDropdowns();
    }
  });

  // Single escape key listener to close all dropdowns
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  });

  // Search Functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const searchTerm = this.value.trim();
        if (searchTerm) {
          // Add search functionality here
          console.log('Searching for:', searchTerm);
          // You can redirect to search results page or filter products
        }
      }
    });
  }

  // Sticky Header
  let lastScrollTop = 0;
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });

  // Newsletter Subscription
  const newsletterForm = document.querySelector('footer form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      if (email) {
        // Add newsletter subscription logic here
        alert('Thank you for subscribing to our newsletter!');
        this.querySelector('input[type="email"]').value = '';
      }
    });
  }

  // Hero Section Enhancements
  const heroSection = document.querySelector('.hero-section');
  const heroCard = document.querySelector('.hero-card');
  const heroCtaBtn = document.querySelector('.hero-cta-btn');

  if (heroSection && heroCard) {
    // Force remove any transforms and prevent parallax
    heroSection.style.transform = 'translateY(0)';
    heroSection.style.willChange = 'auto';
    
    // Add entrance animation on page load
    setTimeout(() => {
      heroCard.style.opacity = '1';
      heroCard.style.transform = 'translateY(0)';
    }, 300);

    // Initially hide the card for animation
    heroCard.style.opacity = '0';
    heroCard.style.transform = 'translateY(30px)';
    heroCard.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

    // Hero CTA button hover enhancements
    if (heroCtaBtn) {
      heroCtaBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
      });

      heroCtaBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });

      // Ripple effect on click
      heroCtaBtn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    }

    // Responsive adjustments on window resize
    window.addEventListener('resize', () => {
      // Ensure hero section is not transformed on any resize
      if (heroSection) {
        heroSection.style.transform = 'translateY(0)';
      }
    });
  }

  // Intersection Observer for hero animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  if (heroCard) {
    heroObserver.observe(heroCard);
  }
});

// Navigation Menu Toggle for Mobile
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navigationMenu = document.getElementById('navigationMenu');

  if (mobileMenuBtn && navigationMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      navigationMenu.classList.toggle('show');
      mobileMenuBtn.classList.toggle('active');
    });
  }
});

// Simple Mobile Menu Toggle (keeping the existing hamburger menu functionality)
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const closeMobileMenu = document.getElementById('closeMobileMenu');

  function openMobileMenu() {
    if (mobileMenu && mobileMenuOverlay) {
      mobileMenu.classList.remove('-translate-x-full');
      mobileMenuOverlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenuHandler() {
    if (mobileMenu && mobileMenuOverlay) {
      mobileMenu.classList.add('-translate-x-full');
      mobileMenuOverlay.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openMobileMenu();
    });
  }

  if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', closeMobileMenuHandler);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenuHandler);
  }
});

// Cart and Wishlist Functionality
document.addEventListener('DOMContentLoaded', function() {
  
  // Cart functionality
  if (document.querySelector('.cart-page')) {
    initCartPage();
  }
  
  // Wishlist functionality
  if (document.querySelector('.wishlist-page')) {
    initWishlistPage();
  }
  
  // Global cart and wishlist counters
  updateCartCounter();
  updateWishlistCounter();
});

// Initialize Cart Page
function initCartPage() {
  // Quantity controls
  document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const isPlus = this.classList.contains('plus');
      const input = this.parentElement.querySelector('.quantity-input');
      let currentValue = parseInt(input.value);
      
      if (isPlus) {
        if (currentValue < parseInt(input.max)) {
          input.value = currentValue + 1;
        }
      } else {
        if (currentValue > parseInt(input.min)) {
          input.value = currentValue - 1;
        }
      }
      
      updateCartItemTotal(this.closest('.cart-item'));
      updateCartSummary();
    });
  });
  
  // Quantity input change
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', function() {
      if (parseInt(this.value) < parseInt(this.min)) {
        this.value = this.min;
      }
      if (parseInt(this.value) > parseInt(this.max)) {
        this.value = this.max;
      }
      
      updateCartItemTotal(this.closest('.cart-item'));
      updateCartSummary();
    });
  });
  
  // Remove item buttons
  document.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (confirm('Are you sure you want to remove this item from your cart?')) {
        const cartItem = this.closest('.cart-item');
        cartItem.remove();
        updateCartSummary();
        updateCartCounter();
        checkEmptyCart();
      }
    });
  });
  
  // Move to wishlist buttons
  document.querySelectorAll('.move-to-wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      // Here you would typically make an API call to move item to wishlist
      cartItem.remove();
      updateCartSummary();
      updateCartCounter();
      updateWishlistCounter();
      checkEmptyCart();
      
      // Show confirmation
      showNotification('Item moved to wishlist!', 'success');
    });
  });
  
  // Clear cart button
  const clearCartBtn = document.querySelector('.clear-cart-btn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to clear your entire cart?')) {
        document.querySelectorAll('.cart-item').forEach(item => item.remove());
        updateCartSummary();
        updateCartCounter();
        checkEmptyCart();
      }
    });
  }
  
  // Select all checkbox
  const selectAllBtn = document.querySelector('.select-all-btn');
  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', function() {
      const checkboxes = document.querySelectorAll('.item-checkbox');
      const allChecked = Array.from(checkboxes).every(cb => cb.checked);
      
      checkboxes.forEach(cb => {
        cb.checked = !allChecked;
      });
      
      updateCartSummary();
    });
  }
  
  // Individual checkboxes
  document.querySelectorAll('.item-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateCartSummary);
  });
  
  // Checkout button
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      const selectedItems = document.querySelectorAll('.item-checkbox:checked');
      if (selectedItems.length === 0) {
        alert('Please select at least one item to proceed to checkout.');
        return;
      }
      
      // Here you would typically redirect to checkout page
      showNotification('Proceeding to checkout...', 'info');
      setTimeout(() => {
        // window.location.href = 'checkout.html';
        console.log('Redirecting to checkout...');
      }, 1000);
    });
  }
}

// Initialize Wishlist Page
function initWishlistPage() {
  // Remove from wishlist buttons
  document.querySelectorAll('.remove-from-wishlist').forEach(btn => {
    btn.addEventListener('click', function() {
      if (confirm('Are you sure you want to remove this item from your wishlist?')) {
        const wishlistItem = this.closest('.wishlist-item');
        wishlistItem.remove();
        updateWishlistCounter();
        checkEmptyWishlist();
        showNotification('Item removed from wishlist!', 'success');
      }
    });
  });
  
  // Add to cart buttons in wishlist
  document.querySelectorAll('.wishlist-item .add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Here you would typically make an API call to add item to cart
      updateCartCounter();
      showNotification('Item added to cart!', 'success');
    });
  });
  
  // Clear wishlist button
  const clearWishlistBtn = document.querySelector('.clear-wishlist-btn');
  if (clearWishlistBtn) {
    clearWishlistBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to clear your entire wishlist?')) {
        document.querySelectorAll('.wishlist-item').forEach(item => item.remove());
        updateWishlistCounter();
        checkEmptyWishlist();
      }
    });
  }
  
  // Add all to cart button
  const addAllToCartBtn = document.querySelector('.add-all-to-cart-btn');
  if (addAllToCartBtn) {
    addAllToCartBtn.addEventListener('click', function() {
      const wishlistItems = document.querySelectorAll('.wishlist-item');
      if (wishlistItems.length === 0) {
        alert('Your wishlist is empty.');
        return;
      }
      
      if (confirm(`Add all ${wishlistItems.length} items to cart?`)) {
        // Here you would typically make API calls to add all items to cart
        updateCartCounter();
        showNotification(`${wishlistItems.length} items added to cart!`, 'success');
      }
    });
  }
  
  // View toggle buttons
  document.querySelectorAll('.view-toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const view = this.dataset.view;
      const wishlistGrid = document.querySelector('.wishlist-grid');
      
      // Remove active state from all buttons
      document.querySelectorAll('.view-toggle-btn').forEach(b => {
        b.classList.remove('bg-gray-100');
        b.classList.add('bg-white');
      });
      
      // Add active state to clicked button
      this.classList.remove('bg-white');
      this.classList.add('bg-gray-100');
      
      // Apply view
      if (view === 'list') {
        wishlistGrid.classList.remove('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
        wishlistGrid.classList.add('grid-cols-1');
        
        // Change item layout for list view
        document.querySelectorAll('.wishlist-item').forEach(item => {
          item.classList.add('md:flex', 'md:items-center');
          const img = item.querySelector('img');
          if (img) {
            img.classList.add('md:w-32', 'md:h-32');
          }
        });
      } else {
        wishlistGrid.classList.remove('grid-cols-1');
        wishlistGrid.classList.add('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
        
        // Reset item layout for grid view
        document.querySelectorAll('.wishlist-item').forEach(item => {
          item.classList.remove('md:flex', 'md:items-center');
          const img = item.querySelector('img');
          if (img) {
            img.classList.remove('md:w-32', 'md:h-32');
          }
        });
      }
    });
  });
}

// Global add to wishlist functionality
document.querySelectorAll('.add-to-wishlist').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const icon = this.querySelector('i');
    
    if (icon.classList.contains('far')) {
      // Add to wishlist
      icon.classList.remove('far');
      icon.classList.add('fas');
      this.classList.add('text-red-500');
      updateWishlistCounter();
      showNotification('Added to wishlist!', 'success');
    } else {
      // Remove from wishlist
      icon.classList.remove('fas');
      icon.classList.add('far');
      this.classList.remove('text-red-500');
      updateWishlistCounter();
      showNotification('Removed from wishlist!', 'info');
    }
  });
});

// Update cart item total
function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector('.price span:first-child');
  const quantityInput = cartItem.querySelector('.quantity-input');
  
  if (priceElement && quantityInput) {
    const price = parseFloat(priceElement.textContent.replace('$', ''));
    const quantity = parseInt(quantityInput.value);
    // This would typically update a total display for the item
  }
}

// Update cart summary
function updateCartSummary() {
  const selectedItems = document.querySelectorAll('.item-checkbox:checked');
  let subtotal = 0;
  
  selectedItems.forEach(checkbox => {
    const cartItem = checkbox.closest('.cart-item');
    const priceElement = cartItem.querySelector('.price span:first-child');
    const quantityInput = cartItem.querySelector('.quantity-input');
    
    if (priceElement && quantityInput) {
      const price = parseFloat(priceElement.textContent.replace('$', ''));
      const quantity = parseInt(quantityInput.value);
      subtotal += price * quantity;
    }
  });
  
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  
  // Update summary display
  const summaryDetails = document.querySelector('.summary-details');
  if (summaryDetails) {
    const subtotalElement = summaryDetails.querySelector('div:first-child span:last-child');
    const taxElement = summaryDetails.querySelector('div:nth-child(3) span:last-child');
    const totalElement = summaryDetails.querySelector('.border-t span:last-child');
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
  }
  
  // Update item count
  const itemCountElement = document.querySelector('.summary-details div:first-child');
  if (itemCountElement) {
    const countText = itemCountElement.querySelector('span:first-child');
    if (countText) {
      countText.textContent = `Subtotal (${selectedItems.length} items)`;
    }
  }
}

// Update cart counter
function updateCartCounter() {
  const cartItems = document.querySelectorAll('.cart-item');
  const cartCountElements = document.querySelectorAll('#cartCount');
  const count = cartItems.length;
  
  cartCountElements.forEach(element => {
    element.textContent = count;
    if (count > 0) {
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
  });
  
  // Update cart stats
  const cartItemCountElement = document.getElementById('cartItemCount');
  if (cartItemCountElement) {
    cartItemCountElement.textContent = count;
  }
}

// Update wishlist counter
function updateWishlistCounter() {
  const wishlistItems = document.querySelectorAll('.wishlist-item');
  const wishlistCountElements = document.querySelectorAll('#wishlistCount');
  const count = wishlistItems.length;
  
  wishlistCountElements.forEach(element => {
    element.textContent = count;
    if (count > 0) {
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
  });
  
  // Update wishlist stats
  const wishlistItemCountElement = document.getElementById('wishlistItemCount');
  if (wishlistItemCountElement) {
    wishlistItemCountElement.textContent = count;
  }
}

// Check if cart is empty
function checkEmptyCart() {
  const cartItems = document.querySelectorAll('.cart-item');
  const cartItemsList = document.getElementById('cartItemsList');
  
  if (cartItems.length === 0 && cartItemsList) {
    cartItemsList.innerHTML = `
      <div class="empty-cart text-center py-16">
        <div class="mb-6">
          <i class="fas fa-shopping-cart text-6xl text-gray-300"></i>
        </div>
        <h3 class="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h3>
        <p class="text-gray-500 mb-6">Start adding products to see them here</p>
        <a href="shop.html" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
          <i class="fas fa-shopping-bag"></i>
          Continue Shopping
        </a>
      </div>
    `;
  }
}

// Check if wishlist is empty
function checkEmptyWishlist() {
  const wishlistItems = document.querySelectorAll('.wishlist-item');
  const wishlistGrid = document.querySelector('.wishlist-grid');
  const emptyWishlist = document.querySelector('.empty-wishlist');
  
  if (wishlistItems.length === 0) {
    if (wishlistGrid) wishlistGrid.style.display = 'none';
    if (emptyWishlist) emptyWishlist.classList.remove('hidden');
  } else {
    if (wishlistGrid) wishlistGrid.style.display = 'grid';
    if (emptyWishlist) emptyWishlist.classList.add('hidden');
  }
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
    type === 'success' ? 'bg-green-500 text-white' :
    type === 'error' ? 'bg-red-500 text-white' :
    type === 'info' ? 'bg-blue-500 text-white' :
    'bg-gray-500 text-white'
  }`;
  
  notification.innerHTML = `
    <div class="flex items-center gap-2">
      <i class="fas ${
        type === 'success' ? 'fa-check-circle' :
        type === 'error' ? 'fa-exclamation-circle' :
        type === 'info' ? 'fa-info-circle' :
        'fa-bell'
      }"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      if (notification.parentElement) {
        notification.parentElement.removeChild(notification);
      }
    }, 300);
  }, 3000);
}
