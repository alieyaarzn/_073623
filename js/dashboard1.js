const countrySelect = document.getElementById('countrySelect');
const holidayTable = document.getElementById('holidayTable');

// Fetch senarai negara dan papar dalam dropdown
fetch('https://date.nager.at/api/v3/AvailableCountries')
  .then(res => res.json())
  .then(data => {
    countrySelect.innerHTML = data.map(c => `<option value="${c.countryCode}">${c.name}</option>`).join('');
    loadHolidays(data[0].countryCode); // Papar negara pertama
  });

// Bila user pilih negara, fetch cuti negara tersebut
countrySelect.addEventListener('change', (e) => {
  loadHolidays(e.target.value);
});

// Fungsi fetch cuti umum berdasarkan negara
function loadHolidays(code) {
  holidayTable.innerHTML = `<tr><td colspan="4" class="p-4 text-center text-gray-500">Loading...</td></tr>`;
  const year = new Date().getFullYear();
  fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${code}`)
    .then(res => res.json())
    .then(holidays => {
      holidayTable.innerHTML = holidays.map(h => `
        <tr class="border-b hover:bg-gray-100">
          <td class="py-2 px-4">${h.date}</td>
          <td class="py-2 px-4">${h.localName}</td>
          <td class="py-2 px-4">${h.name}</td>
          <td class="py-2 px-4">${h.types?.join(', ') || 'Public'}</td>
        </tr>
      `).join('');
    });
}
