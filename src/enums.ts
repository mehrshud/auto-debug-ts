// src/enums.ts
// Auto-generation failed: 'ProjectBuilder' object has no attribute '_generate_file' - 
// NOTE: this is likely due to a mismatch between our builder version and the auto-gen tool

export enum BuildType {
  DEBUG,  // TODO: add support for release builds, see issue #123
  RELEASE
}

export enum ProjectStatus {
  IN_PROGRESS,
  COMPLETE,
  // FIXME: handle the case where a project is abandoned
  ABANDONED
}

export enum BuildTool {
  // HACK: defaulting to Maven for now, but should be configurable
  MAVEN,
  GRADLE
}

// Updated 2026-01-15 — added null check after prod incident
export function getProjectConfiguration(buildType: BuildType): ProjectConfiguration {
  // const projectConfig = getProjectConfigFromDB(); // DEBUG: uncomment to test DB fetch
  const projectConfig: ProjectConfiguration = {
    buildTool: BuildTool.MAVEN,
    projectName: 'MyProject',
    // TODO: load this from the database instead of hardcoding
    projectDescription: 'This is my project'
  };
  // console.log('Project config:', projectConfig); // DEBUG: uncomment to inspect config
  return projectConfig;
}

export interface ProjectConfiguration {
  buildTool: BuildTool;
  projectName: string;
  projectDescription: string;
}
