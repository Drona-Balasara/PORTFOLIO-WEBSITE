// Skills Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Skills filter script loaded');
    
    // Only run on skills page
    if (!window.location.pathname.includes('skills.html')) {
        console.log('Not on skills page, exiting');
        return;
    }
    
    console.log('On skills page, initializing filter...');
    
    const filterTabs = document.querySelectorAll('.filter-tab');
    const skillsCategories = document.querySelectorAll('.skills-category');
    
    console.log('Found filter tabs:', filterTabs.length);
    console.log('Found skills categories:', skillsCategories.length);
    
    if (filterTabs.length === 0) {
        console.error('No filter tabs found! Check HTML structure.');
        return;
    }
    
    if (skillsCategories.length === 0) {
        console.error('No skills categories found! Check HTML structure.');
        return;
    }
    
    // Log the actual elements found
    filterTabs.forEach((tab, index) => {
        console.log(`Tab ${index}:`, tab.textContent.trim(), 'data-filter:', tab.getAttribute('data-filter'));
    });
    
    skillsCategories.forEach((category, index) => {
        console.log(`Category ${index}:`, category.querySelector('.category-title')?.textContent, 'data-category:', category.getAttribute('data-category'));
    });
    
    // Add click listeners
    filterTabs.forEach((tab, index) => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`Clicked tab ${index}:`, this.textContent.trim());
            
            const filter = this.getAttribute('data-filter');
            console.log('Filter value:', filter);
            
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            console.log('Added active class to:', this.textContent.trim());
            
            // Filter categories
            filterCategories(filter);
        });
    });
    
    function filterCategories(filter) {
        console.log('Filtering for:', filter);
        
        skillsCategories.forEach((category, index) => {
            const categoryType = category.getAttribute('data-category');
            console.log(`Processing category ${index}: ${categoryType} (filter: ${filter})`);
            
            if (filter === 'all') {
                console.log('Showing all categories');
                category.style.display = 'block';
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            } else if (categoryType === filter) {
                console.log(`Showing category: ${categoryType}`);
                category.style.display = 'block';
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            } else {
                console.log(`Hiding category: ${categoryType}`);
                category.style.opacity = '0';
                category.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    if (category.style.opacity === '0') {
                        category.style.display = 'none';
                    }
                }, 300);
            }
        });
    }
    
    // Initialize - show all categories
    console.log('Initializing with all categories visible');
    filterCategories('all');
    
    console.log('Skills filter initialization complete');
});