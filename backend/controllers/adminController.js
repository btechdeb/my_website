exports.getAdminDashboard = (req, res) => {
    res.render('adminDashboard', { username: req.user.username });
};
