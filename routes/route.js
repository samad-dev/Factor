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
    const { nutrient, nutrient_unit } = req.body;
    db.query('INSERT INTO `nutrients`(`nutrient`,nutrient_unit) VALUES (?,?)', [nutrient, nutrient_unit], (err, result) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Nutrient added successfully', id: result.insertId });

        }

    });
});
route.put('/nutrient/:id', (req, res) => {
    const { id } = req.params;
    const { nutrient, nutrient_unit } = req.body;
    console.log(id);
    db.query('UPDATE `nutrients` SET `nutrient` = ?,nutrient_unit = ? WHERE `id` = ?;', [nutrient, nutrient_unit, id], (err) => {
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
    db.query('UPDATE `prefernces` SET `preference` = ? WHERE `id` = ?;', [pref, id], (err) => {
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
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Units added successfully', id: result.insertId });

        }

    });
});
route.put('/unit/:id', (req, res) => {
    const { id } = req.params;
    const { unit } = req.body;
    console.log(id);
    db.query('UPDATE `units` SET `unit` = ?WHERE `id` = ?;', [unit, id], (err) => {
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
    db.query('SELECT i.*,u.unit FROM ingredients i join units u on u.id = i.unit_id', (err, results) => {
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
    const { name, unit } = req.body;
    db.query('INSERT INTO `ingredients`(`ingredient`,`unit_id`) VALUES (?,?)', [name, unit], (err, result) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Ingredient added successfully', id: result.insertId });

        }

    });
});
route.put('/ingredient/:id', (req, res) => {
    const { id } = req.params;
    const { name, unit } = req.body;
    console.log(id);
    db.query('UPDATE `ingredients` SET `unit_id` = ? and ingredient = ? WHERE `id` = ?;', [unit, name, id], (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
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
    const dish = {};
    db.query('SELECT * FROM dish', async (err, results) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            for (let a = 0; a < results.length; a++) {
                const data = JSON.parse(JSON.stringify(results[a]));
    
                try {
                    const results2 = await queryIngredients(data.id);
                    const results3 = await queryNutrients(data.id);
                    const results4 = await queryprefs(data.id);
                    
                    data.ingre = results2;
                    data.nutrient = results3;
                    data.prefs = results4;
                    results[a] = data; 
                } catch (error) {
                    res.json({ message: error, status: 500 });
                    return;
                }
            }
    
            res.json(results);
        }
    });
    
    // Function to query ingredients asynchronously
    function queryIngredients(dishId) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT i.ingredient, u.unit,di.ingredient_qty FROM factor75.ingredients i ' +
                    'JOIN dish_ingredients di ON di.ingredient_id = i.id ' +
                    'JOIN units u ON u.id = i.unit_id ' +
                    'WHERE di.dish_id = ' + dishId,
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }
    function queryNutrients(dishId) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT n.id,n.nutrient, di.nutrient_qty FROM factor75.nutrients n JOIN dish_nutrients di ON di.dish_nutrients = n.id WHERE di.dish_id = ' + dishId,
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }
    function queryprefs(dishId) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT p.preference,p.id FROM factor75.dish_prefernces dp join prefernces p on p.id =dp.preference_id where dish_id = ' + dishId,
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }
});

route.get('/dish/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM dish WHERE id = ?', [id], async (err, results) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            for (let a = 0; a < results.length; a++) {
                const data = JSON.parse(JSON.stringify(results[a]));
    
                try {
                    const results2 = await queryIngredients(data.id);
                    const results3 = await queryNutrients(data.id);
                    const results4 = await queryprefs(data.id);
                    
                    data.ingre = results2;
                    data.nutrient = results3;
                    data.prefs = results4;
                    results[a] = data; 
                } catch (error) {
                    res.json({ message: error, status: 500 });
                    return;
                }
            }
    
            res.json(results);
        }
    });
    
    // Function to query ingredients asynchronously
    function queryIngredients(dishId) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT i.ingredient, u.unit,di.ingredient_qty FROM factor75.ingredients i ' +
                    'JOIN dish_ingredients di ON di.ingredient_id = i.id ' +
                    'JOIN units u ON u.id = i.unit_id ' +
                    'WHERE di.dish_id = ' + dishId,
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }
    function queryNutrients(dishId) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT n.id,n.nutrient, di.nutrient_qty FROM factor75.nutrients n JOIN dish_nutrients di ON di.dish_nutrients = n.id WHERE di.dish_id = ' + dishId,
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }
    function queryprefs(dishId) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT p.preference,p.id FROM factor75.dish_prefernces dp join prefernces p on p.id =dp.preference_id where dish_id = ' + dishId,
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }
});

