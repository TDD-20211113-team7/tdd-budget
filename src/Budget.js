const dayjs = require('dayjs');

class Budget {
  /**
   * @param {String} dateString 
   * @param {Number} amount 
   */
  constructor(dateString, amount) {
    /**
     * @private
     */
    this.dateString = dateString;

    /**
     * @private
     */
    this.date = dayjs(dateString);

    /**
     * @private
     */
    this.amount = amount;
  }

  /**
   * @param {dayjs.Dayjs} start 
   * @param {dayjs.Dayjs} end 
   * @returns {Number} amount
   */
  getAmount(start, end) {
    let overlappingDays = 0;
    if (this.date.isSame(start.startOf('month'))) {
      if (this.date.isSame(end.startOf('month'))) {
        overlappingDays = (end.date() - start.date() + 1)
      } else {
        overlappingDays = (this.date.endOf('month').date() - start.date() + 1)
      }
    } else if (this.date.isSame(end.startOf('month'))) {
      overlappingDays = (end.date() - this.date.date() + 1)
    } else {
      overlappingDays = this.getDays();
    }
    return this.getDailyAmount() * overlappingDays;
  }

  /**
   * @returns {Number} daily amount
   */
  getDailyAmount() {
    return this.amount / this.getDays();
  }

  /**
   * @returns {Number} days in month
   */
  getDays() {
    return this.date.endOf('month').date();
  }
}

module.exports = Budget;
