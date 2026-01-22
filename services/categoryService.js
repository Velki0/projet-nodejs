const { Category } = require('../sequelize/models/associations');

const categoryService = {

    getAllCategories: async () => {

        return await Category.findAll();
    
    },

    getCategoryById: async (id) => {

        return await Category.findByPk(id);

    },

    getCategoryByName: async (name) => {

        return await Category.findOne({ where: { name: name }});

    },

    createCategory: async (newCategory) => {

        return await Category.create(newCategory);

    },

    updateCategory: async (id, updatedCategory) => {

        const oldCategory = await Category.findByPk(id);
        if (oldCategory) {
            return await oldCategory.update(updatedCategory);
        } else {
            return null;
        }

    },

    deleteCategory: async (id) => {

        const category = await Category.findByPk(id);
        if (category) {
            await category.destroy()
            return category;
        } else {
            return null;
        }

    }

};

module.exports = categoryService;
