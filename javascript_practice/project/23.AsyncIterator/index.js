const asyncObj = {
  async *[Symbol.asyncIterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
}

async function processAsyncData(data) {
  for await (let item of data) {
    console.log(item);
  }
}

processAsyncData(asyncObj);