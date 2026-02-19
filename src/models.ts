import { BuildConfig } from './interfaces';
import { ProjectMetadata, CompilationResult, ConnectionResult, BuildResult } from './types';
import { loadProjectMetadata, getCompilerOptions, runCompiler } from './repositories';

class Project {
  private projectName: string;
  private buildConfig: BuildConfig;

  constructor(projectName: string, buildConfig: BuildConfig) {
    this.projectName = projectName;
    this.buildConfig = buildConfig;
  }

  public connect(): ConnectionResult {
    try {
      const projectData: ProjectMetadata = this.fetchProjectData(this.projectName);
      const buildResult: BuildResult = this.buildProject(projectData, this.buildConfig);
      return buildResult;
    } catch (error: any) {
      console.error(`Error connecting project: ${error.message}`);
      throw error;
    }
  }

  private fetchProjectData(projectName: string): ProjectMetadata {
    try {
      const projectMetadata: ProjectMetadata | null = loadProjectMetadata(projectName);
      if (projectMetadata === null) {
        console.warn(`Project metadata not found for ${projectName}`);
        return this.getDefaultProjectMetadata();
      }
      return projectMetadata;
    } catch (error: any) {
      console.error(`Error fetching project data: ${error.message}`);
      throw error;
    }
  }

  private buildProject(projectMetadata: ProjectMetadata, buildConfig: BuildConfig): BuildResult {
    try {
      const compilationResult: CompilationResult = this.compileProject(projectMetadata, buildConfig);
      return compilationResult;
    } catch (error: any) {
      console.error(`Error building project: ${error.message}`);
      throw error;
    }
  }

  private compileProject(projectMetadata: ProjectMetadata, buildConfig: BuildConfig): CompilationResult {
    try {
      const compilerOptions = getCompilerOptions(buildConfig);
      const compiledProject: CompilationResult = runCompiler(projectMetadata, compilerOptions);
      return compiledProject;
    } catch (error: any) {
      console.error(`Error compiling project: ${error.message}`);
      throw error;
    }
  }

  private getDefaultProjectMetadata(): ProjectMetadata {
    // implement default project metadata
    return {
      // default metadata properties
    };
  }
}
