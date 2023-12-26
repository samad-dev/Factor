const express = require('express');
const mysql = require('mysql2');
const route = express.Router();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'factor75',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

//////////////////////////// PLAN API //////////////////////////////////////
route.get('/plan', (req, res) => {
    db.query('SELECT * FROM plans', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

route.get('/plan/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM plans WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
// Create a new user
route.post('/plan', (req, res) => {
    const { plan_name, no_meals, price, shipping_fee } = req.body;
    db.query('INSERT INTO `plans`(`plan_name`,`no_meals`,`price`,`shipping_fee`) VALUES (?,?,?,?)', [plan_name, no_meals, price, shipping_fee], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Plan added successfully', id: result.insertId });
    });
});
route.put('/plan/:id', (req, res) => {
    const { id } = req.params;
    const { plan_name, no_meals, price, shipping_fee } = req.body;
    console.log(id);
    db.query('UPDATE `plans` SET `plan_name` = ?, `no_meals` = ?, `price` = ?, `shipping_fee` = ? WHERE `id` = ?;', [plan_name, no_meals, price, shipping_fee, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Plan updated successfully' });
    });
});
route.delete('/plan/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM plans WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Plan deleted successfully' });
    });
});

//////////////////////////////////PLAN API ENDS////////////////////////////////////////////


///////////////nutrient API///////////////////////////////////////////////////////////////
route.get('/nutrient', (req, res) => {
    db.query('SELECT * FROM nutrients', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

route.get('/nutrient/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM nutrients WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
// Create a new user
route.post('/nutrient', (req, res) => {
    const { nutrient,nutrient_unit } = req.body;
    db.query('INSERT INTO `nutrients`(`nutrient`,nutrient_unit) VALUES (?,?)', [nutrient,nutrient_unit], (err, result) => {
        if (err){

            res.json({message:err,status:500})
        }
        else
        {
            res.json({ message: 'Nutrient added successfully', id: result.insertId });

        }
        
    });
});
route.put('/nutrient/:id', (req, res) => {
    const { id } = req.params;
    const { nutrient,nutrient_unit } = req.body;
    console.log(id);
    db.query('UPDATE `nutrients` SET `nutrient` = ?,nutrient_unit = ? WHERE `id` = ?;', [nutrient, nutrient_unit,id], (err) => {
        if (err) throw err;
        res.json({ message: 'Nutrient updated successfully' });
    });
});
route.delete('/nutrient/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM nutrients WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Nutrient deleted successfully' });
    });
});

/////////////////////////////////nutrient API ENDS/////////////////////////////////////////




route.get('/prefs', (req, res) => {
    db.query('SELECT * FROM prefernces', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

route.get('/prefs/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM prefernces WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
// Create a new user
route.post('/prefs', (req, res) => {
    const { pref } = req.body;
    db.query('INSERT INTO `prefernces`(`preference`) VALUES (?)', [pref], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Preference added successfully', id: result.insertId });
    });
});
route.put('/prefs/:id', (req, res) => {
    const { id } = req.params;
    const { pref } = req.body;
    console.log(id);
    db.query('UPDATE `prefernces` SET `preference` = ? WHERE `id` = ?;', [pref,id], (err) => {
        if (err) throw err;
        res.json({ message: 'Preference updated successfully' });
    });
});
route.delete('/prefs/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM prefernces WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Preference deleted successfully' });
    });
});

//////////////////////////////Prefs API ENDS/////////////////////////////////////////////////

route.get('/unit', (req, res) => {
    db.query('SELECT * FROM units', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

route.get('/unit/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM units WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
// Create a new user
route.post('/unit', (req, res) => {
    const { unit } = req.body;
    db.query('INSERT INTO `units`(`unit`) VALUES (?)', [unit], (err, result) => {
        if (err){

            res.json({message:err,status:500})
        }
        else
        {
            res.json({ message: 'Units added successfully', id: result.insertId });

        }
        
    });
});
route.put('/unit/:id', (req, res) => {
    const { id } = req.params;
    const { unit } = req.body;
    console.log(id);
    db.query('UPDATE `units` SET `unit` = ?WHERE `id` = ?;', [unit,id], (err) => {
        if (err) throw err;
        res.json({ message: 'Unit updated successfully' });
    });
});
route.delete('/unit/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM units WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Unit deleted successfully' });
    });
});


