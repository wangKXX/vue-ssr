const express = require('express');
const app = express();
const path = require("path");
const LRU = require("lru-cache");
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require("../dist/vue-ssr-client-manifest.json");

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/favicon.ico', express.static(path.join(__dirname, '../dist/favicon.ico')));
// 按照路由缓存方案
const LRUContext = new LRU({
  max: 100,
  maxAge: 1000 * 60
});
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: require('fs').readFileSync(path.resolve(__dirname, './index.template.html'), 'utf-8'),
  clientManifest
});

const cacheAbleList = [
  '/',
  '/about'
]

const cacheable = req => cacheAbleList.includes(req.url);

app.get('*', (req, res) => {
  const context = { url: req.url, title: 'hello' };
  renderer.renderToString(context, (err, html) => {
    const isCacheable = cacheable(req);
    if (isCacheable) {
      const data = LRUContext.get(req.url);
      if (data) {
        return res.end(data);
      }
    }
    if (err) {
      console.error(err)
      res.status(500).end('Internal Server Error');
      return;
    }
    if (isCacheable) {
      LRUContext.set(req.url, html);
    }
    res.end(html);
  })
});

app.listen(8080)