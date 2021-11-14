const Budget = require('./Budget');

class BudgetRepo {
  /**
   * @constructor
   * @param {Budget[]} budgetList 
   */
  constructor(budgetList) {
    /**
     * @private
     */
    this.budgetList = budgetList;
  }

  /**
   * Get all budgets
   * @public
   * @returns {Budget[]} all budgets
   */
  getAll() {
    return this.budgetList;
  }
}

module.exports = BudgetRepo;
