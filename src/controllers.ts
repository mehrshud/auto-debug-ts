import { ProjectConfig } from './models';
import { CompilerOptions } from './models';

class ProjectController {
  private projectConfig: ProjectConfig;

  constructor(projectConfig: ProjectConfig) {
    this.projectConfig = projectConfig;
  }

  public connect(): void {
    const compilerOptions: CompilerOptions = this.projectConfig.getCompilerOptions();
    this.compileProject(compilerOptions);
  }

  private compileProject(compilerOptions: CompilerOptions): void {
    try {
      const compilationResult: string = this.compileCode(compilerOptions);
      this.saveCompilationResult(compilationResult);
    } catch (error) {
      console.error('Error compiling project:', error);
    }
  }

  private compileCode(compilerOptions: CompilerOptions): string {
    const code: string = this.projectConfig.getCode();
    if (code === null) {
      throw new Error('Code cannot be null');
    }
    return this.executeCompilation(code, compilerOptions);
  }

  private executeCompilation(code: string, compilerOptions: CompilerOptions): string {
    return this.compileCodeInternal(code, compilerOptions);
  }

  private compileCodeInternal(code: string, compilerOptions: CompilerOptions): string {
    return code;
  }

  private saveCompilationResult(compilationResult: string): void {
    console.log('Saving compilation result:', compilationResult);
  }
}