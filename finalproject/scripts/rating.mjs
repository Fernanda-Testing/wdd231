const stars = document.querySelectorAll('#starRating .star');
const ratingValue = document.getElementById('ratingValue');
const ratingForm = document.getElementById('ratingForm');
const hiddenRatingValue = document.getElementById('hiddenRatingValue');
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
        hiddenRatingValue.value = selectedRating;
        highlightStars(selectedRating);
    });
});

ratingForm.addEventListener('submit', (e) => {
    const fecha = new Date().toLocaleString();
    localStorage.setItem('rating', selectedRating);
    localStorage.setItem('name', document.getElementById('ratingName').value);
    localStorage.setItem('ratingComments', document.getElementById('area-rating-desc').value);
    localStorage.setItem('formTimestamp', fecha);
});

function highlightStars(rating) {
    stars.forEach(star => {
        const val = parseInt(star.getAttribute('data-value'));
        star.style.color = val <= rating ? '#ffc107' : '#e4e5e9';
    });
}