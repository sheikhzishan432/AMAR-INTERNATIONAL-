document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle functionality
  const mobileMenuToggle = document.createElement("div")
  mobileMenuToggle.className = "mobile-menu-toggle"
  mobileMenuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `

  // Add mobile menu toggle to all pages
  const navbar = document.querySelector(".navbarmain") || document.querySelector(".navbar")
  const navbarMenu = document.querySelector(".navbar ul") || document.querySelector(".navbar")

  // Insert the mobile menu toggle before the navbar
  if (navbar && !document.querySelector(".mobile-menu-toggle")) {
    if (document.querySelector(".navbarmain")) {
      navbar.insertBefore(mobileMenuToggle, navbar.querySelector(".navbar"))
    } else if (document.querySelector(".navbar")) {
      navbar.prepend(mobileMenuToggle)
    }
  }

  // Toggle mobile menu
  if (mobileMenuToggle && navbarMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      if (document.querySelector(".navbarmain .navbar ul")) {
        navbarMenu.classList.toggle("active")
      } else if (document.querySelector(".navbar")) {
        navbarMenu.classList.toggle("responsive")
        const links = document.querySelectorAll(".navbar a:not(.active)")
        links.forEach((link) => {
          link.style.display = link.style.display === "block" ? "none" : "block"
        })
      }

      // Animate hamburger icon
      const spans = mobileMenuToggle.querySelectorAll("span")
      if (navbarMenu.classList.contains("active") || navbarMenu.classList.contains("responsive")) {
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
    if (
      navbarMenu &&
      (navbarMenu.classList.contains("active") || navbarMenu.classList.contains("responsive")) &&
      !e.target.closest(".navbar") &&
      !e.target.closest(".navbarmain") &&
      !e.target.closest(".mobile-menu-toggle")
    ) {
      if (navbarMenu.classList.contains("active")) {
        navbarMenu.classList.remove("active")
      }

      if (navbarMenu.classList.contains("responsive")) {
        navbarMenu.classList.remove("responsive")
        const links = document.querySelectorAll(".navbar a:not(.active)")
        links.forEach((link) => {
          link.style.display = "none"
        })
      }

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
        if (navbarMenu && (navbarMenu.classList.contains("active") || navbarMenu.classList.contains("responsive"))) {
          if (navbarMenu.classList.contains("active")) {
            navbarMenu.classList.remove("active")
          }

          if (navbarMenu.classList.contains("responsive")) {
            navbarMenu.classList.remove("responsive")
            const links = document.querySelectorAll(".navbar a:not(.active)")
            links.forEach((link) => {
              link.style.display = "none"
            })
          }

          // Reset hamburger icon
          const spans = mobileMenuToggle.querySelectorAll("span")
          spans[0].style.transform = "none"
          spans[1].style.opacity = "1"
          spans[2].style.transform = "none"
        }
      }
    })
  })

  // Fix image paths if needed
  document.querySelectorAll("img").forEach((img) => {
    if (img.src.includes("../project/image/") && img.src.indexOf("http") !== 0) {
      // Fix relative paths that might be broken
      const imgSrc = img.src.split("/").pop()
      img.setAttribute("onerror", `this.onerror=null; this.src='./image/${imgSrc}';`)
    }
  })
})
