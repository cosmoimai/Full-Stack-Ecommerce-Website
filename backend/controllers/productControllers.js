const {
    router
} = require("../app");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ApiFeatures = require("../utils/apifeatures")
const cloudinary = require("cloudinary")

// console.log("here")

//Create Product --- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
        image.push(req.body.images)
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        })

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }

    req.body.images = imagesLinks;
    console.log(imagesLinks)
    req.body.user = req.user.id




    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})


//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    // console.log(" i am in getAllProducts function")
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments()
    // console.log(req.query);
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter()

    let products = await apiFeature.query.clone();

    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query;
    // console.log(products)
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
    })
})

//Get All Products (ADMIN)
exports.getAdminProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find();

    // console.log(products)
    res.status(200).json({
        success: true,
        products,
    })
})


//Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.params.id)
    let product = Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

//Delete Product 
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    //DELETEING IMAGES FROM COUDINARY 
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
            product.images[i].public_id
        )
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
})

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

//create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const {
        rating,
        comment,
        productId
    } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => {
        rev.user.toString() === req.user._id.toString()
    });

    if (isReviewed) {
        console.log("present")
        product.review.forEach(rev => {
            if (rev.user.toString() === req.user._id)
                rev.rating = rating,
                rev.comment = comment
        });
    } else {
        product.reviews.push(review)

    }

    product.numOfReviews = product.reviews.length

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating
    })

    product.ratings = Number(avg / product.reviews.length)

    // console.log(product)

    await product.save({
        validateBeforeSave: false,
    })

    res.status(200).json({
        success: true
    })

})

//get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));

    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})

exports.deleteReviews = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() != req.query.id.toString());

    let avg = 0;
    reviews.forEach((rev) => {

        avg += rev.rating
    })

    // let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    })

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const rating = Number(avg / reviews.length)
    // console.log(reviews.length)
    const numOfReviews = reviews.length
    // console.log("here i am")
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        rating,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
    })

})