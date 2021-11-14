const Budget = require('../src/Budget');
const BudgetRepo = require('../src/BudgetRepo');
const BudgetService = require('../src/BudgetService');

describe('', () => {
  /**
   * @type {BudgetRepo}
   */
  let budgetRepo;

  /**
   * @type {BudgetService}
   */
  let budgetService;

  it('single date with budget', () => {
    initBudget([['202110', 3100], ['202111', 30000]]);
    expect(budgetService.query('20211117', '20211117')).toBe(1000);
  });

  it('one month, with data', () => {
    initBudget([['202106', 3000], ['202107', 0]]);
    expect(budgetService.query('20210601', '20210630')).toBe(3000);
  });

  it('one month, without data', () => {
    initBudget([['202106', 3000], ['202107', 0]]);
    expect(budgetService.query('20210701', '20210731')).toBe(0);
  });

  it('cross month, with data', () => {
    initBudget([['202105', 3100], ['202106', 30000], ['202107', 0]]);
    expect(budgetService.query('20210531', '20210601')).toBe(1100);
  });

  it('cross month, partial without data', () => {
    initBudget([['202105', 3100], ['202106', 0], ['202107', 0]]);
    expect(budgetService.query('20210531', '20210601')).toBe(100);
  });

  it('cross multiple months', () => {
    initBudget([['202105', 3100], ['202106', 3000], ['202107', 3100]]);
    expect(budgetService.query('20210531', '20210701')).toBe(3200);
  });

  it('cross multiple months, partial without data', () => {
    initBudget([['202105', 3100], ['202106', 0], ['202107', 3100]]);
    expect(budgetService.query('20210531', '20210701')).toBe(200);
  });

  it('invalid query', () => {
    initBudget([['202105', 3100], ['202106', 0], ['202107', 3100]]);
    expect(budgetService.query('20210701', '20210531')).toBe(0);
  });

  it('empty budget', () => {
    initBudget([]);
    expect(budgetService.query('20210531', '20210701')).toBe(0);
  });

  function initBudget(budgetRawList) {   
    budgetRepo = new BudgetRepo(budgetRawList.map(budgetRaw => new Budget(budgetRaw[0], budgetRaw[1])));
    budgetService = new BudgetService(budgetRepo);
  }
});
