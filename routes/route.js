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

route.get('/addon', (req, res) => {
    const dish = {};
    db.query('SELECT * FROM dish where add_on = 1', async (err, results) => {
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
    if (!image) {
        res.sendStatus(400);
    }
    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/upload/' + image.name);
    const { dish_name, total_calories, description, instructions, allergens, add_on, label, ingredient_id, qty, nut_id, nqty, prefs } = req.body;
    console.log(ingredient_id);
    var ingredient_ids = ingredient_id.split(',');
    console.log(ingredient_ids.length);
    var nut_ids = nut_id.split(',');
    var qtys = qty.split(',');
    var nqtys = nqty.split(',');
    var pref = prefs.split(',');
    db.query('INSERT INTO dish (`dish_name`,`total_calories`,`description`,`instructions`,`allergens`,`add_on`,`label`,`image`) VALUES (?,?,?,?,?,?,?,?)', [dish_name, total_calories, description, instructions, allergens, add_on, label, '/uploads/' + image.name], (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 })
        }
        else {
            for (var i = 0; i < ingredient_ids.length; i++) {
                // console.log(ingredient_ids[i]);
                // console.log('INSERT INTO dish_ingredients (`dish_id`,`ingredient_id`,`ingredient_qty`) VALUES ('+result.insertId+','+ ingredient_ids[i]+','+ qtys[i]+')')
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
    const { dish_name, total_calories, description, instructions, allergens, add_on, label, ingredient_id, qty, nut_id, nqty, prefs } = req.body;
    console.log(ingredient_id);
    var ingredient_ids = ingredient_id.split(',');
    console.log(ingredient_ids.length);
    var nut_ids = nut_id.split(',');
    var qtys = qty.split(',');
    var nqtys = nqty.split(',');
    var pref = prefs.split(',');
    db.query("UPDATE `factor75`.`dish` SET `dish_name` = '" + dish_name + "', `total_calories` = '" + total_calories + "', `description` = '" + description + "', `instructions` = '" + instructions + "', `allergens` = '" + allergens + "', `add_on` = '" + add_on + "', `label` = '" + label + "' WHERE (`id` = '" + id + "')    ", (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            db.query('DELETE FROM ingredients WHERE id = ?', [id], (err) => {
                if (err) throw err;
                res.json({ message: 'Ingredient deleted successfully' });
            });
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
    const { username, email, password, usertype } = req.body;
    db.query('INSERT INTO `users`(`username`,`email`,`password`,`user_type`) VALUES (?,?,?,?)', [username, email, password, usertype], (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'User added successfully', id: result.insertId });

        }

    });
});
route.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, password, usertype } = req.body;
    console.log("UPDATE `users` SET `username` = '" + username + "' and email = '" + email + "' and password = '" + password + "' and user_type = '" + usertype + "' WHERE `id` = " + id + ";");
    db.query('UPDATE `factor75`.`users` SET `username` = "' + username + '",`email` = "' + email + '",`password` = "' + password + '", `user_type` = "' + usertype + '" WHERE `id` = ' + id + ';', (err) => {
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
// route.get('/user', (req, res) => {
//     db.query('Select * from users', (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });
// route.get('/user/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
//         if (err) throw err;
//         res.json(results[0]);
//     });
// });
// // Create a new user
// route.post('/user', (req, res) => {
//     const { username, email, password, usertype } = req.body;
//     db.query('INSERT INTO `users`(`username`,`email`,`password`,`user_type`) VALUES (?,?,?,?)', [username, email, password, usertype], (err, result) => {
//         if (err) {
//             res.json({ message: err, status: 500 })
//         }
//         else {
//             res.json({ message: 'User added successfully', id: result.insertId });

//         }

//     });
// });
// route.put('/user/:id', (req, res) => {
//     const { id } = req.params;
//     const { username, email, password, usertype } = req.body;
//     console.log("UPDATE `users` SET `username` = '" + username + "' and email = '" + email + "' and password = '" + password + "' and user_type = '" + usertype + "' WHERE `id` = " + id + ";");
//     db.query('UPDATE `factor75`.`users` SET `username` = "' + username + '",`email` = "' + email + '",`password` = "' + password + '", `user_type` = "' + usertype + '" WHERE `id` = ' + id + ';', (err) => {
//         if (err) {

//             res.json({ message: err, status: 500 })
//         }
//         else {
//             res.json({ message: 'User updated successfully' });
//         }
//     });
// });
// route.delete('/user/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
//         if (err) throw err;
//         res.json({ message: 'User deleted successfully' });
//     });
// });
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
    const { user_id, first_name, last_name, address, address2, city, state, zipcode, phone_number, payment_method, card_verified } = req.body;
    db.query('INSERT INTO `customers`(`user_id`,`first_name`,`last_name`,`address`,`address2`,`city`,`state`,`zipcode`,`phone_number`,`payment_method`,`card_verified`) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [user_id, first_name, last_name, address, address2, city, state, zipcode, phone_number, payment_method, card_verified], (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Customer added successfully', id: result.insertId });

        }

    });
});
route.put('/customer/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, address, address2, city, state, zipcode, phone_number, payment_method, card_verified } = req.body;
    // console.log("UPDATE `users` SET `username` = '"+username+"' and email = '"+email+"' and password = '"+password+"' and user_type = '"+usertype+"' WHERE `id` = "+id+";");  
    db.query('UPDATE `factor75`.`customers` SET first_name` = "' + first_name + '",`last_name` = "' + last_name + '",`address` = "' + address + '",`address2` = "' + address2 + '",`city` = "' + city + '",`state` = "' + state + '",`zipcode` = "' + zipcode + '",`phone_number` = "' + phone_number + '",`payment_method` = "' + payment_method + '",`card_verified` = "' + card_verified + '" WHERE `id` = ' + id + ';', (err) => {
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
route.get('/orders_c/:customer_id', (req, res) => {
    const { customer_id } = req.params;
    db.query('SELECT p.plan_name,p.no_meals,p.shipping_fee,p.price,o.*,c.`user_id`,c.`first_name`,c.`last_name`,c.`address`,c.`address2`,c.`city`,c.`state`,c.`zipcode`,c.`phone_number`,c.`payment_method`,c.`card_verified` FROM factor75.orders o inner join plans p on p.id = o.plan_id inner join customers c on c.id = o.customer_id WHERE o.customer_id = ?', [customer_id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });


});
route.get('/orders/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT p.plan_name,p.no_meals,p.shipping_fee,p.price,o.*,c.`user_id`,c.`first_name`,c.`last_name`,c.`address`,c.`address2`,c.`city`,c.`state`,c.`zipcode`,c.`phone_number`,c.`payment_method`,c.`card_verified` FROM factor75.orders o inner join plans p on p.id = o.plan_id inner join customers c on c.id = o.customer_id WHERE o.id = ?', [id], async (err, results) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            for (let a = 0; a < results.length; a++) {
                const data = JSON.parse(JSON.stringify(results[a]));

                try {
                    const results2 = await querydishes(data.id);
                    const results3 = await queryaddons(data.id);

                    data.dishes = results2;
                    data.add_on = results3;
                    results[a] = data;
                } catch (error) {
                    res.json({ message: error, status: 500 });
                    return;
                }
            }


            res.json(results);
        }
    });
    function querydishes(order_id) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM factor75.order_dishes od join dish d on d.id = od.dish_id where order_id =  ' + order_id,
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
    function queryaddons(order_id) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM factor75.order_addon od join dish d on d.id = od.add_on where order_id = ' + order_id,
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
route.post('/orders', (req, res) => {
    const { customer_id, order_from, order_to, plan_id, status, order_dish, dish_dates, order_addon } = req.body;
    console.log(dish_dates);
    var dishes = JSON.parse(order_dish);
    console.log(dishes.length);
    var order_addons = JSON.parse(order_addon);
    console.log(order_addons.length);
    var dates = JSON.parse(dish_dates);
    console.log(dates);
    db.query('INSERT INTO `orders`(`customer_id`,`order_from`,`order_to`,`plan_id`,`status`) VALUES (?,?,?,?,?)', [customer_id, order_from, order_to, plan_id, status], (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 })
        }
        else {

            for (var i = 0; i < dishes.length; i++) {
                console.log(dates[i]);
                db.query('INSERT INTO `factor75`.`order_dishes` (`order_id`,`dish_id`,`order_datetime`) VALUES (?,?,?)', [result.insertId, dishes[i], dates[i]], (err2, result2) => {
                    if (err2) {
                        res.json({ message: err, status: 500 })
                    }


                });

            }
            for (var i = 0; i < order_addons.length; i++) {
                console.log(dates[i]);
                db.query('INSERT INTO `factor75`.`order_addon` (`order_id`,`add_on`) VALUES (?,?)', [result.insertId, order_addons[i]], (err2, result2) => {
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
    const { order_from, order_to, plan_id, status, order_dish, dish_dates, order_addon } = req.body;
    console.log(dish_dates);
    var dishes = JSON.parse(order_dish);
    console.log(dishes.length);
    var order_addons = JSON.parse(order_addon);
    console.log(order_addons.length);
    var dates = JSON.parse(dish_dates);
    console.log(dates);
    db.query('DELETE FROM order_dishes WHERE order_id = ?', [id], (err2, result2) => {
        if (err2) {
            res.json({ message: err, status: 500 })
        }


    });
    db.query('DELETE FROM order_addon WHERE order_id = ?', [id], (err2, result2) => {
        if (err2) {
            res.json({ message: err, status: 500 })
        }


    });
    for (var i = 0; i < dishes.length; i++) {
        console.log(dates[i]);
        db.query('INSERT INTO `factor75`.`order_dishes` (`order_id`,`dish_id`,`order_datetime`) VALUES (?,?,?)', [id, dishes[i], dates[i]], (err2, result2) => {
            if (err2) {
                res.json({ message: err, status: 500 })
            }


        });

    }
    for (var i = 0; i < order_addons.length; i++) {
        console.log(dates[i]);
        db.query('INSERT INTO `factor75`.`order_addon` (`order_id`,`add_on`) VALUES (?,?)', [id, order_addons[i]], (err2, result2) => {
            if (err2) {
                res.json({ message: err, status: 500 })
            }


        });

    }
    db.query('UPDATE `factor75`.`orders` SET `order_from` = "' + order_from + '", `order_to` = "' + order_to + '", `plan_id` = "' + plan_id + '", `status` = "' + status + '" WHERE `id` = ' + id + ';', (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Order updated successfully' });
        }
    });
});
route.put('/order_status/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, password, usertype } = req.body;
    // console.log("UPDATE `users` SET `username` = '"+username+"' and email = '"+email+"' and password = '"+password+"' and user_type = '"+usertype+"' WHERE `id` = "+id+";");  
    db.query('UPDATE `factor75`.`users` SET `username` = "' + username + '",`email` = "' + email + '",`password` = "' + password + '", `user_type` = "' + usertype + '" WHERE `id` = ' + id + ';', (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Customer updated successfully' });
        }
    });
});
route.get('/order_dishes/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM factor75.order_dishes od join dish d on d.id = od.dish_id where order_id = ' + id + ' ', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

route.delete('/orders/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM orders WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Order deleted successfully' });
    });
});
route.put('/dish_orders/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    // console.log("UPDATE `users` SET `username` = '"+username+"' and email = '"+email+"' and password = '"+password+"' and user_type = '"+usertype+"' WHERE `id` = "+id+";");  
    db.query('UPDATE `factor75`.`order_dishes` SET `order_status` = "' + status + '" WHERE id = ' + id + '', (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Order Status Updated successfully' });
        }
    });
});
route.put('/dish_orders/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    // console.log("UPDATE `users` SET `username` = '"+username+"' and email = '"+email+"' and password = '"+password+"' and user_type = '"+usertype+"' WHERE `id` = "+id+";");  
    db.query('UPDATE `factor75`.`order_dishes` SET `order_status` = "' + status + '" WHERE id = ' + id + '', (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Order Status Updated successfully' });
        }
    });
});



