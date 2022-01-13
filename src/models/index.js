const User = require('./users');
const UserInfo = require('./usersInfo');
const Driver = require('./drivers');
const Car = require('./cars');
const Comfort = require('./comforts');
const Order = require('./orders');
const Feedback = require('./feedbacks');

User.hasOne(UserInfo, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserInfo.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Order, { foreignKey: 'customer_id' });
Order.belongsTo(User, { foreignKey: 'customer_id' });

User.hasOne(Driver, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Driver.belongsTo(User, { foreignKey: 'user_id' });

Car.hasOne(Driver, { foreignKey: 'car_id', onDelete: 'CASCADE' });
Driver.belongsTo(Car, { foreignKey: 'car_id' });

Comfort.hasMany(Car, { foreignKey: 'comfort_id' });
Car.belongsTo(Comfort, { foreignKey: 'comfort_id' });

Order.hasOne(Feedback, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Feedback.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = {
    User,
    UserInfo,
    Driver,
    Car,
    Comfort,
    Order,
    Feedback
};