// Create a new user
route.post('/dish', (req, res) => {
    const { image } = req.files;

    // If no image submitted, exit
    if (!image){
        res.sendStatus(400);
    }
    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/upload/' + image.name);
    const { dish_name, total_calories, description, instructions, allergens, add_on, label, ingredient_id, qty, nut_id, nqty, prefs } = req.body;
    var ingredient_ids = JSON.parse(ingredient_id);
    var nut_ids = JSON.parse(nut_id);
    var qtys = JSON.parse(qty);
    var nqtys = JSON.parse(nqty);
    var pref = JSON.parse(prefs);
    db.query('INSERT INTO dish (`dish_name`,`total_calories`,`description`,`instructions`,`allergens`,`add_on`,`label`,`image`) VALUES (?,?,?,?,?,?,?,?)', [dish_name, total_calories, description, instructions, allergens, add_on, label,'/upload/' + image.name], (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 })
        }
        else {
            for (var i = 0; i < ingredient_ids.length; i++) {
                db.query('INSERT INTO dish_ingredients (`dish_id`,`ingredient_id`,`ingredient_qty`) VALUES (?,?,?)', [result.insertId, ingredient_ids[i], qtys[i]], (err2, result2) => {
                    if (err2) {
                        res.json({ message: err, status: 500 })
                    }


                });

            }
            for (var i = 0; i < nut_ids.length; i++) {
                db.query('INSERT INTO dish_nutrients (`dish_id`,`dish_nutrients`,`nutrient_qty`) VALUES (?,?,?)', [result.insertId, nut_ids[i], nqtys[i]], (err2, result2) => {
                    if (err2) {
                        res.json({ message: err, status: 500 })
                    }


                });

            }
            for (var i = 0; i < pref.length; i++) {
                db.query('INSERT INTO dish_prefernces (`dish_id`,`preference_id`) VALUES (?,?)', [result.insertId, pref[i]], (err2, result2) => {
                    if (err2) {
                        res.json({ message: err, status: 500 })
                    }


                });

            }

            res.json({ message: 'Dish added successfully', id: result.insertId });

        }

    });
    });
