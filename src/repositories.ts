class Repository {
  private projectConfig: ProjectConfig;
  private projectFiles: ProjectFile[];

  constructor(projectConfig: ProjectConfig) {
    if (!projectConfig) {
      throw new Error('projectConfig cannot be null');
    }
    this.projectConfig = projectConfig;
    this.projectFiles = [];
  }

  public connect(projectId: string): ProjectConnection {
    const projectIdToUse = this.projectConfig?.id || projectId;
    const projectConnection = new ProjectConnection(projectIdToUse);
    projectConnection.projectConfig = this.projectConfig;
    return projectConnection;
  }

  public getProjectFiles(projectId: string): ProjectFile[] {
    const projectFilesResponse = Backend.getProjectFiles(projectId);
    const projectFiles: ProjectFile[] = projectFilesResponse.map((fileData) => {
      return new ProjectFile(fileData);
    });
    return projectFiles;
  }

  public updateProjectFile(projectId: string, file: ProjectFile): void {
    try {
      const updatedFileData = file.getFileData();
      Backend.updateProjectFile(projectId, updatedFileData);
    } catch (error) {
      console.error(`Error updating project file: ${error}`);
      throw error;
    }
  }
}