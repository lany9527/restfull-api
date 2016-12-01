/**
 * Created by littlestone on 2016/11/30.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String
});

module.exports = mongoose.model('User', UserSchema);
