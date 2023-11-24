import User from '../models/user.mjs';
import bcrypt from 'bcrypt';

const userController = {
  // Get all users
  getAll: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a specific user by ID
  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new user
  create: async (req, res) => {
    const { name, email, password, avatar } = req.body;
    
    // Hash password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update a user by ID
  edit: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update user fields
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.avatar = req.body.avatar || user.avatar;

      // Save updated user
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a user by ID
  delete: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.remove();
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Tìm user theo email
      const user = await User.findOne({ email });

      // Kiểm tra xem user có tồn tại không
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // So sánh mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return res.json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default userController;
