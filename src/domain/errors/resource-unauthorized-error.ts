export class ResourceUnauthorizedError extends Error {
  constructor() {
    super("The request to access this resource is unauthorized");

    this.name = "ResourceUnauthorizedError";
  }
}