route.put('/dish/:id', (req, res) => {
    const { id } = req.params;
    const { dish_name, total_calories, description, instructions, allergens, add_on, label } = req.body;
    // console.log("UPDATE `factor75`.`dish` SET `dish_name` = '"+dish_name+"', `total_calories` = '"+total_calories+"', `description` = '"+description+"', `instructions` = '"+instructions+"', `allergens` = '"+allergens+"', `add_on` = '"+add_on+"', `label` = '"+label+"' WHERE (`id` = '"+id+"');    ");
    db.query("UPDATE `factor75`.`dish` SET `dish_name` = '" + dish_name + "', `total_calories` = '" + total_calories + "', `description` = '" + description + "', `instructions` = '" + instructions + "', `allergens` = '" + allergens + "', `add_on` = '" + add_on + "', `label` = '" + label + "' WHERE (`id` = '" + id + "')    ", (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
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
    db.query('SELECT * FROM dish_ingredients', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

route.get('/dish_ingr/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM dish_ingredients WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
// Create a new user
route.post('/dish_ingr', (req, res) => {
    const { dish_id, ingredient_id, qty } = req.body;
    var ingredient_ids = JSON.parse(ingredient_id);
    var qtys = JSON.parse(qty);
    console.log(ingredient_ids.length);

    for (var i = 0; i < ingredient_ids.length; i++) {
        db.query('INSERT INTO dish_ingredients (`dish_id`,`ingredient_id`,`ingredient_qty`) VALUES (?,?,?)', [dish_id, ingredient_ids[i], qtys[i]], (err, result) => {
            if (err) {
                res.json({ message: err, status: 500 })
            }


        });
    }
    res.json({ message: 'Ingredients Assigned successfully' })

});
route.put('/dish_ingr/:id', (req, res) => {
    const { id } = req.params;
    const { dish_name, total_calories, description, instructions, allergens, add_on, label } = req.body;
    db.query("UPDATE `factor75`.`dish_ingredients` SET `dish_name` = '" + dish_name + "', `total_calories` = '" + total_calories + "', `description` = '" + description + "', `instructions` = '" + instructions + "', `allergens` = '" + allergens + "', `add_on` = '" + add_on + "', `label` = '" + label + "' WHERE (`id` = '" + id + "')    ", (err) => {
        if (err) {
            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Dish updated successfully' });
        }
    });
});
route.delete('/dish_ingr/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM dish_ingredients WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Dish deleted successfully' });
    });
});

////DISH INGRE API END///////////////////////////////////
route.get('/user', (req, res) => {
    db.query('Select * from users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
route.get('/user/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
// Create a new user
route.post('/user', (req, res) => {
    const { username, email,password,usertype } = req.body;
    db.query('INSERT INTO `users`(`username`,`email`,`password`,`user_type`) VALUES (?,?,?,?)', [username, email,password,usertype], (err, result) => {
        if (err) 
        {
             res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'User added successfully', id: result.insertId });

        }

    });
});
route.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const {  username, email,password,usertype } = req.body;  
    console.log("UPDATE `users` SET `username` = '"+username+"' and email = '"+email+"' and password = '"+password+"' and user_type = '"+usertype+"' WHERE `id` = "+id+";");  
    db.query('UPDATE `factor75`.`users` SET `username` = "'+username+'",`email` = "'+email+'",`password` = "'+password+'", `user_type` = "'+usertype+'" WHERE `id` = '+id+';', (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'User updated successfully' });
        }
    });
});
route.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'User deleted successfully' });
    });
});
///////////////////////User API Ends////////////////////////
route.get('/user', (req, res) => {
    db.query('Select * from users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
route.get('/user/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
// Create a new user
route.post('/user', (req, res) => {
    const { username, email,password,usertype } = req.body;
    db.query('INSERT INTO `users`(`username`,`email`,`password`,`user_type`) VALUES (?,?,?,?)', [username, email,password,usertype], (err, result) => {
        if (err) 
        {
             res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'User added successfully', id: result.insertId });

        }

    });
});
route.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const {  username, email,password,usertype } = req.body;  
    console.log("UPDATE `users` SET `username` = '"+username+"' and email = '"+email+"' and password = '"+password+"' and user_type = '"+usertype+"' WHERE `id` = "+id+";");  
    db.query('UPDATE `factor75`.`users` SET `username` = "'+username+'",`email` = "'+email+'",`password` = "'+password+'", `user_type` = "'+usertype+'" WHERE `id` = '+id+';', (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'User updated successfully' });
        }
    });
});
route.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'User deleted successfully' });
    });
});
///////////////////USER API ENDS///////////////////////////////////////////

route.get('/customer', (req, res) => {
    db.query('Select * from customers', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
route.get('/customer/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM customers WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
// Create a new user
route.post('/customer', (req, res) => {
    const { user_id,first_name,last_name,address,address2,city,state,zipcode,phone_number,payment_method,card_verified} = req.body;
    db.query('INSERT INTO `customers`(`user_id`,`first_name`,`last_name`,`address`,`address2`,`city`,`state`,`zipcode`,`phone_number`,`payment_method`,`card_verified`) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [user_id,first_name,last_name,address,address2,city,state,zipcode,phone_number,payment_method,card_verified], (err, result) => {
        if (err) 
        {
             res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Customer added successfully', id: result.insertId });

        }

    });
});
route.put('/customer/:id', (req, res) => {
    const { id } = req.params;
    const {  username, email,password,usertype } = req.body;  
    // console.log("UPDATE `users` SET `username` = '"+username+"' and email = '"+email+"' and password = '"+password+"' and user_type = '"+usertype+"' WHERE `id` = "+id+";");  
    db.query('UPDATE `factor75`.`users` SET `username` = "'+username+'",`email` = "'+email+'",`password` = "'+password+'", `user_type` = "'+usertype+'" WHERE `id` = '+id+';', (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Customer updated successfully' });
        }
    });
});
route.delete('/customer/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM customers WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Customer deleted successfully' });
    });
});


