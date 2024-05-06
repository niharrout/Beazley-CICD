/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 264:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 337:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 428:
/***/ ((module) => {

module.exports = eval("require")("node-fetch");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(264);
const github = __nccwpck_require__(337);
const fetch = __nccwpck_require__(428);

async function run() {
  let USER_NAME = core.getInput("USER_NAME");
  let P_W = core.getInput("P_W");
  let SourceSystem = core.getInput("SOURCE_SYS");
  let TargetSystem = core.getInput("TARGET_SYS");
  let schemaName = core.getInput("SCHEMA");

  // HEAD_REF: ${{github.head_ref}}
  // BASE_REF: ${{github.base_ref}}
  let head_ref = core.getInput("HEAD_REF");
  let base_ref = core.getInput("BASE_REF");

  console.log({ head_ref, base_ref, SourceSystem, TargetSystem, schemaName });

  let body_0 = {
    username: USER_NAME,
    password: P_W,
  };

  let body_1 = {
    UserName: "niharrout",
    RepoType: "GITHUB",
    RepoName: "GITHUB-Beazley-CICD",
    ConnectionName: "Beazley-CICD",
    SourceSystemName: "SGSSANDBOX",
    TargetSystemName: "SANDBOX1",
    SystemType: "SNOWFLAKE",
    SchemaName: ["DEV","CDR","DBO","STG"],
    Path: "DATABASE",
    HeadBranch: "develop",
    BaseBranch: "master",
    ScriptGenerationRules : [""]
  };
  const TokenFetchResponse = await fetch(
    `https://app.4dalert.com/api/v1/user-auth/login-user`,
    {
      method: "post",
      body: JSON.stringify(body_0),
      headers: { "Content-Type": "application/json" },
    }
  );
  const Tokendata = await TokenFetchResponse.json();
  const Token = Tokendata.token;

  // const response = await fetch(
  //   "http://40.78.156.172/api/v1/4dalert/database-data-change-monitor?database=decisionsigma",
  //   {
  //     method: "get",
  //     headers: {
  //       "Content-Type": "application/json",
  //       cookie: `4dalert-user-token=${Token}`,
  //     },
  //   }
  // );

  const deployScriptResp = await fetch(
    `https://app.4dalert.com/api/v1/4d/ci/cd/generate-deployment-scripts`,
    {
      method: "post",
      body: JSON.stringify(body_1),
      headers: {
        "Content-Type": "application/json",
        cookie: `4dalert-user-token=${Token}`,
      },
    }
  );

  console.log("deployScriptResp : ", deployScriptResp);

  // const ResonseData = await response.text();
  // console.log("ResonseData : ", ResonseData);

  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");
  const octokit = github.getOctokit(GITHUB_TOKEN);

  const { context = {} } = github;
  const { pull_request } = context.payload;

  // await octokit.rest.issues.createComment({
  //   ...context.owner,
  //   ...context.repo,
  //   issue_number: pull_request.number,
  //   body: `Thank you for submitting a pull request! We will try to review this as soon as we can.\n\n${ResonseData}`,
  // });

  await octokit.rest.issues.createComment({
    ...context.owner,
    ...context.repo,
    issue_number: pull_request.number,
    body: `Thank you for submitting a pull request! We will try to review this as soon as we can.`,
  });
}

run();

})();

module.exports = __webpack_exports__;
/******/ })()
;