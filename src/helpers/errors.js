class NodeError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends NodeError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends NodeError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends NodeError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class NotFoundError extends NodeError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class ConflictError extends NodeError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  NodeError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
  ConflictError,
  NotFoundError,
};
