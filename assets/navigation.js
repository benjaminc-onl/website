/**
 * Creates and inserts the navigation links at the bottom of the page
 */
function createNavigation() {
    // Create the navigation container
    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';
    
    // Define navigation items
    const navItems = [
        { href: '/index.html', text: 'About' },
        { href: '/portfolio.html', text: 'Portfolio' },
        { href: '/contact.html', text: 'Contact' },
        { href: '/concerts.html', text: 'Concerts' }
    ];
    
    // Create navigation links
    navItems.forEach((item, index) => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.text;
        if (item.target) {
            link.target = item.target;
        }
        
        navLinks.appendChild(link);
        
        // Add separator (except for last item)
        if (index < navItems.length) {
            navLinks.appendChild(document.createTextNode(' // '));
        }
    });
    
    // Insert navigation into the page
    document.body.appendChild(navLinks);
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', createNavigation);
