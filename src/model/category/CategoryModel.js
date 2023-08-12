import CategorySchema from "./CategorySchema.js";

// creating new category
export const createCategory = (catObj) => {
  return CategorySchema(catObj).save();
};

// deleting category
// the benefit of using mongoose is the it porvides us with the function to create CRUD operation
export const deleteCategory = (_id) => {
  return CategorySchema.findByIdAndDelete(_id);
};

// get All the Category
export const getCategories = () => {
  return CategorySchema.find(0);
};
