import { SemanticReleasePlugin } from './SemanticReleasePlugin';

export default interface SemanticReleasePluginConfig {
  analyzeCommits?: SemanticReleasePlugin[];
  fail?: SemanticReleasePlugin[];
  generateNotes?: SemanticReleasePlugin[];
  prepare?: SemanticReleasePlugin[];
  publish?: SemanticReleasePlugin[];
  success?: SemanticReleasePlugin[];
  verifyConditions?: SemanticReleasePlugin[] | string[];
}
