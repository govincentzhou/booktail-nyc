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

  // Pre-order Cart System
  let cart = [];

  const updateCartUI = () => {
    if (!cartItemsList) return;

    cartItemsList.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
      cartItemsList.innerHTML = '<li class="cart-empty-msg">Your pre-order cart is empty.</li>';
      if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
      cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        itemCount += item.qty;

        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
          <div class="cart-item-info">
            <span class="cart-item-name">${item.name}</span>
            <div class="cart-item-qty">Qty: ${item.qty}</div>
          </div>
          <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
          <button class="cart-remove-btn" data-id="${item.id}" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
        `;
        cartItemsList.appendChild(li);
      });

      if (checkoutBtn) checkoutBtn.disabled = false;
    }

    if (cartCountBadge) cartCountBadge.textContent = itemCount;
    if (cartTotalPrice) cartTotalPrice.textContent = `$${total.toFixed(2)}`;

    // Add removal listeners
    const removeButtons = cartItemsList.querySelectorAll('.cart-remove-btn');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.dataset.id);
      });
    });
  };

  const addToCart = (id, name, price) => {
    const parsedPrice = parseFloat(price);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ id, name, price: parsedPrice, qty: 1 });
    }
    updateCartUI();
  };

  const removeFromCart = (id) => {
    const existingItem = cart.find(item => item.id === id);
    if (!existingItem) return;

    if (existingItem.qty > 1) {
      existingItem.qty -= 1;
    } else {
      cart = cart.filter(item => item.id !== id);
    }
    updateCartUI();
  };

  // Wire up Menu Add-to-cart buttons
  const menuAddBtns = document.querySelectorAll('.add-to-cart-btn');
  menuAddBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      addToCart(id, name, price);
      
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

  // Checkout pre-order cart
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;

      const itemsStr = cart.map(item => `${item.name} (x${item.qty})`).join(', ');
      const totalText = cartTotalPrice ? cartTotalPrice.textContent : '';
      
      showModal(
        'Pre-Order Placed!',
        `Your pre-order for [${itemsStr}] totaling ${totalText} has been registered. We will serve it fresh when you check in for your reservation!`,
        '<i class="fa-solid fa-cookie-bite"></i>'
      );
      
      // Clear Cart
      cart = [];
      updateCartUI();
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

  // Hardcoded default book inventory data (36 titles total, 6 per genre)
  const originalBooks = [
    // Classics (classic)
    { id: 'b1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'classic', status: 'available', shelf: 'A-2', cssClass: 'classic' },
    { id: 'b2', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'classic', status: 'available', shelf: 'A-5', cssClass: 'classic' },
    { id: 'b3', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'classic', status: 'available', shelf: 'A-1', cssClass: 'classic' },
    { id: 'b4', title: '1984', author: 'George Orwell', genre: 'classic', status: 'rented', shelf: 'A-4', cssClass: 'classic' },
    { id: 'b5', title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'classic', status: 'available', shelf: 'A-3', cssClass: 'classic' },
    { id: 'b6', title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', genre: 'classic', status: 'available', shelf: 'A-6', cssClass: 'classic' },

    // Fantasy (fantasy)
    { id: 'b7', title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'fantasy', status: 'available', shelf: 'F-4', cssClass: 'fantasy' },
    { id: 'b8', title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'fantasy', status: 'rented', shelf: 'F-2', cssClass: 'fantasy' },
    { id: 'b9', title: 'A Game of Thrones', author: 'George R.R. Martin', genre: 'fantasy', status: 'available', shelf: 'F-1', cssClass: 'fantasy' },
    { id: 'b10', title: 'The Way of Kings', author: 'Brandon Sanderson', genre: 'fantasy', status: 'available', shelf: 'F-5', cssClass: 'fantasy' },
    { id: 'b11', title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', genre: 'fantasy', status: 'available', shelf: 'F-3', cssClass: 'fantasy' },
    { id: 'b12', title: 'The Ocean at the End of the Lane', author: 'Neil Gaiman', genre: 'fantasy', status: 'available', shelf: 'F-6', cssClass: 'fantasy' },

    // Sci-Fi (scifi)
    { id: 'b13', title: 'Dune', author: 'Frank Herbert', genre: 'scifi', status: 'available', shelf: 'S-1', cssClass: 'scifi' },
    { id: 'b14', title: 'Neuromancer', author: 'William Gibson', genre: 'scifi', status: 'rented', shelf: 'S-3', cssClass: 'scifi' },
    { id: 'b15', title: 'Foundation', author: 'Isaac Asimov', genre: 'scifi', status: 'available', shelf: 'S-2', cssClass: 'scifi' },
    { id: 'b16', title: 'Hyperion', author: 'Dan Simmons', genre: 'scifi', status: 'available', shelf: 'S-5', cssClass: 'scifi' },
    { id: 'b17', title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', genre: 'scifi', status: 'available', shelf: 'S-4', cssClass: 'scifi' },
    { id: 'b18', title: 'Snow Crash', author: 'Neal Stephenson', genre: 'scifi', status: 'available', shelf: 'S-6', cssClass: 'scifi' },

    // Dramas & Thrillers (drama)
    { id: 'b19', title: 'Murder on the Orient Express', author: 'Agatha Christie', genre: 'drama', status: 'rented', shelf: 'T-1', cssClass: 'thriller' },
    { id: 'b20', title: 'Gone Girl', author: 'Gillian Flynn', genre: 'drama', status: 'available', shelf: 'T-3', cssClass: 'thriller' },
    { id: 'b21', title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', genre: 'drama', status: 'available', shelf: 'T-2', cssClass: 'thriller' },
    { id: 'b22', title: 'The Silent Patient', author: 'Alex Michaelides', genre: 'drama', status: 'available', shelf: 'T-5', cssClass: 'thriller' },
    { id: 'b23', title: 'Shutter Island', author: 'Dennis Lehane', genre: 'drama', status: 'rented', shelf: 'T-4', cssClass: 'thriller' },
    { id: 'b24', title: 'Big Little Lies', author: 'Liane Moriarty', genre: 'drama', status: 'available', shelf: 'T-6', cssClass: 'thriller' },

    // Nonfiction (nonfiction)
    { id: 'b25', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', genre: 'nonfiction', status: 'available', shelf: 'N-3', cssClass: 'nonfiction' },
    { id: 'b26', title: 'Educated', author: 'Tara Westover', genre: 'nonfiction', status: 'available', shelf: 'N-1', cssClass: 'nonfiction' },
    { id: 'b27', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', genre: 'nonfiction', status: 'available', shelf: 'N-2', cssClass: 'nonfiction' },
    { id: 'b28', title: 'The Immortal Life of Henrietta Lacks', author: 'Rebecca Skloot', genre: 'nonfiction', status: 'rented', shelf: 'N-5', cssClass: 'nonfiction' },
    { id: 'b29', title: 'Born a Crime', author: 'Trevor Noah', genre: 'nonfiction', status: 'available', shelf: 'N-4', cssClass: 'nonfiction' },
    { id: 'b30', title: 'Quiet: The Power of Introverts', author: 'Susan Cain', genre: 'nonfiction', status: 'available', shelf: 'N-6', cssClass: 'nonfiction' },

    // Manga (manga)
    { id: 'b31', title: 'Demon Slayer: Kimetsu no Yaiba Vol. 1', author: 'Koyoharu Gotouge', genre: 'manga', status: 'available', shelf: 'M-1', cssClass: 'manga' },
    { id: 'b32', title: 'Attack on Titan Vol. 1', author: 'Hajime Isayama', genre: 'manga', status: 'rented', shelf: 'M-4', cssClass: 'manga' },
    { id: 'b33', title: 'My Hero Academia Vol. 1', author: 'Kohei Horikoshi', genre: 'manga', status: 'available', shelf: 'M-2', cssClass: 'manga' },
    { id: 'b34', title: 'Jujutsu Kaisen Vol. 1', author: 'Gege Akutami', genre: 'manga', status: 'available', shelf: 'M-5', cssClass: 'manga' },
    { id: 'b35', title: 'Death Note Vol. 1', author: 'Tsugumi Ohba', genre: 'manga', status: 'available', shelf: 'M-3', cssClass: 'manga' },
    { id: 'b36', title: 'Fullmetal Alchemist Vol. 1', author: 'Hiromu Arakawa', genre: 'manga', status: 'rented', shelf: 'M-6', cssClass: 'manga' }
  ];

  // Make a working copy that we can modify status on
  let books = [...originalBooks];

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

    filteredBooks.forEach(book => {
      const card = document.createElement('div');
      card.className = `book-card ${book.cssClass}`;
      
      const statusLabel = book.status === 'available' ? 'Available' : 'Rented Out';
      const statusClass = book.status === 'available' ? 'available' : 'rented';
      const actionButton = book.status === 'available' 
        ? `<button class="btn btn-primary btn-sm reserve-book-btn" data-id="${book.id}">Reserve Rental</button>`
        : `<button class="btn btn-secondary btn-sm" disabled style="cursor: not-allowed; opacity: 0.6;">Rented Out</button>`;

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

    // Simulate reservation
    book.status = 'rented';
    
    // Refresh display
    filterBooks();
    
    showModal(
      'Book Reserved!',
      `"${book.title}" has been reserved for your pickup. Settle at the check-out counter when you arrive. We will hold it for 48 hours.`,
      '<i class="fa-solid fa-book-bookmark"></i>'
    );
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

    // Check if we are doing a default search (All genres, empty search, All status)
    const isDefaultFilter = query === '' && genre === 'all' && status === 'all';
    
    let booksToRender = filtered;
    
    if (isDefaultFilter && !showAllBooks) {
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

      const loungeMsg = catLounge 
        ? "including priority access to cuddle and play in the Feline Lounge" 
        : "standard bookstore seating";

      showModal(
        'Reservation Successful!',
        `Thank you, ${name}! Your table for ${guests} guest(s) on ${date} during the ${timeLabel} slot (${loungeMsg}) has been reserved. Check in at the counter on arrival.`,
        '<i class="fa-solid fa-calendar-check"></i>'
      );

      reservationForm.reset();
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

});