route.get('/orders', (req, res) => {
    db.query('SELECT p.plan_name,p.no_meals,p.shipping_fee,p.price,o.*,c.`user_id`,c.`first_name`,c.`last_name`,c.`address`,c.`address2`,c.`city`,c.`state`,c.`zipcode`,c.`phone_number`,c.`payment_method`,c.`card_verified` FROM factor75.orders o inner join plans p on p.id = o.plan_id inner join customers c on c.id = o.customer_id;', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
route.get('/orders/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM orders WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
// Create a new user
route.post('/orders', (req, res) => {
    const {customer_id,order_from,order_to,plan_id,status,order_dish,dish_dates} = req.body;
    console.log(dish_dates);
    var dishes = JSON.parse(order_dish);
    console.log(dishes.length);
    var dates = JSON.parse(dish_dates);
    console.log(dates);
    db.query('INSERT INTO `orders`(`customer_id`,`order_from`,`order_to`,`plan_id`,`status`) VALUES (?,?,?,?,?)', [customer_id,order_from,order_to,plan_id,status], (err, result) => {
        if (err) 
        {
             res.json({ message: err, status: 500 })
        }
        else {

            for (var i = 0; i < dishes.length; i++) 
            {
                console.log(dates[i]);
                db.query('INSERT INTO `factor75`.`order_dishes` (`order_id`,`dish_id`,`order_datetime`) VALUES (?,?,?)', [result.insertId, dishes[i],dates[i]], (err2, result2) => {
                    if (err2) {
                        res.json({ message: err, status: 500 })
                    }


                });

            }
            res.json({ message: 'Order Created successfully', id: result.insertId });

        }

    });
});
route.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const {  customer_id,order_from,order_to,plan_id,status} = req.body;  
    // console.log("UPDATE `users` SET `username` = '"+username+"' and email = '"+email+"' and password = '"+password+"' and user_type = '"+usertype+"' WHERE `id` = "+id+";");  
    db.query('UPDATE `factor75`.`users` SET `username` = "'+username+'",`email` = "'+email+'",`password` = "'+password+'", `user_type` = "'+usertype+'" WHERE `id` = '+id+';', (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Customer updated successfully' });
        }
    });
});
route.delete('/customer/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM orders WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Order deleted successfully' });
    });
});


///Update Individual Order Status
route.put('/dish_orders/:id', (req, res) => {
    const { id } = req.params;
    const { status} = req.body;  
    // console.log("UPDATE `users` SET `username` = '"+username+"' and email = '"+email+"' and password = '"+password+"' and user_type = '"+usertype+"' WHERE `id` = "+id+";");  
    db.query('UPDATE `factor75`.`order_dishes` SET `order_status` = "'+status+'" WHERE id = '+id+'', (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Order Status Updated successfully' });
        }
    });
});



route.get('/', (req, res, next) => {
    res.render('index', { title: 'Dashboard'});
})
route.get('/units', (req, res, next) => {
    res.render('admin/unit', { title: 'Dashboard'});
})
route.get('/ingredients', (req, res, next) => {
    res.render('admin/ingredients', { title: 'Dashboard'});
})
route.get('/nutrients', (req, res, next) => {
    res.render('admin/nutrients', { title: 'Dashboard'});
})
route.get('/preference', (req, res, next) => {
    res.render('admin/preference', { title: 'Dashboard'});
})
route.get('/sub_plan', (req, res, next) => {
    res.render('admin/plan', { title: 'Dashboard'});
})
route.get('/dishes', (req, res, next) => {
    res.render('admin/dish', { title: 'Dashboard'});
})
route.get('/auth-login', (req, res, next) => {
    res.render('auth/auth-login', { title: 'Login In', layout: false })
})

module.exports = route;