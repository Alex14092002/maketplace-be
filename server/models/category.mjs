const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
  });
  
  const Category = mongoose.model('Category', CategorySchema);
  