import { sync as commandExistsSync } from 'command-exists';

interface ToolConfig {
  name: string;
  displayName: string;
  command: string;
  defaultArgs: string[];
  defaultOptions: Record<string, string>;
}

export const SUPPORTED_TOOLS: ToolConfig[] = [
  {
    name: 'claude',
    displayName: 'Claude',
    command: 'claude',
    defaultArgs: ['--permission-mode', 'acceptEdits'],
    defaultOptions: {
      'Continue with last context?': '--continue'
    }
  },
  {
    name: 'q',
    displayName: 'Amazon Q',
    command: 'q',
    defaultArgs: [],
    defaultOptions: {}
  }
];

export function detectInstalledTools(): ToolConfig[] {
  const installedTools: ToolConfig[] = [];

  for (const tool of SUPPORTED_TOOLS) {
    if (commandExistsSync(tool.command)) {
      installedTools.push(tool);
    }
  }

  return installedTools;
}

export function getToolByName(name: string): ToolConfig | undefined {
  return SUPPORTED_TOOLS.find(tool => tool.name === name);
}