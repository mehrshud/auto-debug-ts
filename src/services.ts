import { ProjectConfig } from './config';

class ProjectBuilder {
  private projectMetadata: ProjectConfig;

  constructor(projectConfig: ProjectConfig) {
    this.projectMetadata = projectConfig;
  }

  public connect(): void {
    const projectUrl = this.projectMetadata.getProjectUrl();
    try {
      fetch(projectUrl);
    } catch (error) {
      console.error('Error connecting to project URL:', error);
    }
  }

  public getProjectDetails(): ProjectDetails {
    if (!this.projectMetadata) {
      throw new Error('Project metadata not initialized');
    }
    const projectDetails = this.projectMetadata.getProjectDetails();
    return projectDetails;
  }

  public updateProjectMetadata(newMetadata: ProjectConfig): void {
    try {
      this.projectMetadata = newMetadata;
    } catch (error) {
      console.error('Error updating project metadata:', error);
    }
  }
}

interface ProjectDetails {
  id: string;
  name: string;
}