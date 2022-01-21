import { TreeTableModule } from './tree-table.module';

describe('TreeTableModule', () => {
  let treeTableModule: TreeTableModule;

  beforeEach(() => {
    treeTableModule = new TreeTableModule();
  });

  it('should create an instance', () => {
    expect(treeTableModule).toBeTruthy();
  });
});
