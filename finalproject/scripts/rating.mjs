const stars = document.querySelectorAll('#starRating .star');
const ratingValue = document.getElementById('ratingValue');
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener('mouseover', () => {
        const val = parseInt(star.getAttribute('data-value'));
        highlightStars(val);
    });

    star.addEventListener('mouseout', () => {
        highlightStars(selectedRating);
    });

    star.addEventListener('click', () => {
        selectedRating = parseInt(star.getAttribute('data-value'));
        ratingValue.textContent = selectedRating;
        highlightStars(selectedRating);

    });
});

function highlightStars(rating) {
    stars.forEach(star => {
        const val = parseInt(star.getAttribute('data-value'));
        if (val <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}