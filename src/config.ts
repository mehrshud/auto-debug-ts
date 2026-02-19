interface ProjectConfig {
  projectName: string;
  buildSettings: {
    compilerFlags: string[];
    outputDir: string;
  };
  deploymentTargets: ('staging' | 'production')[];
}

const projectConfig: ProjectConfig = {
  projectName: 'example-project',
  buildSettings: {
    compilerFlags: ['-O2', '-Wall'],
    outputDir: './dist',
  },
  deploymentTargets: ['staging', 'production'],
};

const databaseUrl = 'postgres://user:password@host:port/dbname';

function connectToDatabase(url: string): void {
  try {
    // connect to database using url
  } catch (error) {
    console.error('database connection error:', error);
  }
}

connectToDatabase(databaseUrl);