const FamilyGroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });
  
  const FamilyGroup = mongoose.model('FamilyGroup', FamilyGroupSchema);
  