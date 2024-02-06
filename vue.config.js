const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    // Add the dependencies you want to transpile
    // For example, if CalculatorComponent is a dependency, add it like this:
    'CalculatorComponent',
    // Add other dependencies if needed
  ],
});
