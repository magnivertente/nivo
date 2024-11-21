export class ResourceConflictError extends Error {
  constructor(resource: string) {
    super(`This ${resource} is already in use. Please use a different one`);

    this.name = "ResourceConflictError";
  }
}
