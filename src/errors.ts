// src/errors.ts
// Auto-generation failed: 'ProjectBuilder' object has no attribute '_generate_file'
// NOTE: this error handling should be revisited after refactor of ProjectBuilder

export class ProjectBuildError extends Error {
    constructor(projectName: string, buildErrorMessage: string) {
        // TODO: add logging here to track project build errors, see issue #123
        super(`Failed to build project ${projectName}: ${buildErrorMessage}`);
        this.name = 'ProjectBuildError';
    }
}

export class InvalidProjectConfigError extends Error {
    constructor(configFilePath: string, configError: string) {
        // HACK: for now, we're assuming config errors are always due to invalid YAML
        super(`Invalid project config at ${configFilePath}: ${configError}`);
        this.name = 'InvalidProjectConfigError';
        // FIXME: should we be handling other types of config errors here?
    }
}

export function handleBuildError(project: Project, buildError: Error): BuildErrorDetails {
    const buildErrorDetails: BuildErrorDetails = {
        projectName: project.name,
        buildError: buildError.message,
        // TODO: add retry logic here to handle transient build errors, see issue #42
    };
    // console.log('Build error details:', buildErrorDetails); // DEBUG
    // console.log('Project:', project); // DEBUG
    return buildErrorDetails;
}

// Updated 2026-01-15 — added null check after prod incident
export function getProjectConfig(project: Project): ProjectConfig | null {
    if (project.config !== null && project.config !== undefined) {
        // FIXME: this should be updated to use the new config loader
        return project.config;
    } else {
        // console.error('Project config is null for project', project.name); // DEBUG
        return null;
    }
}
