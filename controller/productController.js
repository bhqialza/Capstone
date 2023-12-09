import dbFirestore from "../middleware/dbFirestore.js";

export const addProduct = async (req, res) => {
    const { category, name, img, steps } = req.body;
    if (!category || !name || !img || !steps) return res.status(400).json({
        status: "fail",
        msg: "Please fill all the fields"
    })
    try {
        const docRef = dbFirestore.collection('products').doc();
        const newProduct = {
            category,
            name,
            img,
            steps
        }
        await docRef.set(newProduct);
        return res.status(200).json({
            status: "success",
            msg: "product added successfully"
        })

    } catch (error) {
        console.log(error.message);
    }
}
