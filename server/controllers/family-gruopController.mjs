import FamilyGroup from '../models/familyGroup.mjs';

const familyGroupController = {
  // Get all family groups
  getAll: async (req, res) => {
    try {
      const familyGroups = await FamilyGroup.find();
      res.json(familyGroups);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new family group
  create: async (req, res) => {
    const { name, members, groupAdmin } = req.body;

    const newFamilyGroup = new FamilyGroup({
      name,
      members,
      groupAdmin,
      // Add other fields if needed
    });

    try {
      const savedFamilyGroup = await newFamilyGroup.save();
      res.status(201).json(savedFamilyGroup);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update a family group by ID
  edit: async (req, res) => {
    try {
      const familyGroup = await FamilyGroup.findById(req.params.id);
      if (!familyGroup) {
        return res.status(404).json({ message: 'Family group not found' });
      }

      // Update family group fields
      familyGroup.name = req.body.name || familyGroup.name;
      familyGroup.members = req.body.members || familyGroup.members;
      familyGroup.groupAdmin = req.body.groupAdmin || familyGroup.groupAdmin;

      // Save updated family group
      const updatedFamilyGroup = await familyGroup.save();
      res.json(updatedFamilyGroup);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a family group by ID
  delete: async (req, res) => {
    try {
      const familyGroup = await FamilyGroup.findById(req.params.id);
      if (!familyGroup) {
        return res.status(404).json({ message: 'Family group not found' });
      }

      await familyGroup.remove();
      res.json({ message: 'Family group deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default familyGroupController;
