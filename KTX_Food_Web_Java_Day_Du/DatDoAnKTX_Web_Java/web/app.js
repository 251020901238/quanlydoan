// JavaScript chi phu trach giao dien. Logic dat hang nam o Java.
let state = { foods: [], cart: [], count: 0, total: 0 };
let category = 'Tất cả';
const $ = id => document.getElementById(id);
const money = value => Number(value).toLocaleString('vi-VN') + ' ₫';
const pictures = {'M01':'🍗','M02':'🍜','M03':'🥖','M04':'🧋','M05':'🥣'};
const clean = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

async function request(path, values) {
  const options = values ? {method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(values)} : {};
  const response = await fetch(path, options);
  const data = await response.json();
  if (!response.ok || data.ok === false) throw new Error(data.message || 'Có lỗi xảy ra.');
  return data;
}
async function load() {
  try {
    state = await request('/api/state');
    drawFoods(); drawCart();
    $('studentName').textContent = state.student.name;
    $('studentRoom').textContent = state.student.room;
    $('balance').textContent = money(state.student.balance);
    $('mobileCount').textContent = state.count;
  } catch (error) { toast(error.message, true); }
}
function toast(message, error=false) {
  const element = $('toast'); element.textContent = message;
  element.className = 'toast show' + (error ? ' error' : '');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => element.className = 'toast', 3500);
}
function drawFoods() {
  const categories = ['Tất cả', ...new Set(state.foods.map(f => f.category))];
  if (!categories.includes(category)) category = 'Tất cả';
  $('categoryButtons').innerHTML = categories.map(c => `<button type="button" class="chip ${category === c ? 'active' : ''}" data-category="${clean(c)}">${clean(c)}</button>`).join('');
  const query = $('searchInput').value.toLocaleLowerCase('vi-VN').trim();
  const visible = state.foods.filter(f => (category === 'Tất cả' || f.category === category) && f.name.toLocaleLowerCase('vi-VN').includes(query));
  $('menuCount').textContent = `${visible.length} món ăn`;
  $('foodGrid').innerHTML = visible.length ? visible.map(f => `
    <article class="food-card">
      <div class="food-art" aria-hidden="true">${pictures[f.id] || '🍱'}</div>
      <div class="food-detail">
        <span class="food-cat">${clean(f.category)}</span>
        <div class="food-name">${clean(f.name)}</div>
        <p class="food-desc">${f.available ? 'Món ngon tại căn tin' : 'Tạm thời hết hàng'}</p>
        <div class="food-bottom"><span class="food-price">${money(f.price)}</span><button class="add" data-add="${clean(f.id)}" ${f.available ? '' : 'disabled'}>${f.available ? '+ Thêm' : 'Hết hàng'}</button></div>
      </div>
    </article>`).join('') : '<div class="empty">Không tìm thấy món phù hợp. Hãy thử từ khóa khác nhé.</div>';
}
function drawCart() {
  $('cartCount').textContent = state.count;
  $('cartTotal').textContent = money(state.total);
  $('checkoutBtn').disabled = state.count === 0;
  if (!state.cart.length) {
    $('cartItems').innerHTML = '<div class="empty-cart"><span>🛍️</span>Giỏ hàng đang trống.<br>Hãy chọn món bạn thích nhé!</div>';
    return;
  }
  $('cartItems').innerHTML = state.cart.map(item => `<div class="cart-item">
    <div class="cart-art">${pictures[item.id] || '🍱'}</div>
    <div class="cart-details"><strong>${clean(item.name)}</strong><small>${money(item.subtotal)}</small>
    <div class="qty-row"><button title="Giảm" data-change="${clean(item.id)}" data-delta="-1">−</button><span>${item.quantity}</span><button title="Tăng" data-change="${clean(item.id)}" data-delta="1">+</button><button class="remove" data-remove="${clean(item.id)}" title="Xóa món">✕</button></div>
    </div></div>`).join('');
}
async function action(path, values, message) {
  try {
    const result = await request(path, values);
    await load();
    toast(message || result.message);
    return result;
  } catch (error) { toast(error.message, true); return null; }
}
$('searchInput').addEventListener('input', drawFoods);
$('categoryButtons').addEventListener('click', e => {
  if (e.target.dataset.category) { category = e.target.dataset.category; drawFoods(); }
});
$('foodGrid').addEventListener('click', e => {
  const id = e.target.dataset.add;
  if (id) action('/api/cart/add', {foodId:id, quantity:1});
});
$('cartItems').addEventListener('click', e => {
  const remove = e.target.dataset.remove;
  if (remove) { action('/api/cart/remove',{foodId:remove}); return; }
  const id = e.target.dataset.change;
  if (id) {
    const item = state.cart.find(x => x.id === id);
    const next = item.quantity + Number(e.target.dataset.delta);
    if (next < 1) action('/api/cart/remove',{foodId:id});
    else action('/api/cart/update',{foodId:id,quantity:next});
  }
});
$('checkoutBtn').addEventListener('click', async () => {
  const payment = document.querySelector('input[name="payment"]:checked').value;
  const result = await action('/api/order', {payment});
  if (result) {
    const o = result.order;
    $('modalBody').innerHTML = `<div style="font-size:42px">✅</div><h2>Đặt hàng thành công!</h2>
      <p>Mã đơn: <strong>${clean(o.id)}</strong></p>
      <p>Tổng tiền: <strong>${money(o.total)}</strong></p>
      <p>Phương thức: ${clean(o.payment)}</p><div class="order-badge">${clean(o.status)}</div>
      <p>${payment === 'wallet' ? 'Ví sinh viên đã được trừ tiền.' : 'Hãy thực hiện thanh toán theo phương thức đã chọn. Hệ thống chỉ mô phỏng, chưa xác nhận thu tiền thật.'}</p>`;
    $('modal').hidden = false;
    $('cartPanel').classList.remove('open');
  }
});
$('historyBtn').addEventListener('click', async () => {
  try {
    const data = await request('/api/orders');
    $('modalBody').innerHTML = `<h2>Đơn hàng của tôi</h2><p>Đơn đã tạo trong lần chạy chương trình này. File orders.txt vẫn được lưu trên máy.</p>` +
      (data.orders.length ? data.orders.map(o => `<div class="order-record"><strong>${clean(o.id)}</strong><p>${new Date(o.date).toLocaleString('vi-VN')} · ${money(o.total)}</p><p>${clean(o.payment)} · ${clean(o.status)}</p><small>${o.details.map(d => `${clean(d.name)} × ${d.quantity}`).join(', ')}</small></div>`).join('') : '<p>Chưa có đơn hàng nào.</p>');
    $('modal').hidden = false;
  } catch(error) { toast(error.message, true); }
});
$('modalClose').addEventListener('click', () => $('modal').hidden = true);
$('modal').addEventListener('click', e => { if (e.target === $('modal')) $('modal').hidden = true; });
$('mobileCartBtn').addEventListener('click', () => $('cartPanel').classList.add('open'));
$('closeCart').addEventListener('click', () => $('cartPanel').classList.remove('open'));
load();
