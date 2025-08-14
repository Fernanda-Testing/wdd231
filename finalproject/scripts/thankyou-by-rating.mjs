document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    const name = urlParams.get('name') || localStorage.getItem('name') || 'Anonymous';
    const rating = urlParams.get('rating') || localStorage.getItem('rating') || '0';
    const comments = urlParams.get('comments') || localStorage.getItem('ratingComments') || '';
    const timestamp = urlParams.get('timestamp') || localStorage.getItem('formTimestamp') || new Date().toLocaleString();

    document.querySelector("#results").innerHTML = `
        <ul>
            <li>RATING GIVEN BY: ${name}</li>
            <li>SELECTED RATING: ${rating} stars</li>
            ${comments ? `<li>COMMENTS: ${comments}</li>` : ''}
            <li>FORM COMPLETED ON: ${timestamp}</li>
        </ul>
    `;

    localStorage.removeItem('name');
    localStorage.removeItem('rating');
    localStorage.removeItem('ratingComments');
    localStorage.removeItem('formTimestamp');
});