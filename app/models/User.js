/**
 * Created by littlestone on 2016/11/30.
 */
/*password: String,
 token: String,*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  age: Number,
  email: String
});

module.exports = mongoose.model('User', UserSchema);
