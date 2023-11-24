import Food from '../models/food.mjs';

const foodController = {
  // Get all foods
  getAll: async (req, res) => {
    try {
      const foods = await Food.find();
      res.json(foods);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new food
  create: async (req, res) => {
    const { name, categoryId, price, image, productionDate, expirationDate, quantity } = req.body;

    const newFood = new Food({
      name,
      categoryId,
      price,
      image,
      productionDate,
      expirationDate,
      quantity,
      // Add other fields if needed
    });

    try {
      const savedFood = await newFood.save();
      res.status(201).json(savedFood);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update a food by ID
  edit: async (req, res) => {
    try {
      const food = await Food.findById(req.params.id);
      if (!food) {
        return res.status(404).json({ message: 'Food not found' });
      }

      // Update food fields
      food.name = req.body.name || food.name;
      food.categoryId = req.body.categoryId || food.categoryId;
      food.price = req.body.price || food.price;
      food.image = req.body.image || food.image;
      food.productionDate = req.body.productionDate || food.productionDate;
      food.expirationDate = req.body.expirationDate || food.expirationDate;
      food.quantity = req.body.quantity || food.quantity;

      // Save updated food
      const updatedFood = await food.save();
      res.json(updatedFood);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a food by ID
  delete: async (req, res) => {
    try {
      const food = await Food.findById(req.params.id);
      if (!food) {
        return res.status(404).json({ message: 'Food not found' });
      }

      await food.remove();
      res.json({ message: 'Food deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default foodController;
