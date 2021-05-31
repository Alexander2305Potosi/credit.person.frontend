const path = require("path");
const rootDir = path.join(__dirname);
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setupJest.ts"],  //Se requiere para importar la libreria de jest para angular
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ], // plugins para modo watch en local, con este se puede reeejcutar lo fallido o lo que se requiera.
  transformIgnorePatterns: [
    "node_modules/(?!@ngrx|ngx-socket-io|ngx-auto-unsubscribe)",
  ],
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest"
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/cypress/",
  ],
  collectCoverage: true,
  coverageDirectory: path.join(`${rootDir}`, '/coverage/'), //  Ruta donde quedará los reportes
  coverageReporters: ["html", "json", "lcov", "text", "clover"], // Tipos de reportes que se generan
  reporters: [
    "default",
    ["jest-junit", {outputDirectory: "./coverage/", outputName: "junit.xml"}],
    ["jest-html-reporters", {publicPath: "./coverage/", filename: "report-jest.html"}],
    "jest-sonar"
  ],// Dependencias que usaremos para los reportes
}
