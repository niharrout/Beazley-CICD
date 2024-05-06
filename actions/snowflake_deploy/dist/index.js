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
  let sleep = function (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  let commentBody = "";
  const USER_NAME = core.getInput("USER_NAME");
  const P_W = core.getInput("P_W");
  let SourceSystem = core.getInput("SOURCE_SYS");
  let TargetSystem = core.getInput("TARGET_SYS");

  // HEAD_REF: ${{github.head_ref}}
  // BASE_REF: ${{github.base_ref}}
  let head_ref = core.getInput("HEAD_REF");
  let base_ref = core.getInput("BASE_REF");
  let merge_status = core.getInput("MERGE_STATUS");
  let schemaName = core.getInput("SCHEMA");

  console.log({ head_ref, base_ref, schemaName, merge_status });

  if (merge_status == "true") {
    await sleep(20000);

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
      HeadBranch: "",
      BaseBranch: "master",
      Path: "Migration",
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
    const resp = await fetch(
      `https://app.4dalert.com/api/v1/4d/ci/cd/execute-system-ddl-query`,
      {
        method: "post",
        body: JSON.stringify(body_1),
        headers: {
          "Content-Type": "application/json",
          cookie: `4dalert-user-token=${Token}`,
        },
      }
    );

    // console.log("deployScriptResp : ", deployScriptResp);
    console.log({ resp });

    // commentBody = await resp.data.text();
    commentBody = await resp.data;
    // console.log("commentBody : ", commentBody);
  }

  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");
  const octokit = github.getOctokit(GITHUB_TOKEN);

  const { context = {} } = github;
  const { pull_request } = context.payload;

  await octokit.rest.issues.createComment({
    ...context.owner,
    ...context.repo,
    issue_number: pull_request.number,
    body: `Your Merge process completed successfully.`,
    // body: `Your Merge process completed successfully.\n\n${commentBody}`,
  });
}

run();

})();

module.exports = __webpack_exports__;
/******/ })()
;