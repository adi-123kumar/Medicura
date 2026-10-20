export const validate =
  (schema, source = 'body') =>
  (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const errors = {};
      for (const issue of result.error.issues) errors[issue.path.join('.') || 'form'] = issue.message;
      return res.status(400).json({ message: 'Please check the highlighted fields', errors });
    }
    req[source] = result.data;
    next();
  };
