const router = require('express').Router()
const { myData } = require('../database/db')
const {usersOnly} = require('../middlewere/verify')



///Admin products add//////////


router.post('/add',async(req,res)=>{
    try {
        const {prod_name,category_id,price,img} = req.body
        const addProd = await myData(`INSERT INTO products(prod_name,category_id,price,img) VALUES("${prod_name}",${category_id},${price},"${img}")`)
        
        return res.status(200).send({info: "Product added!"})


    } catch (err) {
        console.log(err);
    }

})



/////Admin products Delete////////


router.delete('/delprod/:id',async (req,res)=>{
    try {

        const delProd = await myData(`DELETE FROM products where products.id = ${req.params.id}`)
        res.status(200).send({some:"Product removed!"})


        
    } catch (err) {
        console.log(err);
    }


})




////////Admin products EDIT//////////


router.post('/update',async(req,res)=>{

    try {
        const {id,prod_name,category_id,price,img} = req.body
        const updateProd = await myData(`UPDATE products SET prod_name = "${prod_name}",category_id = ${category_id},price= ${price},img="${img}" WHERE id=${id}`)

        res.status(200).send(updateProd)
        
    } catch (err) {
        console.log(err);

    }


})




//// Get all categories///////


router.get('/getcat',usersOnly,async(req,res)=>{
    try {
        const getCat = await myData('SELECT id, cat_name FROM category ')
        res.status(200).send(getCat)
        
    } catch (err) {
        console.log(err);
    }
})
router.get('/createcat',async(req,res)=>{
    try {
         await myData(`INSERT INTO category(cat_name) VALUES("Milk & Eggs")`)
         await myData(`INSERT INTO category(cat_name) VALUES("Vegetables & fruits")`)
         await myData(`INSERT INTO category(cat_name) VALUES("Meat & Fish")`)
         await myData(`INSERT INTO category(cat_name) VALUES("Wine & Drinks")`)
        
        res.status(200).send({success: "Category created"})
        
    } catch (err) {
        console.log(err);
    }
})


///Get all products ///////


router.get('/',usersOnly,async(req,res)=>{
    try {
        const getProds = await myData('SELECT prod_name,price,img FROM products ')
        res.status(200).send(getProds)
        
    } catch (err) {
        console.log(err);
    }


})


///Get products by category/////////


router.get('/prods/:id', usersOnly, async(req,res)=>{

    try {
        const ProdsByCategory = await myData(`SELECT prod_name,price,img,id,  category_id FROM products where category_id  = ${req.params.id}`)
        res.status(200).send(ProdsByCategory)

        
    } catch (err) {
        console.log(err);
    }

})



//// add To cart //////////

// router.post('/addtocart',usersOnly,async(req,res)=>{
// try {
//     const {user_id,prod_id,cart_id,amount} = req.body   
//     const opencart = await myData(`INSERT INTO cart(user_id) values(${user_id})`)
//     if (opencart) {

//         const addItems = await myData(`INSERT INTO cartitem(prod_id,cart_id,amount) values(${prod_id},${cart_id},${amount})`)
//     }
//      res.status(200).send({some:"Items added!"})

  
    
// } catch (err) {
//     console.log(err);
// }


// })


/////Get the user's cart items//////////////

// router.get('/useritems/:id',usersOnly,async(req,res)=>{
//     try {
//         const userItems = await myData(`select amount,prod_name,price,img,created from cartitem inner join products,cart where products.id = prod_id and cart.id=cart_id and user_id = ${req.params.id}`)
//         res.status(200).send(userItems)

//     } catch (err) {
//         console.log(err);
//     }


// })





router.post('/order',usersOnly,async(req,res)=>{
try {
    const {cart, city,
        street,
        shippingDate,
        creditCard,} = req.body;   
        const {id} = req.user;
    const opencart = await myData(
        `INSERT INTO cart(user_id, shippingDate, city,street,creditCard) values
                          (${id}, ${new Date(shippingDate).getTime()} , ${city}, ${street}, ${creditCard})`)
    if (opencart) {

        const addItems = await myData(`INSERT INTO cartitem(prod_id,cart_id,amount) values(${prod_id},${cart_id},${amount})`)
    }
     res.status(200).send({some:"Items added!"})

  
    
} catch (err) {
    console.log(err);
}


})










module.exports = router