const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        //son dos consultas, una devuelve videos, y la otra todas las categories
        conn.query('SELECT * FROM video ORDER BY date DESC', (err, videos) => {
            conn.query('SELECT category FROM video group by category', (err2, categories) => {
                conn.query("select description from video ORDER BY date DESC", (err3, link) => {
                    if (err3) {
                        res.json(err3);
                    }
                    res.render('videos', {
                        opcionesList: categories, //aqui se envian los dos parametros al videos.ejs
                        data: videos,
                        link: link
                    });
                });
            });
        });
    });
};

controller.listbycategory = (req, res) => {
    const { category } = req.params; //envia categoria por url
    console.log(`Se envió : ${category}`);
    req.getConnection((err, conn) => {
        //son dos consultas, una devuelve videos de acuerdo a categoria, y la otra las categories
        conn.query('SELECT * FROM video WHERE category = ? ORDER BY date DESC', category, (err, videos) => {
            conn.query('SELECT category FROM video group by category', (err2, categories) => {
                conn.query("select description from video WHERE category = ? ORDER BY date DESC", category, (err3, link) => {

                    if (err) {
                        res.json(err);
                    }
                    res.render('videos', {
                        opcionesList: categories, //aqui se envian los dos parametros al videos.ejs
                        data: videos,
                        link: link
                    });
                });

            });
        });
    });
};



controller.listcategories = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT DISTINCT category FROM video order by category', (err, categories) => {
            if (err) {
                res.json(err);
            }
            res.render('videos', {
                data: categories
            });
        });
    });
};

//----------------------------------------------------------------------------------------------
controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO video set ?', data, (err, video) => {
            console.log(video)
            conn.query("select description from video order by id desc limit 1", (err2, link) => { //en description el usuario pone el link entonces aquí muestra el link del video que se acaba de agregar
                console.log(link.value);
                if (err2) {
                    res.json(err2);
                }
                res.render('add', {
                    link: link //se envian el link a add.ejs para ver el video

                });

            });
        })
    })
};
//-------------------------------------------------------------------------------------------

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM video WHERE id = ?", [id], (err, rows) => {
            res.render('videos_edit', {
                data: rows[0]
            })
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newVideo = req.body;
    req.getConnection((err, conn) => {

        conn.query('UPDATE video set ?  WHERE id = ?', [newVideo, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
        const { id } = req.params;
        req.getConnection((err, connection) => {
            connection.query('DELETE FROM video WHERE id = ?', [id], (err, rows) => {
                res.redirect('/');
            });
        });
    }
    /*
controller.detail = (req, res) => {
    const { id } = req.params; //envia id por url
    console.log(`Se envió : ${id}`);
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM video WHERE id = ?', id, (err, video) => {
            conn.query("select description from video WHERE id = ?", id, (err2, link) => {
                conn.query('SELECT id FROM video group by id', (err2, id) => {


                if (err) {
                    res.json(err);
                }
                res.render('reprod', {
                    data: video,
                    link: link,
                    opcionesList: id
                });
            });
            });
        });
    });
};
*/
module.exports = controller;