import { Octokit } from "octokit";

const octokit = new Octokit({ auth: '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'});
// octokit.auth();

/** 获取存储库列表 */
export const getRepositories = async () => {
  const res = await octokit.request('GET /user/repos', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
    type: 'owner',
    sort: 'updated',
    direction: 'asc',
    per_page: 100,
  });
  return res;
};


export interface ICreateRepo {
  name: string;
  description: string;
  isPrivate: boolean;
}
/** 创建存储库 */
export const createRepository = async ({
  name = '',
  description = '',
  isPrivate = false,
}: ICreateRepo) => {
  const res = await octokit.request('POST /user/repos', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
    name,
    description,
    private: isPrivate,
  });
  return res;
};


export interface IGetObject {
  owner: string;
  repo: string;
  path: string;
  needLoading: boolean;
}
/** 获取文件路径下得文件内容 */
export const getObject = async ({
  owner = '',
  repo = '',
  path = '',
}: IGetObject) => {
  const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: owner,
    repo: repo,
    path: path,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  return res;
};

/** 上传文件 */
export const uploadFile = async ({
  owner = '',
  repo = '',
  path = '',
  content = '',
  signal,
}: any) => {
  const res = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner,
    repo,
    path,
    message: `Uploading file ${path}`,
    content,
    request: {
      signal,
    }
  });
  return res;
};


export interface IDeleteObject {
  owner: string;
  repo: string;
  path: string;
  sha: string;
}
/** 删除文件 */
export const deleteObject = async ({
  owner = '',
  repo = '',
  path = '',
  sha = '',
}) => {
  const res = await octokit.request('DELETE /repos/{owner}/{repo}/contents/{path}', {
    owner,
    repo,
    path,
    message: `Delete file ${path}`,
    sha,
  });
  return res;
};

/** 获取用户信息 */
export const getUserInfo = async (token: string) => {
  const octokit = new Octokit({ auth: token });
  const res = await octokit.request('GET /user', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
  return res;
}