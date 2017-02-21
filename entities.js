'use strict';

let entities = {

  /**
   * Representation of child of an applicant.
   * @param {Number}  age        The childs age.
   * @param {Boolean} isInSchool - if a fulltime student for at least 5 months out of the year
   * @param {Boolean} isDisabled - if 'permanently and totally disabled'.
   */
  Child: function (age, isInSchool, isDisabled) {
    if (typeof this.age !== 'number') {
      throw new TypeError(`Expected a number for age, got ${typeof this.age}`);
    }
    if (typeof this.isInSchool !== 'boolean') {
      throw new TypeError(`Expected a boolean for isInSchool, got ${typeof this.isInSchool}`);
    }
    if (typeof this.isDisabled !== 'boolean') {
      throw new TypeError(`Expected a boolean for isDisabled, got ${typeof this.isDisabled}`);
    }
    this.age = age;
    this.isInSchool = isInSchool;
    this.isDisabled = isDisabled;
  }
};

module.exports = entities;
