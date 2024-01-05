const { Router } = require("express");
const { isAuthentication, authorizeroles } = require("../middleware/authentication");
const { addBanner, getAllBanner, deleteBanner } = require("../controllers/bannerController");



const bannerRouters = Router();

bannerRouters.post('/admin/banner/new', isAuthentication, authorizeroles("admin"), addBanner)
bannerRouters.get('/admin/getBanner', isAuthentication, authorizeroles("admin"), getAllBanner);

bannerRouters.delete('/admin/banner/:id', isAuthentication, authorizeroles("admin"), deleteBanner);

module.exports = bannerRouters;