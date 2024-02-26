const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Admin = sequelize.define("admin", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
});

const Review = sequelize.define("review", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    event_name: { type: DataTypes.STRING },
    review_body: { type: DataTypes.TEXT },
    img: { type: DataTypes.STRING },
});

const Callback = sequelize.define("callback", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
});

const Client = sequelize.define("client", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
});

const PortfolioType = sequelize.define("portfolio_type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
});

const Gallery = sequelize.define("gallery", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
});

const GalleryPhoto = sequelize.define("gallery_photo", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    img: { type: DataTypes.STRING, allowNull: false },
});

const Order = sequelize.define("order", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    mail: { type: DataTypes.STRING, allowNull: false },
    order_body: { type: DataTypes.STRING, allowNull: false },
});

const OrderService = sequelize.define("order_device", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Service = sequelize.define("service", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    service_body: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
});

const ServicePrice = sequelize.define("service_price", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
});

const ServiceInfo = sequelize.define("service_info", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
});

const Type = sequelize.define("type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});

const ServiceType = sequelize.define("service_type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

PortfolioType.hasMany(Gallery);
Gallery.belongsTo(PortfolioType);

Gallery.hasMany(GalleryPhoto);
GalleryPhoto.belongsTo(Gallery);

Order.hasMany(OrderService);
OrderService.belongsTo(Order);

Service.hasOne(OrderService);
OrderService.belongsTo(Service);

Service.hasMany(ServicePrice, { as: "price" });
ServicePrice.belongsTo(Service);

Service.hasMany(ServiceInfo, { as: "info" });
ServiceInfo.belongsTo(Service);

Type.belongsToMany(Service, {
    through: ServiceType,
});
Service.belongsToMany(Type, {
    through: ServiceType,
});

module.exports = {
    Admin,
    Review,
    Callback,
    Client,
    PortfolioType,
    Gallery,
    GalleryPhoto,
    Order,
    OrderService,
    Service,
    ServiceInfo,
    ServicePrice,
    Type,
    ServiceType,
};
