const helloTiger = (req, res, next) => {
  console.log("Hey Tiger Keep Going..Greatness is near");
  next();
};
module.exports = helloTiger;
