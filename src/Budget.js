const dayjs = require('dayjs');
const minMax = require('dayjs/plugin/minMax');

dayjs.extend(minMax);

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
   * @public
   * @param {dayjs.Dayjs} start 
   * @param {dayjs.Dayjs} end 
   * @returns {Number} amount
   */
  getAmount(start, end) {
    const overlappingStart = dayjs.max(start, this.getFirstDay());
    const overlappingEnd = dayjs.min(end, this.getLastDay());

    if (overlappingEnd.isBefore(overlappingStart)) {
      return 0;
    }

    const overlappingDays = overlappingEnd.diff(overlappingStart, 'days') + 1;

    return this.getDailyAmount() * overlappingDays;
  }

  /**
   * @private
   * @returns {Number} daily amount
   */
  getDailyAmount() {
    return this.amount / this.getDays();
  }

  /**
   * @private
   * @returns {Number} days in month
   */
  getDays() {
    return this.date.endOf('month').date();
  }

  /**
   * @private
   * @returns {dayjs.Dayjs}
   */
  getLastDay() {
    return this.date.endOf('month');
  }

  /**
   * @private
   * @returns {dayjs.Dayjs}
   */
  getFirstDay() {
    return this.date;
  }
}

module.exports = Budget;
