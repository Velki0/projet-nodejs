const { Course } = require('../sequelize/models/associations');

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
