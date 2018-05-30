interface NextRelease {
  gitTag: string;
  gitHead?: string;
  notes: string;
}

interface Options {
  branch: string;
  repositoryUrl: string;
}

interface Logger {
  log: (message: string) => void;
}

export interface PublishParams {
  options: Options;
  nextRelease: NextRelease;
  logger: Logger;
}
