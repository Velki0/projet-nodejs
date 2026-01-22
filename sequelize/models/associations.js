const Course = require('./courseModel');
const Category = require('./categoryModel');

Category.hasMany(Course, {
  as: "courses", 
  foreignKey: 'category_id' 
});

Course.belongsTo(Category, {
  as: "category", 
  foreignKey: 'category_id'
});

module.exports = { Category, Course };