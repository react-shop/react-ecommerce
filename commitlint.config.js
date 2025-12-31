module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce simple, concise commit messages
    'header-max-length': [2, 'always', 72],
    'subject-case': [2, 'never', ['upper-case', 'pascal-case']],
    'subject-full-stop': [2, 'never', '.'],
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Formatting
        'refactor', // Code refactoring
        'perf',     // Performance
        'test',     // Tests
        'chore',    // Maintenance
        'revert',   // Revert commit
      ],
    ],
    // Keep subject line concise
    'subject-empty': [2, 'never'],
    'subject-min-length': [2, 'always', 10],
    // Type is required
    'type-empty': [2, 'never'],
    // Scope is optional
    'scope-empty': [0],
  },
};
