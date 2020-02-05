const db = require('../models');


async function searchGenre(name){
    let data = await db.genre.findOne({
        where: {
            name: name
        },
        include:[{model:db.listener,
        

        include:[db.city]}    
        ]
    })
    return data;
}



module.exports = {
    searchGenre:searchGenre
}