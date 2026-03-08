const express = require('express');
const pool = require('../pool');

const router = express.Router();

// GET all recipes
router.get('/', async (req, res) => {

    const [recipes] = await pool.execute(
        'SELECT recipeid, name FROM recipes'
    );

    res.json(recipes);
});


// GET one recipe
router.get('/:id', async (req, res) => {

    const [recipes] = await pool.execute(
        'SELECT * FROM recipes WHERE recipeid=?',
        [req.params.id]
    );

    if (!recipes.length) {
        return res.status(404).send('Recipe not found');
    }

    res.json(recipes[0]);
});


// POST new recipe
router.post('/', async (req, res) => {

    const [result] = await pool.execute(
        `INSERT INTO recipes(name, description, instructions)
     VALUES (?,?,?)`,
        [req.body.name, req.body.description, req.body.instructions]
    );

    res.status(201).json({
        recipeid: result.insertId,
        ...req.body
    });
});


// PUT update recipe
router.put('/:id', async (req, res) => {

    const [result] = await pool.execute(
        `UPDATE recipes
     SET name=?, description=?, instructions=?
     WHERE recipeid=?`,
        [req.body.name, req.body.description, req.body.instructions, req.params.id]
    );

    if (!result.affectedRows) {
        return res.status(404).send('Recipe not found');
    }

    res.status(204).end();
});


// DELETE recipe
router.delete('/:id', async (req, res) => {

    const [result] = await pool.execute(
        'DELETE FROM recipes WHERE recipeid=?',
        [req.params.id]
    );

    if (!result.affectedRows) {
        return res.status(404).send('Recipe not found');
    }

    res.status(204).end();
});


module.exports = router;