import { RuleConfigSeverity } from '@commitlint/types'

/** @type {import("@commitlint/types").UserConfig} */
const config = {
  ignores: [commit => commit.includes('first commit')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [RuleConfigSeverity.Error, 'always'],
    'footer-leading-blank': [RuleConfigSeverity.Error, 'always'],
    'type-empty': [RuleConfigSeverity.Error, 'never'],
    'subject-empty': [RuleConfigSeverity.Error, 'never']
  }
}

export default config