route.get('/week', (req, res) => {
    db.query('SELECT wm.*,d.id as dish_id,d.dish_name FROM factor75.week_dishes wd join dish d on d.id = wd.dish_id join weekly_menu wm on wm.id = wd.week_id;', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
route.get('/week/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT wm.*,d.id as dish_id,d.dish_name FROM factor75.week_dishes wd join dish d on d.id = wd.dish_id join weekly_menu wm on wm.id = wd.week_id where wm.id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
// Create a new user
route.post('/week', (req, res) => {
    const { label, datefrom, dateto, dishes } = req.body;
    var dish = JSON.parse(dishes);
    console.log(dish.length);
    db.query('INSERT INTO `factor75`.`weekly_menu`(`label`,`datefrom`,`dateto`) VALUES (?,?,?)', [label, datefrom, dateto], (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 })

        }
        else {
            for (var i = 0; i < dish.length; i++) {
                console.log(dish[i]);
                db.query('INSERT INTO `factor75`.`week_dishes` (`week_id`,`dish_id`) VALUES (?,?)', [result.insertId, dish[i]], (err2, result2) => {
                    if (err2) {
                        res.json({ message: err, status: 500 })
                    }


                });

            }
            res.json({ message: 'Week Meals successfully', id: result.insertId });

        }


    });
});
route.put('/week/:id', (req, res) => {
    const { id } = req.params;
    const { label, datefrom, dateto, dishes} = req.body;
    var dish = JSON.parse(dishes);
    console.log(dish.length);
    db.query('DELETE FROM week_dishes WHERE week_id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Week deleted successfully' });
    });
    for (var i = 0; i < dish.length; i++) {
        console.log(dish[i]);
        db.query('INSERT INTO `factor75`.`week_dishes` (`week_id`,`dish_id`) VALUES (?,?)', [result.insertId, dish[i]], (err2, result2) => {
            if (err2) {
                res.json({ message: err, status: 500 })
            }
        });
    }
    db.query('UPDATE `factor75`.`weekly_menu` SET `label` = "' + label + '" and `datefrom` = "' + datefrom + '" and `dateto` = "' + dateto + '" WHERE id = ' + id + '', (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Order Status Updated successfully' });
        }
    });

});
route.delete('/week/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM weekly_menu WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Week deleted successfully' });
    });
});


