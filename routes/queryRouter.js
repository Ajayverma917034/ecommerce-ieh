const { Router } = require("express")
const { deleteQuery, getAllQuery, newQuery, updateQueryStatus, getQuery } = require("../controllers/queryController.js")
const { authorizeroles, isAuthentication } = require("../middleware/authentication.js")


const qureyRouters = Router();

qureyRouters.post('/query/new', newQuery)
qureyRouters.get('/admin/allQuery', isAuthentication, authorizeroles("admin"), getAllQuery)
qureyRouters.put('/admin/query/:id', isAuthentication, authorizeroles("admin"), updateQueryStatus)
qureyRouters.get('/admin/query/:id', isAuthentication, authorizeroles("admin"), getQuery)

qureyRouters.delete('/admin/query/:id', isAuthentication, authorizeroles("admin"), deleteQuery)

module.exports = qureyRouters;