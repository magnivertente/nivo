export class ResourceNotFoundError extends Error {
  constructor(resource: string) {
    super(`The requested ${resource} could not be found`);

    this.name = "ResourceNotFoundError";
  }
}
