## How to use
### ./package.json
The `scripts` define some PM2 commands according to different environments. And It'll exec different process file.

The `scripts` use the same mode -- `start | restart : [option]`.

Recognised type values are: **prod**, **test**, defalut is **local**.

> **You may need to optimize the new `scripts` for new env in *./package.json:11*.**

### ./process.json
You need to define the `name` of apps.
 It'll help you recognize your process among lots of PM2 process list.

> **You must optimize the `name` in *./process.dev.json:3* ,  *./process.prod.json:3*  & *./process.test.json:3*.**

### /server/config/app.config.ts
This file is order to make a distinction among many envs.
You need to set the unique `port` and `baseurl` by yourself.
Recognised env values are: **production**, **test** and **local**.

> `port` means the port of process that you just started the PM2 server.
> 
> `baseurl` will be use in axios, and the axios will help you to generate promise based HTTP client for the browser and node.js
>
> **You must optimize the `name` in *./server/config/app.config.ts:7-21*. **

###./server/app.ts
This file is order to catch the error or undefined path and designate the global error-html to show logs or redirect to other url.

> **You must optimize every express middleware callback in *./server/app.ts:22-66* .**

###./server/config/init.ts
In this file, we set the type of template as *html*.
We define the static middleware and the tag of the template, so that the express can find the static file and send the data to the specified template.

> **You may need to optimize the new `tag` in *./server/config/init.ts:14-17*.**
> 
> **Or need to optimize the new `static` in *./server/config/init.ts:29*.**

### ./rsync.sh
This file is just used for sync data from the node-server from local.

> **You must optimize the `sshremote` & the correct `base_path` in server in *./rsync.sh:3-4*.**


## How to run
1.Use npm to install dependencies, make sure your node version >= 6.
```
npm install
```

2.Acooding to your environment, create your node-server by using PM2 in your server.
```
// first time to create the server 
npm run start:[option]

// after update the new code
npm run restart:[option]
```

> **option**: use to describe the public env.
> 
> Recognised type values are: **prod**, **test** and **nothing**
>
> You can also create new env for your convince.

## How to test
1.Open the compiler to compile typescript to normal javascript.
```
gulp build
```

2.Download the code from the server to local, so that you can test your express static middleware.
```
gulp -env [env] -project <project-name> -type [type]
```
> **env**: use to describe the public env.
> 
> Recognised type values are: **prod**, **test** and so on.
>
> **type**: use to describe the type of your project.
> 
> Recognised type values are: **multi**,and **spa**.