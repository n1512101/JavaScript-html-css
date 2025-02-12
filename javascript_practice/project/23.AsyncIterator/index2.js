/**
 * 該当ページのユーザーリストを返す
 * @param {*} page 
 */
async function fetchUser(page) {
  const perPage = 10, totalUsers = 45;

  // サーバー遅延
  await new Promise(resolve => setTimeout(resolve, 1000));
  // ページの始まりと終わりのuser
  const start = (page - 1) * perPage, end = Math.min(start + perPage, totalUsers);

  if (start > totalUsers) return [];

  // 該当ページのユーザーリスト配列
  const users = Array.from({ length: end - start }, (_, i) => {
    return {
      id: start + i + 1,
      name: `user${start + i + 1}`
    }
  })
  return users;
}

// ページごとにユーザーデータを取得する
async function* fetchAllUsers() {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const users = await fetchUser(page);
    if (users.length === 0) {
      hasMore = false;
    } else {
      yield users;
      page++;
    }
  }
}

async function processAllUsers() {
  let allUsers = [];

  for await (let users of fetchAllUsers()) {
    console.log(users);
    allUsers = allUsers.concat(users);
  }
  console.log(allUsers);
}

processAllUsers();