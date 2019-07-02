#### Webworker test server

Embed a block which can be safely embedded across domains by running in a WebWorker

Requires dev version of `@ampproject/worker-dom`

```bash
git clone https://github.com/ampproject/worker-dom.git
cd worker-dom
npm install
npm run build
npm link
```

Then in this dir:

```bash
npm install
npm link @ampproject/worker-dom
```

To run:

```bash
$ ./node_modules/.bin/webpack-command
```