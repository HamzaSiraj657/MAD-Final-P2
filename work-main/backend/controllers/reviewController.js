const db = require('../config/db');


const postApiGet = (req, res) => {
  db.query('SELECT * FROM reviews', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
    res.json(results);
  });
};



const getReviewsByProduct = (req, res) => {
  const { productId } = req.params;
  db.query('SELECT * FROM reviews WHERE product_id = ?', [productId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch reviews' });
    res.json(results);
  });
};


const addReview = (req, res) => {
  const { comment, email } = req.body;
  const { productId } = req.params; 

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!comment) {
    return res.status(400).json({ error: 'Comment is required' });
  }

  db.query(
    'INSERT INTO reviews (product_id, user_email, comment) VALUES (?, ?, ?)',
    [productId, email, comment],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to add review' });
      res.status(201).json({ message: 'Review added' });
    }
  );
};


const updateReview = (req, res) => {
  const { id } = req.params;
  const { comment, email } = req.body;

  if (!email || !comment) {
    return res.status(400).json({ error: 'Email and comment are required' });
  }

  db.query(
    'UPDATE reviews SET comment = ? WHERE id = ? AND user_email = ?',
    [comment, id, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to update review' });
      if (result.affectedRows === 0) {
        return res.status(403).json({ error: 'Unauthorized or review not found' });
      }
      res.json({ message: 'Review updated successfully' });
    }
  );
};


const deleteReview = (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;

  if (!role) {
    return res.status(400).json({ error: 'Role is required for deletion' });
  }

  if (role === 'admin') {
    
    db.query(
      'DELETE FROM reviews WHERE id = ?',
      [id],
      (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to delete review' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Review not found' });
        res.json({ message: 'Review deleted by admin' });
      }
    );
  } else {
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required for deletion' });
    }
    db.query(
      'DELETE FROM reviews WHERE id = ? AND user_email = ?',
      [id, email],
      (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to delete review' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'No matching review found for this user' });
        res.json({ message: 'Review deleted' });
      }
    );
  }
};


module.exports = { getReviewsByProduct, addReview, updateReview, deleteReview , postApiGet};
