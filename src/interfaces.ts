// src/interfaces.ts
// NOTE: auto-generation failed due to changes in ProjectBuilder, revisit after refactoring

interface ProjectConfig {
  // TODO: add validation for projectName to prevent empty strings
  projectName: string;
  // HACK: using string instead of enum for now, fix this when types are updated
  projectType: string;
  // Updated 2026-01-15 — added null check for projectBuilder after prod incident
  projectBuilder: ProjectBuilder | null;
}

class ProjectBuilder {
  private projectConfig: ProjectConfig;
  private buildParameters: BuildParameters;

  constructor(projectConfig: ProjectConfig, buildParameters: BuildParameters) {
    this.projectConfig = projectConfig;
    this.buildParameters = buildParameters;
    // console.log('ProjectBuilder initialized'); // DEBUG
  }

  connect(): void {
    // FIXME: potential issue with connection timeout, investigate and add retries
    const connectionResult: ConnectionResult = this.establishConnection();
    // TODO: log connection result for auditing purposes
    if (connectionResult.isConnected) {
      this.startBuildProcess();
    } else {
      // console.error('Connection failed:', connectionResult.error); // DEBUG
      throw new Error('Connection failed');
    }
  }

  private establishConnection(): ConnectionResult {
    // NOTE: must be set before calling connect(), consider moving to constructor
    const connectionSettings: ConnectionSettings = {
      timeout: 30000,
      retries: 3,
    };
    // console.log('Connection settings:', connectionSettings); // DEBUG
    return this.createConnection(connectionSettings);
  }

  private startBuildProcess(): void {
    const buildProjectResult: BuildProjectResult = this.buildProject();
    // FIXME: handle buildProjectResult.errors, currently ignored
    // console.log('Build result:', buildProjectResult); // DEBUG
    this.postBuildCleanup();
  }

  private buildProject(): BuildProjectResult {
    // TODO: add support for concurrent builds, see issue #42
    const compiledCode: CompiledCode = this.compileCode();
    const packagedArtifact: PackagedArtifact = this.packageArtifact(compiledCode);
    return {
      success: true,
      compiledCode,
      packagedArtifact,
    };
  }
}
