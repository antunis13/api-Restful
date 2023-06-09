const ProductsModel = require('../models/products')


 async function get(req, res){
    const {id} = req.params

    const obj = id? {_id: id} : null

    const products = await ProductsModel.find(obj)

    res.send(products)
}

async function post(req, res){
    const {
        name,
        brand,
        price,
    } = req.body

    const product = new ProductsModel({
        name,
        brand,
        price,
    })

    product.save()

    res.send({
        message: 'success'
    })
}

async function put(req, res){
    const { id } = req.params

    const product = await ProductsModel.findById({ _id: id})

    await product.updateOne(req.body)

    res.send({
        message: 'success',
        product,
    })
}

async function remove(req, res){
    const {id} = req.params

    const remove = await ProductsModel.deleteOne({_id: id})

   if(!remove.ok){
    message = 'error'
   }

    res.send({
        message: 'success'
    })
}

module.exports = {
    get,
    post,
    put,
    remove,
}