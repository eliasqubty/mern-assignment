var Product = require("../models/productModel");
exports.insertProduct = (req, res) => {
  var data = {
    ...req.query,
    user: req.user._id
  };
  // console.log("data", data);
  var product = new Product(data);
  product.save((err, data) => {
    if (err) {
      console.log(err);
      res.json({
        success: false,
        msg: "ٰsomething went wrong please try again"
      });
    } else {
      res.json({
        success: true,
        data: data,
        msg: "ٰData uploaded sucessfully"
      });
    }
  });
};

exports.searchProduct = (req, res) => {
  console.log(req.user);
  const limit = parseInt(req.query.limit);
  const order = parseInt(req.query.order);
  const skip = limit * (parseInt(req.query.page) - 1);
  const orderBy = { [req.query.orderBy]: order };
  console.log(orderBy);
  Product.countDocuments({
    user: req.user._id,
    $or: [
      { name: new RegExp(req.query.keyword, "i") },
      { brandName: new RegExp(req.query.keyword, "i") },
      { price: new RegExp(req.query.keyword, "i") },
      { condition: new RegExp(req.query.keyword, "i") }
    ]
  }).exec((err, count) => {
    // console.log("counts",data);
    if (err) {
      console.log(err);
    } else {
      console.log(count);
      Product.find(
        {
          user: req.user._id,
          $or: [
            { name: new RegExp(req.query.keyword, "i") },
            { brandName: new RegExp(req.query.keyword, "i") },
            { price: new RegExp(req.query.keyword, "i") },
            { condition: new RegExp(req.query.keyword, "i") }
          ]
        },
        {},
        { skip: skip, limit: limit }
      )
        .sort(orderBy)
        .exec((err, data) => {
          if (err) {
            console.log(err);
            res.json({
              success: false,
              err,
              msg: "something went wrong please try again"
            });
          } else {
            res.send({
              success: true,
              total: count,
              data: data,
              msg: "data fetched"
            });
          }
        });
    }
  });
};
exports.delProduct = (req, res) => {
  Product.findOneAndDelete({ _id: req.query._id }, function(err, data) {
    if (err) return res.json(err);
    res.json({ success: true });
    console.log(data);
  });
};
exports.updateProduct = (req, res) => {
  Product.findOneAndUpdate({ _id: req.query._id }, req.query, function(
    err,
    data
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.json({ success: true });
    }
  });
};
