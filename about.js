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
  })
  