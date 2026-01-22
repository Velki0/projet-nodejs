const { Course } = require('../sequelize/models/associations');
const { Op } = require('sequelize');

const courseService = {

    getAllCourses: async () => {

        return await Course.findAll({ include: "category" });
    
    },

    getCourseById: async (id) => {

        return await Course.findByPk(id);

    },

    getCoursesByLevel: async (level) => {

        return await Course.findAll({ where: { level: level }});

    },

    getCoursesBySearchKeyword: async (keyword) => {

        return await Course.findAll({ where: {
            [Op.or]: [
                { title: { [Op.like]: `%${keyword}%` } },
                { description: { [Op.like]: `%${keyword}%` } },
            ]
        }});

    },

    getCoursesByFilterPrice: async (minPrice, maxPrice) => {

        return await Course.findAll({ where: { 
            price: { 
                [Op.gte]: minPrice, 
                [Op.lte]: maxPrice 
            } 
        }});

    },

    createCourse: async (newCourse) => {

        return await Course.create(newCourse);

    },

    updateCourse: async (id, updatedCourse) => {

        const oldCourse = await Course.findByPk(id);
        if (oldCourse) {
            return await oldCourse.update(updatedCourse);
        } else {
            return null;
        }

    },

    deleteCourse: async (id) => {

        const course = await Course.findByPk(id);
        if (course) {
            await course.destroy()
            return course;
        } else {
            return null;
        }

    }

};

module.exports = courseService;
