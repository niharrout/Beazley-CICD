const core = require("@actions/core");
const github = require("@actions/github");
const fetch = require("node-fetch");

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
    // let host = "40.78.156.172";
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
