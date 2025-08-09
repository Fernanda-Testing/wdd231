document.addEventListener("DOMContentLoaded", () => {
    const myInfo = new URLSearchParams(window.location.search);

    document.querySelector("#results").innerHTML = `
    <p><strong>Membership Application of:</strong> ${myInfo.get('first')} ${myInfo.get('last')}</p>
    <p><strong>Business Organization's Name:</strong> ${myInfo.get('business-organization-name')}</p>
    <p><strong>Your Email:</strong> ${myInfo.get('email')}</p>
    <p><strong>Your Phone:</strong> ${myInfo.get('phone')}</p>
    <p><strong>Form completed on:</strong> ${myInfo.get('formTimestamp')}</p>
  `;
});