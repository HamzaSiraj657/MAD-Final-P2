const db = require('../config/db');


exports.createOrder = (req, res) => {
  const { name, address, phone, total, items } = req.body;
  const date = new Date();
  const order_date = date.toLocaleDateString();
  const order_time = date.toLocaleTimeString();
  const products = JSON.stringify(items);
  const status = 'pending';

  const sql = 'INSERT INTO orders (name, address, phone, total, products, order_date, order_time, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, address, phone, total, products, order_date, order_time, status], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to place order' });
    res.status(201).json({ message: 'Order placed', orderId: result.insertId });
  });
};


exports.updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowed = ['pending', 'shipped', 'delivered', 'cancelled'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const sql = 'UPDATE orders SET status=? WHERE id=?';
  db.query(sql, [status, id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to update status' });
    res.json({ message: 'Status updated' });
  });
};


exports.getOrders = (req, res) => {
  db.query('SELECT * FROM orders ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch orders' });
    res.json(results);
  });
};


exports.deleteOrder = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM orders WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete order' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted' });
  });
};