route.get('/purchase', (req, res) => {
    db.query('Select * from purchasing', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
route.get('/purchase/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM purchasing WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});
// Create a new user
route.post('/purchase', (req, res) => {
    const { ingredient_id, purchased_on, rate, qty,total } = req.body;
    db.query('INSERT INTO `factor75`.`purchasing` (`ing_id`,`pur_on`,`rate`,`qty`,`total`) VALUES (?,?,?,?,?)', [ingredient_id, purchased_on, rate, qty,total], (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 })

        }
        else {
            res.json({ message: 'Purchase Added successfully', id: result.insertId });

        }

    });
});
route.put('/purchase/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, password, usertype } = req.body;
    console.log("UPDATE `users` SET `username` = '" + username + "' and email = '" + email + "' and password = '" + password + "' and user_type = '" + usertype + "' WHERE `id` = " + id + ";");
    db.query('UPDATE `factor75`.`users` SET `username` = "' + username + '",`email` = "' + email + '",`password` = "' + password + '", `user_type` = "' + usertype + '" WHERE `id` = ' + id + ';', (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'User updated successfully' });
        }
    });
});
route.delete('/purchase/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM purchasing WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Purchase deleted successfully' });
    });
});
route.post('/login', (req, res) => {
    const { email,password } = req.body;
    db.query("SELECT * FROM factor75.users where email = ? and password = ?", [email,password], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});








route.get('/', (req, res, next) => {
    res.render('index', { title: 'Dashboard' });
})
route.get('/units', (req, res, next) => {
    res.render('admin/unit', { title: 'Dashboard' });
})
route.get('/ingredients', (req, res, next) => {
    res.render('admin/ingredients', { title: 'Dashboard' });
})
route.get('/nutrients', (req, res, next) => {
    res.render('admin/nutrients', { title: 'Dashboard' });
})
route.get('/preference', (req, res, next) => {
    res.render('admin/preference', { title: 'Dashboard' });
})
route.get('/sub_plan', (req, res, next) => {
    res.render('admin/plan', { title: 'Dashboard' });
})
route.get('/dishes', (req, res, next) => {
    res.render('admin/dish', { title: 'Dashboard' });
})
route.get('/order', (req, res, next) => {
    res.render('admin/orders', { title: 'Dashboard' });
})
route.get('/weekly_menu', (req, res, next) => {
    res.render('admin/weekly_menu', { title: 'Weekly' });
})
route.get('/purchasing', (req, res, next) => {
    res.render('admin/purchasing', { title: 'Purchasing' });
})
route.get('/all_customer', (req, res, next) => {
    res.render('admin/customer', { title: 'Customer' });
})
route.get('/users', (req, res, next) => {
    res.render('admin/users', { title: 'Dashboard' });
})
route.get('/promo_code', (req, res, next) => {
    res.render('admin/promocode', { title: 'Dashboard' });
})
route.get('/auth-login', (req, res, next) => {
    res.render('auth/auth-login', { title: 'Login In', layout: false })
})

module.exports = route;