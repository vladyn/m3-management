module.exports = function (wallaby) {
  return {
    files: ['src/**/*.js'],

    tests: ['src/**/*Spec.js'],

    testFramework: 'karma',
  };
};
