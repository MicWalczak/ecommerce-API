const { Category } = require('../models/category')
const express = require('express');
const router = express.Router()


router.get(`/`, async (req, res) => {
    const categoryList = await Category.find()

    if (!categoryList) res.status(500).json({ success: false })
    res.status(200).send(categoryList)
})

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (!category) res.status(500).send({ massage: 'The category with given Id was not found' })
    res.status(200).send(category)

})

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon
    })
    category = await category.save()

    if (!category) return res.status(404).send('The category cannot be created')
    res.send(category)
})

router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon
        },
        { new: true }
    )
    if (!category) return res.status(404).send('The category cannot be updated')
    res.send(category)
})

router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (category) return res.status(200).json({ success: true, message: 'the category is deleted' })
        else return res.status(404).json({ success: false, message: 'category is not found' })
    })
})

module.exports = router