
document.getElementById("formTimestamp").value = new Date().toLocaleString();

const myInfo = new URLSearchParams(window.location.search);

document.querySelector("#results").innerHTML = `
<p>Membership Application of: ${myInfo.get('first')} ${myInfo.get('last')}</p>
<p>Business Organization's Name: ${myInfo.get('buisiness-organization-name')}</p>
<p>Your Email: ${myInfo.get('email')}</p>
<p>Your Phone: ${myInfo.get('phone')}</p>
<p>Membership Level: ${myInfo.get('membership-level')}</p>
<p>Current date timestamp: ${myInfo.get('formTimestamp')}</p>
`