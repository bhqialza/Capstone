import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
    const { category, name, img, steps } = req.body;
    if (!category || !name || !img || !steps) return res.status(400).json({
        status: "fail",
        msg: "Please fill all the fields"
    })
    try {
        const product = await Product.create({ category, name, img, steps });
        if (!product) return res.status(400).json({
            status: "fail",
            msg: "failed to add product"
        })
        return res.status(200).json({
            status: "success",
            msg: "product added successfully"
        })
    } catch (error) {
        console.log(error.message);
    }
}
