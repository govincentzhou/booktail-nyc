/**
 * Booktail Cafe & Bookstore - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Mobile Navigation Menu Toggle
  // ==========================================
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links-menu');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Toggle menu icon between bars and X
      const icon = mobileToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
      } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  }

  // Close mobile menu when a link is clicked
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  });


  // ==========================================
  // 2. Testimonial Carousel (Home Page)
  // ==========================================
  const track = document.getElementById('carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const nextButton = document.getElementById('carousel-next');
  const prevButton = document.getElementById('carousel-prev');
  const indicatorsContainer = document.getElementById('carousel-indicators');

  if (track && slides.length > 0) {
    let currentSlideIndex = 0;
    let autoPlayTimer;

    const indicators = Array.from(document.querySelectorAll('.carousel-indicator'));

    const updateCarousel = (index) => {
      // Move track
      track.style.transform = `translateX(-${index * 100}%)`;
      
      // Update indicators
      indicators.forEach((indicator, i) => {
        if (i === index) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
      currentSlideIndex = index;
    };

    const moveToNextSlide = () => {
      let nextIndex = currentSlideIndex + 1;
      if (nextIndex >= slides.length) {
        nextIndex = 0;
      }
      updateCarousel(nextIndex);
    };

    const moveToPrevSlide = () => {
      let prevIndex = currentSlideIndex - 1;
      if (prevIndex < 0) {
        prevIndex = slides.length - 1;
      }
      updateCarousel(prevIndex);
    };

    // Event Listeners
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        moveToNextSlide();
        resetAutoPlay();
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        moveToPrevSlide();
        resetAutoPlay();
      });
    }

    // Indicator Dot Clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        updateCarousel(index);
        resetAutoPlay();
      });
    });

    // Auto Play Function
    const startAutoPlay = () => {
      autoPlayTimer = setInterval(moveToNextSlide, 6000); // Shift slide every 6s
    };

    const resetAutoPlay = () => {
      clearInterval(autoPlayTimer);
      startAutoPlay();
    };

    // Initialize Auto-play
    startAutoPlay();
  }


  // ==========================================
  // 3. Modal Box Controls (General)
  // ==========================================
  const modalOverlay = document.getElementById('success-modal-overlay');
  const modalCloseBtn = document.getElementById('success-modal-close-btn');

  const showModal = (heading, message, iconHtml = '<i class="fa-solid fa-circle-check"></i>') => {
    if (modalOverlay) {
      const headingEl = document.getElementById('success-modal-heading');
      const msgEl = document.getElementById('success-modal-message');
      const iconEl = document.getElementById('success-modal-icon');

      if (headingEl) headingEl.textContent = heading;
      if (msgEl) msgEl.textContent = message;
      if (iconEl && iconHtml) iconEl.innerHTML = iconHtml;

      modalOverlay.classList.add('active');
    }
  };

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
    
    // Close modal on clicking outside the white box
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }


  // ==========================================
  // 4. Cafe Menu & Pre-Ordering Cart (Reserve Page)
  // ==========================================
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
  const menuPanels = document.querySelectorAll('.menu-panel');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartCountBadge = document.getElementById('cart-count');
  const cartTotalPrice = document.getElementById('cart-total-price');
  const checkoutBtn = document.getElementById('btn-checkout-cart');

  // Menu Tab Switcher
  if (menuTabBtns.length > 0 && menuPanels.length > 0) {
    menuTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Deactivate all buttons & panels
        menuTabBtns.forEach(b => b.classList.remove('active'));
        menuPanels.forEach(p => p.classList.remove('active'));

        // Activate selected tab & panel
        btn.classList.add('active');
        const targetPanelId = `panel-${btn.dataset.tab}`;
        const targetPanel = document.getElementById(targetPanelId);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });
  }

  // ==========================================
  // Unified Cart & Session Helper Functions
  // ==========================================
  const getCart = () => {
    return JSON.parse(localStorage.getItem('booktail_cart')) || [];
  };

  const saveCart = (cartArray) => {
    localStorage.setItem('booktail_cart', JSON.stringify(cartArray));
  };

  const updateNavCartBadge = () => {
    const badges = document.querySelectorAll('#nav-cart-badge');
    const currentCart = getCart();
    const totalCount = currentCart.reduce((acc, item) => acc + item.qty, 0);

    badges.forEach(badge => {
      if (totalCount > 0) {
        badge.textContent = totalCount;
        badge.style.display = 'inline-block';
      } else {
        badge.style.display = 'none';
      }
    });
  };

  const updateAuthNav = () => {
    const loginProfileLinks = document.querySelectorAll('#link-login-profile');
    const loggedInUser = localStorage.getItem('booktail_user');

    loginProfileLinks.forEach(link => {
      if (loggedInUser) {
        link.href = 'profile.html';
        link.setAttribute('aria-label', 'Profile');
        link.setAttribute('title', 'Profile');
      } else {
        link.href = 'login.html';
        link.setAttribute('aria-label', 'Login');
        link.setAttribute('title', 'Login');
      }
      link.innerHTML = '<i class="fa-solid fa-user"></i>';
    });
  };

  const addToCart = (id, name, price, qty = 1, type = 'food', details = {}) => {
    let currentCart = getCart();
    const existing = currentCart.find(item => item.id === id);

    if (existing) {
      if (type === 'food') {
        existing.qty += qty;
      } else {
        // Book or reservation is unique, don't increment qty or show duplicates
        return;
      }
    } else {
      currentCart.push({ id, name, price: parseFloat(price), qty, type, details });
    }

    saveCart(currentCart);
    updateNavCartBadge();
    updateCartUI(); // Updates sidebar on reserve.html if present
  };

  const removeFromCart = (id) => {
    let currentCart = getCart();
    const item = currentCart.find(i => i.id === id);
    if (!item) return;

    if (item.type === 'food' && item.qty > 1) {
      item.qty -= 1;
    } else {
      currentCart = currentCart.filter(i => i.id !== id);
    }

    saveCart(currentCart);
    updateNavCartBadge();
    updateCartUI();
    if (document.getElementById('checkout-cart-items-list')) {
      updateCheckoutPageUI();
    }
  };

  // Pre-order Cart System Sidebar Rendering (Reserve Page)
  const updateCartUI = () => {
    if (!cartItemsList) return;

    cartItemsList.innerHTML = '';
    let total = 0;
    const currentCart = getCart();

    if (currentCart.length === 0) {
      cartItemsList.innerHTML = '<li class="cart-empty-msg">Your pre-order cart is empty.</li>';
      if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
      currentCart.forEach(item => {
        const itemTotal = item.type === 'food' ? (item.price * item.qty) : 0;
        total += itemTotal;

        const li = document.createElement('li');
        li.className = 'cart-item';
        
        let typeBadge = '';
        if (item.type === 'book') {
          typeBadge = '<span class="item-badge book" style="font-size: 0.6rem; padding: 0.1rem 0.3rem; margin-top: 0.2rem; display: inline-block;">Book</span>';
        } else if (item.type === 'reservation') {
          typeBadge = '<span class="item-badge booking" style="font-size: 0.6rem; padding: 0.1rem 0.3rem; margin-top: 0.2rem; display: inline-block;">Reserve</span>';
        } else {
          typeBadge = `<span style="font-size: 0.75rem; color: var(--color-text-light);">Qty: ${item.qty}</span>`;
        }

        li.innerHTML = `
          <div class="cart-item-info">
            <span class="cart-item-name">${item.name}</span>
            <div>${typeBadge}</div>
          </div>
          <span class="cart-item-price">${item.type === 'food' ? `$${itemTotal.toFixed(2)}` : 'Included'}</span>
          <button class="cart-remove-btn" data-id="${item.id}" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
        `;
        cartItemsList.appendChild(li);
      });

      if (checkoutBtn) checkoutBtn.disabled = false;
    }

    if (cartCountBadge) {
      cartCountBadge.textContent = currentCart.reduce((sum, i) => sum + i.qty, 0);
    }
    if (cartTotalPrice) {
      cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    }

    // Add removal listeners
    const removeButtons = cartItemsList.querySelectorAll('.cart-remove-btn');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.dataset.id);
      });
    });
  };

  // Wire up Menu Add-to-cart buttons
  const menuAddBtns = document.querySelectorAll('.add-to-cart-btn');
  menuAddBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      addToCart(id, name, price, 1, 'food');
      
      // Visual feedback: briefly change button text
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
      btn.style.backgroundColor = 'var(--color-secondary)';
      btn.style.color = 'var(--color-white)';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }, 1000);
    });
  });

  // Checkout pre-order cart redirects to checkout
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const currentCart = getCart();
      if (currentCart.length === 0) return;
      window.location.href = 'cart.html';
    });
  }

  // Initialize cart display
  if (cartItemsList) {
    updateCartUI();
  }


  // ==========================================
  // 5. Book Bookstore Inventory System (Reserve Page)
  // ==========================================
  const booksGrid = document.getElementById('books-grid-container');
  const bookSearchInput = document.getElementById('book-search-input');
  const bookGenreFilter = document.getElementById('book-genre-filter');
  const bookStatusFilter = document.getElementById('book-status-filter');
  const loadMoreContainer = document.getElementById('load-more-container');
  const btnLoadMore = document.getElementById('btn-load-more');
  let booksShowLimit = 8;
  let showAllBooks = false;

  // Hardcoded default book inventory data (36 titles total, 6 per genre, interleaved)
  const defaultBooks = [
    // Cycle 1
    { id: 'b1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'classic', status: 'available', shelf: 'A-2', cssClass: 'classic' },
    { id: 'b7', title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'fantasy', status: 'available', shelf: 'F-4', cssClass: 'fantasy' },
    { id: 'b13', title: 'Dune', author: 'Frank Herbert', genre: 'scifi', status: 'available', shelf: 'S-1', cssClass: 'scifi' },
    { id: 'b19', title: 'Murder on the Orient Express', author: 'Agatha Christie', genre: 'drama', status: 'rented', shelf: 'T-1', cssClass: 'thriller' },
    { id: 'b25', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', genre: 'nonfiction', status: 'available', shelf: 'N-3', cssClass: 'nonfiction' },
    { id: 'b31', title: 'Demon Slayer: Kimetsu no Yaiba Vol. 1', author: 'Koyoharu Gotouge', genre: 'manga', status: 'available', shelf: 'M-1', cssClass: 'manga' },

    // Cycle 2
    { id: 'b2', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'classic', status: 'available', shelf: 'A-5', cssClass: 'classic' },
    { id: 'b8', title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'fantasy', status: 'rented', shelf: 'F-2', cssClass: 'fantasy' },
    { id: 'b14', title: 'Neuromancer', author: 'William Gibson', genre: 'scifi', status: 'rented', shelf: 'S-3', cssClass: 'scifi' },
    { id: 'b20', title: 'Gone Girl', author: 'Gillian Flynn', genre: 'drama', status: 'available', shelf: 'T-3', cssClass: 'thriller' },
    { id: 'b26', title: 'Educated', author: 'Tara Westover', genre: 'nonfiction', status: 'available', shelf: 'N-1', cssClass: 'nonfiction' },
    { id: 'b32', title: 'Attack on Titan Vol. 1', author: 'Hajime Isayama', genre: 'manga', status: 'rented', shelf: 'M-4', cssClass: 'manga' },

    // Cycle 3
    { id: 'b3', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'classic', status: 'available', shelf: 'A-1', cssClass: 'classic' },
    { id: 'b9', title: 'A Game of Thrones', author: 'George R.R. Martin', genre: 'fantasy', status: 'available', shelf: 'F-1', cssClass: 'fantasy' },
    { id: 'b15', title: 'Foundation', author: 'Isaac Asimov', genre: 'scifi', status: 'available', shelf: 'S-2', cssClass: 'scifi' },
    { id: 'b21', title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', genre: 'drama', status: 'available', shelf: 'T-2', cssClass: 'thriller' },
    { id: 'b27', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', genre: 'nonfiction', status: 'available', shelf: 'N-2', cssClass: 'nonfiction' },
    { id: 'b33', title: 'My Hero Academia Vol. 1', author: 'Kohei Horikoshi', genre: 'manga', status: 'available', shelf: 'M-2', cssClass: 'manga' },

    // Cycle 4
    { id: 'b4', title: '1984', author: 'George Orwell', genre: 'classic', status: 'rented', shelf: 'A-4', cssClass: 'classic' },
    { id: 'b10', title: 'The Way of Kings', author: 'Brandon Sanderson', genre: 'fantasy', status: 'available', shelf: 'F-5', cssClass: 'fantasy' },
    { id: 'b16', title: 'Hyperion', author: 'Dan Simmons', genre: 'scifi', status: 'available', shelf: 'S-5', cssClass: 'scifi' },
    { id: 'b22', title: 'The Silent Patient', author: 'Alex Michaelides', genre: 'drama', status: 'available', shelf: 'T-5', cssClass: 'thriller' },
    { id: 'b28', title: 'The Immortal Life of Henrietta Lacks', author: 'Rebecca Skloot', genre: 'nonfiction', status: 'rented', shelf: 'N-5', cssClass: 'nonfiction' },
    { id: 'b34', title: 'Jujutsu Kaisen Vol. 1', author: 'Gege Akutami', genre: 'manga', status: 'available', shelf: 'M-5', cssClass: 'manga' },

    // Cycle 5
    { id: 'b5', title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'classic', status: 'available', shelf: 'A-3', cssClass: 'classic' },
    { id: 'b11', title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', genre: 'fantasy', status: 'available', shelf: 'F-3', cssClass: 'fantasy' },
    { id: 'b17', title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', genre: 'scifi', status: 'available', shelf: 'S-4', cssClass: 'scifi' },
    { id: 'b23', title: 'Shutter Island', author: 'Dennis Lehane', genre: 'drama', status: 'rented', shelf: 'T-4', cssClass: 'thriller' },
    { id: 'b29', title: 'Born a Crime', author: 'Trevor Noah', genre: 'nonfiction', status: 'available', shelf: 'N-4', cssClass: 'nonfiction' },
    { id: 'b35', title: 'Death Note Vol. 1', author: 'Tsugumi Ohba', genre: 'manga', status: 'available', shelf: 'M-3', cssClass: 'manga' },

    // Cycle 6
    { id: 'b6', title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', genre: 'classic', status: 'available', shelf: 'A-6', cssClass: 'classic' },
    { id: 'b12', title: 'The Ocean at the End of the Lane', author: 'Neil Gaiman', genre: 'fantasy', status: 'available', shelf: 'F-6', cssClass: 'fantasy' },
    { id: 'b18', title: 'Snow Crash', author: 'Neal Stephenson', genre: 'scifi', status: 'available', shelf: 'S-6', cssClass: 'scifi' },
    { id: 'b24', title: 'Big Little Lies', author: 'Liane Moriarty', genre: 'drama', status: 'available', shelf: 'T-6', cssClass: 'thriller' },
    { id: 'b30', title: 'Quiet: The Power of Introverts', author: 'Susan Cain', genre: 'nonfiction', status: 'available', shelf: 'N-6', cssClass: 'nonfiction' },
    { id: 'b36', title: 'Fullmetal Alchemist Vol. 1', author: 'Hiromu Arakawa', genre: 'manga', status: 'rented', shelf: 'M-6', cssClass: 'manga' }
  ];

  const getBooks = () => {
    const stored = localStorage.getItem('booktail_books');
    if (!stored) {
      localStorage.setItem('booktail_books', JSON.stringify(defaultBooks));
      return defaultBooks;
    }
    return JSON.parse(stored);
  };

  let books = getBooks();

  const getGenreLabel = (genre) => {
    switch (genre) {
      case 'classic': return 'Classic';
      case 'fantasy': return 'Fantasy';
      case 'scifi': return 'Sci-Fi';
      case 'drama': return 'Drama / Thriller';
      case 'nonfiction': return 'Nonfiction';
      case 'manga': return 'Manga';
      default: return genre;
    }
  };

  const renderBooks = (filteredBooks) => {
    if (!booksGrid) return;
    
    booksGrid.innerHTML = '';
    
    if (filteredBooks.length === 0) {
      booksGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--color-text-light); font-style: italic;">
          No books found matching your search criteria. Try another keyword or filter.
        </div>
      `;
      return;
    }

    const currentCart = getCart();

    filteredBooks.forEach(book => {
      const card = document.createElement('div');
      card.className = `book-card ${book.cssClass}`;
      
      const isBookInCart = currentCart.some(item => item.id === book.id && item.type === 'book');
      
      let statusLabel = '';
      let statusClass = '';
      let actionButton = '';

      if (book.status === 'rented') {
        statusLabel = 'Rented Out';
        statusClass = 'rented';
        actionButton = `<button class="btn btn-secondary btn-sm" disabled style="cursor: not-allowed; opacity: 0.6;">Rented Out</button>`;
      } else if (isBookInCart) {
        statusLabel = 'In Cart';
        statusClass = 'available';
        actionButton = `<a href="cart.html" class="btn btn-gold btn-sm"><i class="fa-solid fa-cart-shopping"></i> In Cart</a>`;
      } else {
        statusLabel = 'Available';
        statusClass = 'available';
        actionButton = `<button class="btn btn-primary btn-sm reserve-book-btn" data-id="${book.id}">Reserve Rental</button>`;
      }

      card.innerHTML = `
        <div>
          <div class="book-genre">${getGenreLabel(book.genre)}</div>
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">by ${book.author}</p>
          <div class="book-details">
            <div class="book-detail-row">
              <span class="book-detail-label" style="font-weight: 500; color: var(--color-text-light);">Shelf Location:</span>
              <span class="book-detail-val" style="font-weight: 600; color: var(--color-primary);">${book.shelf}</span>
            </div>
            <div class="book-detail-row" style="margin-top: 0.4rem;">
              <span class="book-detail-label" style="font-weight: 500; color: var(--color-text-light);">Status:</span>
              <span class="book-status ${statusClass}"><i class="fa-solid ${book.status === 'available' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i> ${statusLabel}</span>
            </div>
          </div>
        </div>
        ${actionButton}
      `;
      booksGrid.appendChild(card);
    });

    // Wire up book reserve buttons
    const reserveBtns = booksGrid.querySelectorAll('.reserve-book-btn');
    reserveBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const bookId = btn.dataset.id;
        reserveBook(bookId);
      });
    });
  };

  const reserveBook = (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (!book || book.status !== 'available') return;

    // Add to cart
    addToCart(book.id, book.title, 0, 1, 'book', { author: book.author, shelf: book.shelf });
    
    // Redirect to checkout
    window.location.href = 'cart.html';
  };

  const filterBooks = () => {
    if (!booksGrid) return;
    
    const query = bookSearchInput.value.toLowerCase().trim();
    const genre = bookGenreFilter.value;
    const status = bookStatusFilter ? bookStatusFilter.value : 'all';

    const filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(query) || 
                            book.author.toLowerCase().includes(query);
      const matchesGenre = genre === 'all' || book.genre === genre;
      const matchesStatus = status === 'all' || book.status === status;
      
      return matchesSearch && matchesGenre && matchesStatus;
    });

    let booksToRender = filtered;
    
    if (filtered.length > booksShowLimit && !showAllBooks) {
      booksToRender = filtered.slice(0, booksShowLimit);
      if (loadMoreContainer) loadMoreContainer.style.display = 'block';
    } else {
      if (loadMoreContainer) loadMoreContainer.style.display = 'none';
    }

    renderBooks(booksToRender);
  };

  const resetShowAll = () => {
    showAllBooks = false;
  };

  // Wire up search and filter inputs
  if (bookSearchInput) {
    bookSearchInput.addEventListener('input', () => {
      resetShowAll();
      filterBooks();
    });
  }
  if (bookGenreFilter) {
    bookGenreFilter.addEventListener('change', () => {
      resetShowAll();
      filterBooks();
    });
  }
  if (bookStatusFilter) {
    bookStatusFilter.addEventListener('change', () => {
      resetShowAll();
      filterBooks();
    });
  }

  if (btnLoadMore) {
    btnLoadMore.addEventListener('click', () => {
      showAllBooks = true;
      filterBooks();
    });
  }

  // Initialize books grid
  if (booksGrid) {
    filterBooks();
  }


  // ==========================================
  // 6. Reservation Form Submission (Reserve Page)
  // ==========================================
  const reservationForm = document.getElementById('reservation-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('reserve-name').value;
      const date = document.getElementById('reserve-date').value;
      const timeSelect = document.getElementById('reserve-time');
      const timeLabel = timeSelect.options[timeSelect.selectedIndex].text;
      const guests = document.getElementById('reserve-guests').value;
      const catLounge = document.getElementById('reserve-cats').checked;

      const guestsNum = parseInt(guests) || 1;
      const resId = 'res-' + Date.now();
      
      const resItemDetails = {
        name: name,
        email: document.getElementById('reserve-email').value,
        date: date,
        time: timeLabel,
        guests: guestsNum,
        catLounge: catLounge,
        notes: document.getElementById('reserve-notes').value || ''
      };

      addToCart(resId, 'Table Reservation', 0, 1, 'reservation', resItemDetails);

      // Redirect to cart
      window.location.href = 'cart.html';
    });
  }


  // ==========================================
  // 7. Contact Inquiry Form Submission (Contact Page)
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value;
      const reasonSelect = document.getElementById('contact-reason');
      const reasonLabel = reasonSelect.options[reasonSelect.selectedIndex].text;

      showModal(
        'Inquiry Submitted!',
        `Thank you for reaching out, ${name}. We've received your request regarding: "${reasonLabel}". Our team will review your message and reply within 1-2 business days.`,
        '<i class="fa-solid fa-paper-plane"></i>'
      );

      contactForm.reset();
    });
  }


  // ==========================================
  // 8. LocalStorage-Persisted Review Board (Contact Page)
  // ==========================================
  const reviewForm = document.getElementById('review-form');
  const reviewStars = document.querySelectorAll('#star-rating-selector .star-rating-btn');
  const ratingInput = document.getElementById('review-rating');
  const reviewsFeed = document.getElementById('reviews-feed');
  const avgRatingValue = document.getElementById('avg-rating-value');
  const avgStarsContainer = document.getElementById('avg-stars-container');
  const totalReviewsCount = document.getElementById('total-reviews-count');

  // Hardcoded default starting reviews
  const defaultReviews = [
    { name: 'Sarah K.', rating: 5, comment: 'Booktail is absolute magic. Walking across that tiny wooden bridge and seeing the cats sleeping on the shelves immediately washed away all my work stress. The matcha latte was incredible too!', date: '2026-06-12' },
    { name: 'Marcus L.', rating: 5, comment: 'The perfect combo. I sat in a cozy nook for 3 hours reading fantasy and had Barnaby fall asleep on my lap. Truly the best afternoon in NYC. Recommending this to everyone.', date: '2026-06-08' },
    { name: 'Yuki T.', rating: 5, comment: 'I love that they have manga and sci-fi books alongside the classics. The environment is so peaceful and clean, which is amazing considering there are resident cats. Highly recommended!', date: '2026-05-29' }
  ];

  // Star Rating Selector Interaction
  if (reviewStars.length > 0 && ratingInput) {
    reviewStars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.value);
        ratingInput.value = rating;

        // Visual highlight
        reviewStars.forEach(s => {
          const val = parseInt(s.dataset.value);
          if (val <= rating) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      });
    });

    // Trigger initial state
    const currentVal = parseInt(ratingInput.value);
    reviewStars.forEach(s => {
      if (parseInt(s.dataset.value) <= currentVal) {
        s.classList.add('active');
      }
    });
  }

  // Reviews Engine Functions
  const getReviews = () => {
    const stored = localStorage.getItem('booktail_reviews');
    if (!stored) {
      localStorage.setItem('booktail_reviews', JSON.stringify(defaultReviews));
      return defaultReviews;
    }
    return JSON.parse(stored);
  };

  const calculateAndRenderStats = (reviewsList) => {
    if (reviewsList.length === 0) {
      if (avgRatingValue) avgRatingValue.textContent = '0.0';
      if (totalReviewsCount) totalReviewsCount.textContent = 'Based on 0 reviews';
      if (avgStarsContainer) avgStarsContainer.innerHTML = '';
      return;
    }

    const sum = reviewsList.reduce((acc, r) => acc + r.rating, 0);
    const avg = sum / reviewsList.length;
    
    if (avgRatingValue) avgRatingValue.textContent = avg.toFixed(1);
    if (totalReviewsCount) totalReviewsCount.textContent = `Based on ${reviewsList.length} review${reviewsList.length === 1 ? '' : 's'}`;

    if (avgStarsContainer) {
      avgStarsContainer.innerHTML = '';
      const roundedAvg = Math.round(avg);
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        star.className = i <= roundedAvg ? 'fa-solid fa-star' : 'fa-regular fa-star';
        avgStarsContainer.appendChild(star);
      }
    }
  };

  const renderReviews = () => {
    if (!reviewsFeed) return;

    const reviewsList = getReviews();
    
    // Sort reviews: newest first
    const sorted = [...reviewsList].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    reviewsFeed.innerHTML = '';

    sorted.forEach(review => {
      const reviewDiv = document.createElement('div');
      reviewDiv.className = 'review-item';

      let starsHtml = '';
      for (let i = 1; i <= 5; i++) {
        starsHtml += `<i class="${i <= review.rating ? 'fa-solid' : 'fa-regular'} fa-star"></i>`;
      }

      // Format Date nicely
      const reviewDate = new Date(review.date);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = reviewDate.toLocaleDateString('en-US', options);

      reviewDiv.innerHTML = `
        <div class="review-header">
          <span class="review-author">${escapeHTML(review.name)}</span>
          <span class="review-date">${formattedDate}</span>
        </div>
        <div class="review-stars">${starsHtml}</div>
        <p class="review-comment">"${escapeHTML(review.comment)}"</p>
      `;

      reviewsFeed.appendChild(reviewDiv);
    });

    calculateAndRenderStats(reviewsList);
  };

  // HTML escaping helper to prevent XSS in reviews
  const escapeHTML = (str) => {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  };

  // Submit Review Form
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('review-author-name').value;
      const comment = document.getElementById('review-comment-text').value;
      const rating = parseInt(ratingInput.value);
      const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

      const reviewsList = getReviews();
      reviewsList.push({ name, rating, comment, date });
      localStorage.setItem('booktail_reviews', JSON.stringify(reviewsList));

      // Re-render reviews
      renderReviews();

      // Show confirmation
      showModal(
        'Review Submitted!',
        `Thank you for sharing your feedback, ${name}! Your review has been added to our board.`,
        '<i class="fa-solid fa-heart"></i>'
      );

      // Reset Form
      reviewForm.reset();
      ratingInput.value = '5';
      reviewStars.forEach(s => s.classList.add('active')); // Reset active stars visual to 5
    });
  }

  // Initialize reviews grid
  if (reviewsFeed) {
    renderReviews();
  }


  // ==========================================
  // 9. Login & Registration Engine (Login Page)
  // ==========================================
  const getUsers = () => {
    const stored = localStorage.getItem('booktail_users');
    if (!stored) {
      const defaultUsers = [
        { name: 'Vincent Zhou', email: 'vince@booktail.com', password: 'password123', badge: 'VIP Feline Lover' }
      ];
      localStorage.setItem('booktail_users', JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    return JSON.parse(stored);
  };

  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const authErrorMsg = document.getElementById('auth-error-message');
  const tabBtnLogin = document.getElementById('tab-btn-login');
  const tabBtnSignup = document.getElementById('tab-btn-signup');
  const loginPanel = document.getElementById('login-panel');
  const signupPanel = document.getElementById('signup-panel');

  const showAuthError = (message) => {
    if (authErrorMsg) {
      authErrorMsg.textContent = message;
      authErrorMsg.style.display = 'block';
    }
  };

  // Switch between Login and Signup panels
  if (tabBtnLogin && tabBtnSignup && loginPanel && signupPanel) {
    tabBtnLogin.addEventListener('click', () => {
      tabBtnLogin.style.borderBottomColor = 'var(--accent-gold)';
      tabBtnLogin.style.color = 'var(--color-text)';
      tabBtnSignup.style.borderBottomColor = 'transparent';
      tabBtnSignup.style.color = 'var(--color-text-light)';
      loginPanel.style.display = 'block';
      signupPanel.style.display = 'none';
      if (authErrorMsg) authErrorMsg.style.display = 'none';
    });

    tabBtnSignup.addEventListener('click', () => {
      tabBtnSignup.style.borderBottomColor = 'var(--accent-gold)';
      tabBtnSignup.style.color = 'var(--color-text)';
      tabBtnLogin.style.borderBottomColor = 'transparent';
      tabBtnLogin.style.color = 'var(--color-text-light)';
      loginPanel.style.display = 'none';
      signupPanel.style.display = 'block';
      if (authErrorMsg) authErrorMsg.style.display = 'none';
    });
  }

  // Login Form Submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (authErrorMsg) authErrorMsg.style.display = 'none';

      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const password = document.getElementById('login-password').value;

      const usersList = getUsers();
      const user = usersList.find(u => u.email === email);

      if (user && user.password === password) {
        localStorage.setItem('booktail_user', JSON.stringify({
          name: user.name,
          email: user.email,
          badge: user.badge
        }));

        const urlParams = new URLSearchParams(window.location.search);
        const redirectPage = urlParams.get('redirect');
        if (redirectPage) {
          window.location.href = redirectPage;
        } else {
          window.location.href = 'profile.html';
        }
      } else {
        showAuthError('Invalid email address or password. Please try again.');
      }
    });
  }

  // Signup Form Submission
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (authErrorMsg) authErrorMsg.style.display = 'none';

      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim().toLowerCase();
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;

      if (password !== confirmPassword) {
        showAuthError('Passwords do not match. Please verify your password entry.');
        return;
      }

      const usersList = getUsers();
      const emailExists = usersList.some(u => u.email === email);

      if (emailExists) {
        showAuthError('Email address is already registered. Please log in instead.');
        return;
      }

      const newUser = {
        name,
        email,
        password,
        badge: 'New Member'
      };

      usersList.push(newUser);
      localStorage.setItem('booktail_users', JSON.stringify(usersList));

      localStorage.setItem('booktail_user', JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        badge: newUser.badge
      }));

      const urlParams = new URLSearchParams(window.location.search);
      const redirectPage = urlParams.get('redirect');
      if (redirectPage) {
        window.location.href = redirectPage;
      } else {
        window.location.href = 'profile.html';
      }
    });
  }


  // ==========================================
  // 10. Profile Dashboard Controls (Profile Page)
  // ==========================================
  const profileUserName = document.getElementById('profile-user-name');
  const profileUserEmail = document.getElementById('profile-user-email');
  const profileUserBadge = document.getElementById('profile-user-badge');
  const profileOrdersList = document.getElementById('profile-orders-list');
  const profileEmptyState = document.getElementById('profile-orders-empty-state');
  const btnLogout = document.getElementById('btn-logout');

  // Verify page authentication
  const checkProfileAuth = () => {
    const profileMain = document.getElementById('profile-main');
    if (!profileMain) return;

    const loggedInUser = localStorage.getItem('booktail_user');
    if (!loggedInUser) {
      window.location.href = 'login.html';
    }
  };

  // Render User Info and Order History
  const renderProfileDetails = () => {
    const loggedInUserStr = localStorage.getItem('booktail_user');
    if (!loggedInUserStr) return;

    const user = JSON.parse(loggedInUserStr);

    if (profileUserName) profileUserName.textContent = user.name;
    if (profileUserEmail) profileUserEmail.textContent = user.email;
    if (profileUserBadge) profileUserBadge.textContent = user.badge;

    // Load Order history
    const userOrdersKey = `booktail_orders_${user.email}`;
    const orders = JSON.parse(localStorage.getItem(userOrdersKey)) || [];

    if (!profileOrdersList) return;
    profileOrdersList.innerHTML = '';

    if (orders.length === 0) {
      if (profileEmptyState) profileEmptyState.style.display = 'block';
    } else {
      if (profileEmptyState) profileEmptyState.style.display = 'none';

      orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-history-item';
        
        let itemsHtml = '';
        order.items.forEach(item => {
          let desc = '';
          if (item.type === 'food') {
            desc = 'Cafe Pre-Order';
          } else if (item.type === 'book') {
            desc = `Book Rental | Author: ${item.details.author} | Shelf Location: ${item.details.shelf}`;
          } else if (item.type === 'reservation') {
            desc = `Table Reservation | Date: ${item.details.date} | Time Slot: ${item.details.time} | Guests: ${item.details.guests} | Lounge Access: ${item.details.catLounge ? 'Yes' : 'No'}`;
            if (item.details.notes) {
              desc += ` | Special Requests: ${item.details.notes}`;
            }
          }
          const priceText = item.type === 'food' ? `$${(item.price * item.qty).toFixed(2)}` : 'Included';
          
          itemsHtml += `
            <tr>
              <td>
                <div style="font-weight: 600; color: var(--color-primary);">${item.name}</div>
                <div style="font-size: 0.75rem; color: var(--color-text-light); margin-top: 0.2rem;">${desc}</div>
              </td>
              <td class="cell-qty">${item.qty}</td>
              <td class="cell-total">${priceText}</td>
            </tr>
          `;
        });

        orderCard.innerHTML = `
          <div class="order-item-header">
            <div class="order-item-summary">
              <div class="order-id-row">
                <span class="order-id">${order.id}</span>
                <span class="status-badge confirmed">Confirmed</span>
              </div>
              <div class="order-date">Placed on ${order.date}</div>
              <div class="order-meta-total">Total: <span>$${order.total.toFixed(2)}</span></div>
            </div>
            <div class="order-toggle-icon">
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div class="order-item-details">
            <table class="order-details-table">
              <thead>
                <tr>
                  <th>Item Details</th>
                  <th class="cell-header-qty">Qty</th>
                  <th class="cell-header-total">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr>
                  <td colspan="2" style="text-align: right; font-weight: 500; border-top: 1px solid rgba(255, 255, 255, 0.1);">Subtotal:</td>
                  <td class="cell-total" style="border-top: 1px solid rgba(255, 255, 255, 0.1);">$${order.subtotal.toFixed(2)}</td>
                </tr>
                ${order.donation > 0 ? `
                <tr>
                  <td colspan="2" style="text-align: right; font-weight: 500;">Cat Lounge Access:</td>
                  <td class="cell-total">$${order.donation.toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td colspan="2" style="text-align: right; font-weight: 500;">Tax (8.875%):</td>
                  <td class="cell-total">$${order.tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="text-align: right; font-weight: bold; color: var(--accent-gold);">Total Paid:</td>
                  <td class="cell-total" style="font-weight: bold; font-size: 1rem;">$${order.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <div style="margin-top: 1.5rem; font-size: 0.75rem; color: var(--color-text-light); font-style: italic; display: flex; justify-content: space-between; align-items: center;">
              <span>Payment Method: Card ending in ${order.cardEnding}</span>
              <span>Status: Paid & Confirmed</span>
            </div>
          </div>
        `;
        profileOrdersList.appendChild(orderCard);
      });

      // Expandable accordion order details
      const headers = profileOrdersList.querySelectorAll('.order-item-header');
      headers.forEach(header => {
        header.addEventListener('click', () => {
          const item = header.closest('.order-history-item');
          item.classList.toggle('expanded');
        });
      });
    }
  };

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('booktail_user');
      window.location.href = 'index.html';
    });
  }

  // Setup Bookstore reset helper
  const profileDetailsCard = document.getElementById('profile-details-card');
  if (profileDetailsCard) {
    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn btn-secondary btn-sm';
    resetBtn.id = 'btn-reset-books';
    resetBtn.style.width = '100%';
    resetBtn.style.marginTop = '1rem';
    resetBtn.style.borderColor = 'var(--color-primary)';
    resetBtn.style.color = 'var(--color-primary)';
    resetBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Reset Book Inventory';
    
    profileDetailsCard.insertBefore(resetBtn, btnLogout);

    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('booktail_books');
      showModal(
        'Inventory Reset!',
        'Bookstore catalogue status has been reset successfully. All books are now marked as Available.',
        '<i class="fa-solid fa-rotate-left"></i>'
      );
      const closeBtn = document.getElementById('success-modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          window.location.reload();
        }, { once: true });
      }
    });
  }

  // Initialize profile
  checkProfileAuth();
  renderProfileDetails();


  // ==========================================
  // 11. Shopping Cart & Checkout Page (Cart Page)
  // ==========================================
  const checkoutCartEmptyState = document.getElementById('checkout-cart-empty-state');
  const checkoutCartItemsList = document.getElementById('checkout-cart-items-list');
  const checkoutSubtotal = document.getElementById('checkout-subtotal');
  const checkoutDonationFees = document.getElementById('checkout-donation-fees');
  const checkoutTax = document.getElementById('checkout-tax');
  const checkoutTotal = document.getElementById('checkout-total');
  const checkoutPaymentForm = document.getElementById('checkout-payment-form');
  const checkoutLoginWarning = document.getElementById('checkout-login-warning');
  const btnSubmitPayment = document.getElementById('btn-submit-payment');

  const updateCheckoutPageUI = () => {
    if (!checkoutCartItemsList) return;

    checkoutCartItemsList.innerHTML = '';
    const currentCart = getCart();

    if (currentCart.length === 0) {
      if (checkoutCartEmptyState) checkoutCartEmptyState.style.display = 'block';
      if (btnSubmitPayment) btnSubmitPayment.disabled = true;
      if (checkoutSubtotal) checkoutSubtotal.textContent = '$0.00';
      if (checkoutDonationFees) checkoutDonationFees.textContent = '$0.00';
      if (checkoutTax) checkoutTax.textContent = '$0.00';
      if (checkoutTotal) checkoutTotal.textContent = '$0.00';
      return;
    }

    if (checkoutCartEmptyState) checkoutCartEmptyState.style.display = 'none';
    if (btnSubmitPayment) btnSubmitPayment.disabled = false;

    let subtotal = 0;
    let donation = 0;

    currentCart.forEach(item => {
      const itemSubtotal = item.type === 'food' ? (item.price * item.qty) : 0;
      subtotal += itemSubtotal;

      if (item.type === 'reservation' && item.details.catLounge) {
        donation += 5.00 * item.details.guests;
      }

      const card = document.createElement('li');
      card.className = 'checkout-item-card';

      let badgeClass = 'food';
      let badgeText = 'Food';
      if (item.type === 'book') {
        badgeClass = 'book';
        badgeText = 'Book';
      } else if (item.type === 'reservation') {
        badgeClass = 'booking';
        badgeText = 'Reservation';
      }

      let metadata = '';
      if (item.type === 'food') {
        metadata = 'Cafe Menu Pre-Order';
      } else if (item.type === 'book') {
        metadata = `by ${item.details.author} | Shelf Location: ${item.details.shelf}`;
      } else if (item.type === 'reservation') {
        metadata = `Date: ${item.details.date} | Time: ${item.details.time} | Guests: ${item.details.guests} | Lounge Access: ${item.details.catLounge ? 'Yes' : 'No'}`;
        if (item.details.notes) {
          metadata += `<br>Special Requests: ${item.details.notes}`;
        }
      }

      let actionSection = '';
      if (item.type === 'food') {
        actionSection = `
          <div class="qty-adjuster">
            <button class="qty-adjuster-btn qty-minus" data-id="${item.id}">-</button>
            <span class="qty-adjuster-val">${item.qty}</span>
            <button class="qty-adjuster-btn qty-plus" data-id="${item.id}">+</button>
          </div>
        `;
      }

      const priceText = item.type === 'food' ? `$${itemSubtotal.toFixed(2)}` : 'Included';

      card.innerHTML = `
        <div class="checkout-item-info">
          <div class="checkout-item-title-row">
            <span class="checkout-item-title">${item.name}</span>
            <span class="item-badge ${badgeClass}">${badgeText}</span>
          </div>
          <p class="checkout-item-meta">${metadata}</p>
        </div>
        <div class="checkout-item-actions">
          ${actionSection}
          <span class="checkout-item-price">${priceText}</span>
          <button class="checkout-item-remove" data-id="${item.id}" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      `;

      checkoutCartItemsList.appendChild(card);
    });

    // Wire up adjuster click listeners
    const plusButtons = checkoutCartItemsList.querySelectorAll('.qty-plus');
    const minusButtons = checkoutCartItemsList.querySelectorAll('.qty-minus');
    const removeButtons = checkoutCartItemsList.querySelectorAll('.checkout-item-remove');

    plusButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        addToCart(id, '', 0, 1, 'food');
        updateCheckoutPageUI();
      });
    });

    minusButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        removeFromCart(id);
        updateCheckoutPageUI();
      });
    });

    removeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        let currentCart = getCart();
        currentCart = currentCart.filter(i => i.id !== id);
        saveCart(currentCart);
        updateNavCartBadge();
        updateCheckoutPageUI();
      });
    });

    const tax = subtotal * 0.08875;
    const total = subtotal + donation + tax;

    if (checkoutSubtotal) checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (checkoutDonationFees) checkoutDonationFees.textContent = `$${donation.toFixed(2)}`;
    if (checkoutTax) checkoutTax.textContent = `$${tax.toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.textContent = `$${total.toFixed(2)}`;
  };

  const updateCheckoutLoginWarning = () => {
    if (!checkoutLoginWarning) return;
    const loggedInUser = localStorage.getItem('booktail_user');
    if (loggedInUser) {
      checkoutLoginWarning.style.display = 'none';
    } else {
      checkoutLoginWarning.style.display = 'flex';
    }
  };

  const cardNumberInput = document.getElementById('card-number');
  const cardExpiryInput = document.getElementById('card-expiry');
  const cardCvvInput = document.getElementById('card-cvv');

  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      let formatted = '';
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formatted += ' ';
        }
        formatted += value[i];
      }
      e.target.value = formatted;
    });
  }

  if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      let formatted = '';
      if (value.length > 0) {
        formatted += value.substring(0, 2);
        if (value.length > 2) {
          formatted += '/' + value.substring(2, 4);
        }
      }
      e.target.value = formatted;
    });
  }

  if (cardCvvInput) {
    cardCvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }

  if (checkoutPaymentForm) {
    checkoutPaymentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const loggedInUserStr = localStorage.getItem('booktail_user');
      if (!loggedInUserStr) {
        showModal(
          'Authentication Required!',
          'Please sign in or create an account to process your secure payment and record your reservations.',
          '<i class="fa-solid fa-user-lock"></i>'
        );
        const closeBtn = document.getElementById('success-modal-close-btn');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            window.location.href = 'login.html?redirect=cart.html';
          }, { once: true });
        }
        return;
      }

      if (cardNumberInput.value.replace(/\s/g, '').length < 16) {
        alert('Invalid credit card number. Please enter a valid 16-digit card.');
        return;
      }
      if (cardExpiryInput.value.length < 5) {
        alert('Invalid expiry date. Use MM/YY format.');
        return;
      }
      if (cardCvvInput.value.length < 3) {
        alert('Invalid CVV. Enter the 3 or 4-digit code.');
        return;
      }

      const user = JSON.parse(loggedInUserStr);
      const cartItems = getCart();

      const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      const orderDate = new Date().toISOString().split('T')[0];
      const subTotalVal = parseFloat(checkoutSubtotal.textContent.replace('$', ''));
      const donationVal = parseFloat(checkoutDonationFees.textContent.replace('$', ''));
      const taxVal = parseFloat(checkoutTax.textContent.replace('$', ''));
      const totalVal = parseFloat(checkoutTotal.textContent.replace('$', ''));
      
      const newOrder = {
        id: orderId,
        date: orderDate,
        items: cartItems,
        subtotal: subTotalVal,
        donation: donationVal,
        tax: taxVal,
        total: totalVal,
        cardEnding: cardNumberInput.value.slice(-4)
      };

      const userOrdersKey = `booktail_orders_${user.email}`;
      const userOrders = JSON.parse(localStorage.getItem(userOrdersKey)) || [];
      userOrders.unshift(newOrder);
      localStorage.setItem(userOrdersKey, JSON.stringify(userOrders));

      let localBooks = getBooks();
      cartItems.forEach(item => {
        if (item.type === 'book') {
          const matchingBook = localBooks.find(b => b.id === item.id);
          if (matchingBook) {
            matchingBook.status = 'rented';
          }
        }
      });
      localStorage.setItem('booktail_books', JSON.stringify(localBooks));

      saveCart([]);
      updateNavCartBadge();

      showModal(
        'Checkout Complete!',
        `Thank you, ${user.name}! Your payment of $${totalVal.toFixed(2)} was successful. Your order (${orderId}) has been successfully created and saved to your dashboard order history.`,
        '<i class="fa-solid fa-circle-check"></i>'
      );

      const closeBtn = document.getElementById('success-modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          window.location.href = 'profile.html';
        }, { once: true });
      }
    });
  }

  if (checkoutCartItemsList) {
    updateCheckoutPageUI();
    updateCheckoutLoginWarning();
  }


  // ==========================================
  // 12. General Page Startup Initialization
  // ==========================================
  updateNavCartBadge();
  updateAuthNav();

});
