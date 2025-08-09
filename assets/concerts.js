/**
 * Parse a date string in DD/MM/YYYY format and return a Date object
 * @param {string} dateString - Date in DD/MM/YYYY format
 * @returns {Date} Parsed date object
 */
function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day); // Month is 0-indexed
}

/**
 * Create a concert link element with appropriate styling
 * @param {Object} concert - Concert data object
 * @param {number} index - Index of the concert in the list
 * @param {Date} today - Current date for comparison
 * @returns {HTMLElement} Concert link element
 */
function createConcertLink(concert, index, today) {
    const concertLink = document.createElement('a');
    concertLink.href = concert.url;
    concertLink.target = '_blank';
    concertLink.className = 'concert-link';
    concertLink.textContent = `${concert.venue} - ${concert.location} - ${concert.date}`;
    
    // Check if concert date has passed
    const concertDate = parseDate(concert.date);
    if (concertDate < today) {
        concertLink.classList.add('past-concert');
    }
    
    // Mark the most recent concert for scrolling
    if (index === 0) {
        concertLink.id = 'most-recent-concert';
    }
    
    return concertLink;
}

/**
 * Load and display concerts from the JSON file
 */
async function loadConcerts() {
    try {
        const response = await fetch('assets/concerts.json');
        const concerts = await response.json();
        const today = new Date();
        
        // Create container for all concerts
        const concertContainer = document.createElement('div');
        concertContainer.className = 'concert-container';
        
        // Create concert links (limit to 14 concerts)
        concerts.slice(0, 14).forEach((concert, index) => {
            const concertLink = createConcertLink(concert, index, today);
            concertContainer.appendChild(concertLink);
        });
        
        document.body.appendChild(concertContainer);
        
        // Scroll to most recent concert and fade in
        setTimeout(() => {
            const mostRecentConcert = document.getElementById('most-recent-concert');
            if (mostRecentConcert) {
                mostRecentConcert.scrollIntoView({
                    behavior: 'auto',
                    block: 'center'
                });
            }
            document.body.style.opacity = '1';
        }, 50);
        
    } catch (error) {
        console.error('Error loading concerts:', error);
        document.body.innerHTML = '<div class="error">Unable to load concert data</div>';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadConcerts);
