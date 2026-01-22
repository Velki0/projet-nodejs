const categoryService = require('../services/categoryService');

const categoryController = {

    getAllCategories: async (req, res) => {

        try {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(await categoryService.getAllCategories());
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    getCategoryById: async (req, res) => {

        try {
            res.setHeader('Content-Type', 'application/json');
            const id = req.params.id;
            const category = await categoryService.getCategoryById(id);
            category ? res.status(200).json(category) : res.status(404).send("Aucune correspondance de catégorie (\'category\') avec l'id " + id + ".");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    createCategory: async (req, res) => {

        try {
            res.setHeader('Content-Type', 'application/json');
            const newCategory = await categoryService.createCategory(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    updateCategory: async (req, res) => {

        try {
            res.setHeader('Content-Type', 'application/json');
            const id = req.params.id;
            const updatedCategory = await categoryService.updateCategory(id, req.body);
            updatedCategory ? res.json(updatedCategory) : res.status(404).send("Aucune correspondance de catégorie (\'category\') avec l'id " + id + ". Impossible de la modifier.");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    deleteCategory: async (req, res) => {

        try {
            res.setHeader('Content-Type', 'application/json');
            const id = req.params.id;
            const deletedCategory = await categoryService.deleteCategory(id);
            deletedCategory ? res.status(200).json({ message: "La catégorie (\'category\') a été correctement supprimé.", category: deletedCategory }) : res.status(404).send("Aucune correspondance de catégorie (\'category\') avec l'id " + id + ". Impossible de la supprimer.");
        } catch {
            res.status(500).json({ error: error.message });
        }

    }

};

module.exports = categoryController;
