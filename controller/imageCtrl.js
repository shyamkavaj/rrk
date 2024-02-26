const db = require('../model')
const Img = db.img;
const fs = require('fs');
const path = require('path');
const addImg = async (req, res) => {
    const file_detail = {
        typeof_image : req.file.mimetype,
        image_name : req.file.filename,
    }
    const add = await Img.create(file_detail);
    console.log(file_detail);
    res.status(200).send(add)
}
const updateImg = async (req, res) =>{
    const id = req.params.id;
    const new_file_detail = {
        typeof_image : req.file.mimetype,
        image_name : req.file.filename,
    }
    const getExistingImg = await Img.findOne({where: {id: id}});
    // console.log(getExistingImg);
    
    const imgPath = path.join(__dirname, '../uploads', getExistingImg.image_name);
    fs.unlink(imgPath, (err) => {
      if (err) {
        console.log(err);
      }
    })
    const data = await Img.update(new_file_detail, {where: {id: id}});
    res.status(200).send(data);
}

module.exports = {
    addImg,
    updateImg,
}