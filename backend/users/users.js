const router = require("express").Router();

router.get('/', (req,res) => {
    res.send('teste get')
});
router.post('/', (req,res) => {
    res.send('teste post')
});
router.put('/', (req,res) => {
    res.send('teste put')
});
router.delete('/', (req,res) => {
    res.send('teste delete')
});

module.exports = router;