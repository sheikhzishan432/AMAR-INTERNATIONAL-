document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
    const navbar = document.querySelector(".navbar")
  
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", () => {
        navbar.classList.toggle("responsive")
  
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll("span")
        if (navbar.classList.contains("responsive")) {
          spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
          spans[1].style.opacity = "0"
          spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
        } else {
          spans[0].style.transform = "none"
          spans[1].style.opacity = "1"
          spans[2].style.transform = "none"
        }
      })
    }
  
    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      const navbar = document.querySelector(".navbar")
      const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  
      if (
        navbar &&
        navbar.classList.contains("responsive") &&
        !e.target.closest(".navbar") &&
        !e.target.closest(".mobile-menu-toggle")
      ) {
        navbar.classList.remove("responsive")
  
        // Reset hamburger icon
        const spans = mobileMenuToggle.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
  
          // Close mobile menu if open
          const navbar = document.querySelector(".navbar")
          if (navbar && navbar.classList.contains("responsive")) {
            navbar.classList.remove("responsive")
  
            // Reset hamburger icon
            const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
            const spans = mobileMenuToggle.querySelectorAll("span")
            spans[0].style.transform = "none"
            spans[1].style.opacity = "1"
            spans[2].style.transform = "none"
          }
        }
      })
    })
  
    // Job category filtering
    const categoryButtons = document.querySelectorAll(".category-btn")
    const jobCards = document.querySelectorAll(".job-card")
  
    if (categoryButtons.length > 0 && jobCards.length > 0) {
      categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Remove active class from all buttons
          categoryButtons.forEach((btn) => btn.classList.remove("active"))
  
          // Add active class to clicked button
          button.classList.add("active")
  
          const category = button.getAttribute("data-category")
  
          // Show all jobs if "All Jobs" is selected
          if (category === "all") {
            jobCards.forEach((card) => {
              card.style.display = "block"
            })
          } else {
            // Filter jobs by category
            jobCards.forEach((card) => {
              if (card.getAttribute("data-category") === category) {
                card.style.display = "block"
              } else {
                card.style.display = "none"
              }
            })
          }
        })
      })
    }
  
    // Apply button functionality
    const applyButtons = document.querySelectorAll(".apply-btn")
  
    if (applyButtons.length > 0) {
      applyButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const jobTitle = this.closest(".job-card").querySelector(".job-title").textContent
          alert(`Thank you for your interest in the ${jobTitle} position. Please fill out the application form to apply.`)
        })
      })
    }
  
    // Lazy loading for images
    if ("IntersectionObserver" in window) {
      const imgOptions = {
        threshold: 0,
        rootMargin: "0px 0px 50px 0px",
      }
  
      const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
  
          const img = entry.target
          const src = img.getAttribute("data-src")
  
          if (src) {
            img.src = src
            img.removeAttribute("data-src")
          }
  
          imgObserver.unobserve(img)
        })
      }, imgOptions)
  
      document.querySelectorAll("img[data-src]").forEach((img) => {
        imgObserver.observe(img)
      })
    }
  
    // Responsive navigation for smaller screens
    function checkScreenSize() {
      if (window.innerWidth <= 768) {
        // Add touch-friendly navigation for mobile
        const menuItems = document.querySelectorAll(".navbar ul li a")
        menuItems.forEach((item) => {
          item.addEventListener("touchstart", function () {
            this.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
          })
  
          item.addEventListener("touchend", function () {
            setTimeout(() => {
              this.style.backgroundColor = ""
            }, 300)
          })
        })
      }
    }
  
    // Run on page load
    checkScreenSize()
  
    // Run on window resize
    window.addEventListener("resize", checkScreenSize)
  })
  