function procesarPago() {
  const name = document.getElementById("name").value.trim();
  const card = document.getElementById("card").value.trim();
  const expiry = document.getElementById("expiry").value.trim();
  const amount = parseFloat(document.getElementById("amount").value.trim());

  // Validar campos básicos
  if (!name || card.length !== 16 || isNaN(amount) || amount <= 0) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  // Validar formato MM/YY
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryRegex.test(expiry)) {
    alert("La fecha de vencimiento debe tener el formato MM/YY.");
    return;
  }

  const [expMonth, expYear] = expiry.split("/").map(Number);

  // Obtener mes y año actual
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 0-indexed
  const currentYear = now.getFullYear() % 100; // Últimos 2 dígitos

  // Verificar si la tarjeta está vencida
  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    alert("La tarjeta está vencida.");
    return;
  }

  // Todo está bien, mostrar confirmación
  document.getElementById("confirmation").textContent =
    `¡Pago de $${amount.toFixed(2)} procesado con éxito para ${name}!`;
}
