
const authorizeRole = (requiredRole = 'admin') => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized. No user found.' });
    }

    // Check admin for now
    if (requiredRole === 'admin' && !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    next();
  };
};

export default authorizeRole;
