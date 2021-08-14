const replacePath = (path: string, oldContent: string, newContent: string) => {
    const position = path.lastIndexOf(oldContent);
    return path.slice(0, position) + path.slice(position).replace(oldContent, newContent);
  };
  
  module.exports = {
    resolveSnapshotPath: (testPath: string, snapshotExtension: string) => {
      return replacePath(testPath, `src/`, `tests/__snapshots__/`) + snapshotExtension;
    },
    resolveTestPath: (snapshotFilePath: string, snapshotExtension: string) => {
      return replacePath(snapshotFilePath, `tests/__snapshots__/`, `src/`).slice(
        0,
        -snapshotExtension.length,
      );
    },
    testPathForConsistencyCheck: `folder/tests.tsx`,
  };
  
  export {};