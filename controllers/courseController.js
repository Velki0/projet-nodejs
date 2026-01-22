const courseService = require('../services/courseService');

const controller = {

    getAllCourses: async (req, res) => {

        try {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(await courseService.getAllCourses());
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    getCourseById: async (req, res) => {

        try {
            res.setHeader('Content-Type', 'application/json');
            const id = req.params.id;
            const course = await courseService.getCourseById(id);
            course ? res.status(200).json(course) : res.status(404).send("Aucune correspondance de cours avec l'id " + id + ".");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    getCoursesByLevel: async (req, res) => {

        try {
            res.setHeader('Content-Type', 'application/json');
            const level = req.params.level;
            const courses = await courseService.getCoursesByLevel(level);
            courses.length > 0 ? res.status(200).json(courses) : res.status(404).send("Aucune correspondance de cours avec le niveau (\'level\') " + level + " renseigné.");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    createCourse: async (req, res) => {

        try {
            res.setHeader('Content-Type', 'application/json');
            const newCourse = await courseService.createCourse(req.body);
            res.status(201).json(newCourse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    updateCourse: async (req, res) => {

        try {
            res.setHeader('Content-Type', 'application/json');
            const id = req.params.id;
            const updatedCourse = await courseService.updateCourse(id, req.body);
            updatedCourse ? res.json(updatedCourse) : res.status(404).send("Aucune correspondance de cours avec l'id " + id + ". Impossible de le modifier.");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },

    deleteCourse: async (req, res) => {

        try {
            res.setHeader('Content-Type', 'application/json');
            const id = req.params.id;
            const deletedCourse = await courseService.deleteCourse(id);
            deletedCourse ? res.status(200).json({ message: "Le cours a été correctement supprimé.", course: deletedCourse }) : res.status(404).send("Aucune correspondance de cours avec l'id " + id + ". Impossible de le supprimer.");
        } catch {
            res.status(500).json({ error: error.message });
        }

    }

};

module.exports = controller;
