import { Router } from "express"

const routerProd = Router()

routerProd.get('/', async (req, res) =>{

})

routerProd.get('/:pid', async (req, res) =>{
    const {pid} = req.params
})

routerProd.post('/', async (req, res) =>{

})

routerProd.put('/:pid', async (req, res) =>{
    const {pid} = req.params
})

routerProd.delete('/:pid', async (req, res) =>{
    const {pid} = req.params
})

export default routerProd