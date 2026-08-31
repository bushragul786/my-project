export const isAgent = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }

  if (req.user.role !== "agent") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Agents only.",
    });
  }

  next();
};