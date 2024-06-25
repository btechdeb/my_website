exports.getUserDashboard = (req, res) => {
    res.render('userDashboard', { username: req.user.username });
};