///////////////////////////UNits API ENDS///////////////////////////////////////////////////
route.get('/ingredient', (req, res) => {
    db.query('SELECT * FROM ingredients', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

route.get('/ingredient/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM ingredients WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
// Create a new user
route.post('/ingredient', (req, res) => {
    const { name,unit } = req.body;
    db.query('INSERT INTO `ingredients`(`ingredient`,`unit_id`) VALUES (?,?)', [name,unit], (err, result) => {
        if (err){

            res.json({message:err,status:500})
        }
        else
        {
            res.json({ message: 'Ingredient added successfully', id: result.insertId });

        }
        
    });
});
route.put('/ingredient/:id', (req, res) => {
    const { id } = req.params;
    const { name,unit } = req.body;
    console.log(id);
    db.query('UPDATE `ingredients` SET `unit_id` = ? and ingredient = ? WHERE `id` = ?;', [unit,name,id], (err) => {
        if (err){

            res.json({message:err,status:500})
        }
        else
        {
        res.json({ message: 'Ingredient updated successfully' });
        }
    });
});
route.delete('/ingredient/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM ingredients WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Ingredient deleted successfully' });
    });
});
////////////////////////Ingredients API ENDS/////////////////////////////////////////////////

route.get('/dish', (req, res) => {
    db.query('SELECT * FROM dish', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

route.get('/dish/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM dish WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
// Create a new user
route.post('/dish', (req, res) => {
    const { dish_name,total_calories,description,instructions,allergens,add_on,label } = req.body;
    db.query('INSERT INTO dish (`dish_name`,`total_calories`,`description`,`instructions`,`allergens`,`add_on`,`label`) VALUES (?,?,?,?,?,?,?)', [dish_name,total_calories,description,instructions,allergens,add_on,label], (err, result) => {
        if (err){
            res.json({message:err,status:500})
        }
        else
        {
            res.json({ message: 'Dish added successfully', id: result.insertId });

        }
        
    });
});
route.put('/dish/:id', (req, res) => {
    const { id } = req.params;
    const { dish_name,total_calories,description,instructions,allergens,add_on,label } = req.body;
    // console.log("UPDATE `factor75`.`dish` SET `dish_name` = '"+dish_name+"', `total_calories` = '"+total_calories+"', `description` = '"+description+"', `instructions` = '"+instructions+"', `allergens` = '"+allergens+"', `add_on` = '"+add_on+"', `label` = '"+label+"' WHERE (`id` = '"+id+"');    ");
    db.query("UPDATE `factor75`.`dish` SET `dish_name` = '"+dish_name+"', `total_calories` = '"+total_calories+"', `description` = '"+description+"', `instructions` = '"+instructions+"', `allergens` = '"+allergens+"', `add_on` = '"+add_on+"', `label` = '"+label+"' WHERE (`id` = '"+id+"')    ", (err) => {
        if (err){

            res.json({message:err,status:500})
        }
        else
        {
        res.json({ message: 'Dish updated successfully' });
        }
    });
});
route.delete('/dish/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM dish WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Dish deleted successfully' });
    });
});

//////////////////////////Dish API ENDS///////////////////////////////////////////////////////
route.get('/dish_ingr', (req, res) => {
    db.query('SELECT * FROM dish', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

route.get('/dish_ingr/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM dish WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
// Create a new user
route.post('/dish_ingr', (req, res) => {
    const { dish_name,total_calories,description,instructions,allergens,add_on,label } = req.body;
    db.query('INSERT INTO dish (`dish_name`,`total_calories`,`description`,`instructions`,`allergens`,`add_on`,`label`) VALUES (?,?,?,?,?,?,?)', [dish_name,total_calories,description,instructions,allergens,add_on,label], (err, result) => {
        if (err){
            res.json({message:err,status:500})
        }
        else
        {
            res.json({ message: 'Ingredient added successfully', id: result.insertId });

        }
        
    });
});
route.put('/dish_ingr/:id', (req, res) => {
    const { id } = req.params;
    const { dish_name,total_calories,description,instructions,allergens,add_on,label } = req.body;
    db.query("UPDATE `factor75`.`dish` SET `dish_name` = '"+dish_name+"', `total_calories` = '"+total_calories+"', `description` = '"+description+"', `instructions` = '"+instructions+"', `allergens` = '"+allergens+"', `add_on` = '"+add_on+"', `label` = '"+label+"' WHERE (`id` = '"+id+"')    ", (err) => {
        if (err){
            res.json({message:err,status:500})
        }
        else
        {
        res.json({ message: 'Dish updated successfully' });
        }
    });
});
route.delete('/dish_ingr/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM dish WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Dish deleted successfully' });
    });
});

module.exports = route;