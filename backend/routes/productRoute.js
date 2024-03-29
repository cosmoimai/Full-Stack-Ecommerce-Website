const express = require("express")
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
    getProductReviews,
    deleteReviews,
    getAdminProducts,
} = require("../controllers/productControllers");

// console.log("I am in productRoute.js")

const {
    isAuthenticatedUser,
    authorizeRoles
} = require("../middleware/auth");

const router = express.Router(); //Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts)

router.route("/products").get(getAllProducts)
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
router.route("/product/:id").get(getProductDetails)
router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReviews)


module.exports = router