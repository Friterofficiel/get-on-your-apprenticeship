import express from 'express';
import axios from 'axios';

const realRouter = express.Router();

realRouter.get('/students', async (req, res) => {
  try {
    const response = await axios.get('https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters');
    const students = response.data.map((character) => ({
      id: character.id,
      name: character.name,
      house: character.house,
      alternate_names: character.alternate_names,
    }));

    const house = req.query.house;
    let filteredStudents = students;

    if (house) {
      filteredStudents = students.filter((student) => student.house === house);
    }

    // Pagination logic
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 10; // Number of students per page
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

    res.json({
      page,
      totalPages: Math.ceil(filteredStudents.length / limit),
      totalStudents: filteredStudents.length,
      students: paginatedStudents
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

realRouter.get('/randomstudent', async (req, res) => {
  try {
    const response = await axios.get('https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters');
    const students = response.data.map((character) => ({
      id: character.id,
      name: character.name,
      house: character.house,
      alternate_names: character.alternate_names,
    }));

    if (students.length > 0) {
      const randomIndex = Math.floor(Math.random() * students.length);
      res.json(students[randomIndex]);
    } else {
      res.status(404).json({ error: 'No students found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});
app.use('/.netlify/functions/real', router); 
export default realRouter;
