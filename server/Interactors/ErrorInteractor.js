const handleErrorInteractor = (error, res) => {
  switch (error.message) {
    case 'Credential is incorrect. Use your account password':
      res.status(400).json({ message: error.message });
      break;
    case 'Store already exists':
      res.status(400).json({ message: error.message });
      break;
    case 'Invalid store':
      res.status(400).json({ message: error.message });
      break;
    case 'Invalid Password':
      res.status(400).json({ message: error.message });
      break;
    case 'This User does not exist':
      res.status(400).json({ message: error.message });
      break;
    case 'Invalid token':
      res.status(400).json({ message: error.message });
      break;
    case 'Item not found':
      res.status(400).json({ message: error.message });
      break;
    case 'Order not found':
      res.status(400).json({ message: error.message });
      break;
    case 'Payment failed':
      res.status(400).json({ message: error.message });
      break;
    case 'Duplicate payment':
      res.status(400).json({ message: error.message });
      break;
    case 'Error saving new category':
      res.status(400).json({ message: error.message });
      break;
    case 'Error creating new category':
      res.status(400).json({ message: error.message });
      break;
    case 'Failed to create order':
      res.status(400).json({ message: error.message });
      break;
    case 'Invalid account details':
      res.status(400).json({ message: error.message });
      break;
    case 'Something went wrong':
      res.status(400).json({ message: error.message });
      break;
    case 'Unauthorized Access':
      res.sendStatus(403);
      break;
    default:
      return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  handleErrorInteractor,
};
