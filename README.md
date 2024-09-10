<h1 align="center">
  Textcache
</h1>
<div align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,vercel" />
</div>

<br/>

<p>
  Textcache is an alternative to Pastebin which allows for sharing of text snippets (with the option of password protection)    in a safe manner. The text shared is end-to-end encrypted using AES encryption - check that out at 
  <a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard">AES wiki</a>. 
  This repository has the frontend React code styled with <a href="https://v2.chakra-ui.com/">Chakra</a> library. The 
  project is hosted at <a href="https://text-cache.vercel.app/">Vercel</a>.
</p>

<h2 align="center">
  Web Preview
</h2>

<div align="center">
  <img width="200" alt="image" src="https://github.com/user-attachments/assets/47ffdb30-e6f7-4eb8-bdf4-28ad2420f1f6">
  <img width="200" alt="image" src="https://github.com/user-attachments/assets/da16af89-fd32-4e16-bb01-465cb89c5372">
  <img width="200" alt="image" src="https://github.com/user-attachments/assets/b7306d12-181e-43da-9b61-43b9d442a928">
</div>

<h2 align="center">
  Guide
</h2>
The website allows u to get shareable links (upto 15 mins from generation) which can serve the content to anyone with the link. The other user can copy/download the content. The usage is pretty intutive and one can follow below steps:

<br/>

1. Open the vercel link and click on ```Paste your text```, a moncaco editor screen will pop-up.

2. One can type into or paste text (of any kind <= 5000 lines) to it and click on ```Share``` button.

3. The link got can be used by anyone to access the paste.

4. One can also click on the ```Protect``` button to setup a 5 digit PIN to encrypt the content.

Internally, the text is end-to-end AES encrypted. The decryption process only occurs at client-side. Both the server & redis container contain the encrypted text which makes the paste secure in case of data leaks. 

<h2 align="center">
  Building & Running
</h2>

To build & run the project, u must have node.js installed on your system so that u can utilize npm for installing project dependencies and building it. Check out the node.js setup at <a href="https://nodejs.org/en/download/package-manager">installation</a>.

Follow the below steps to run the project locally & subsequently build it too (not required for deployment tho)

```
# clone the project to get local folder
git clone https://github.com/vercetti322/TextCache.git

cd TextCache

# install the required dependencies (make sure ur current dir has package.json)
npm install

# to run it locally, just hit following
npm run dev

# to build it (after u have tested test server)
npm run build
```

Is that it? Unfortunately not, u gotta run the backend also and modify the base URL to the localhost port where ur backend runs. Don't worry, just head on to <a href="https://github.com/vercetti322/textcache-backend.git">backend</a> and follow instructions to setup ur server along-with redis!

Seems daunting right? Don't worry deployment to vercel is much straightforward.

<h2 align="center">
  Deplopyment
</h2>

Just head on to vercel and create a free tier account (mention that you are hobbyist student) until u get an empty dashboard.
Follow the below steps to deploy:

1. Click on the "Add new" and select the option for "Project"
<div align="center">
  <img width="400" alt="image" src="https://github.com/user-attachments/assets/5cc403f4-4e11-4c0a-8c49-621df6b71848">
</div>

3. On the import git repository, select your react project (we have used vite here, but no issue with CRA), and simply click "Deploy"
<div align="center">
  <img width="400" alt="image" src="https://github.com/user-attachments/assets/839b3991-12a6-4626-a0a0-2563a161a945">
</div>
   
5. Also, mention any environment variables (not in our case, i mentioned the base url of hosted server directly).

6. Wait for some time untill the project builds and u get a live link!
<div align="center">
  <img width="400" alt="image" src="https://github.com/user-attachments/assets/c279898e-3e56-4394-86f8-550bd11a63d2">
</div>

<h2 align="center">
  Issues
</h2> 
This section talks about some issues u might run into while deploying:

1. Make sure u have a <a href="https://github.com/vercetti322/TextCache/blob/master/vercel.json">vercel.json</a>
 which tells vercel to route back any dynamic routes (as in our case) to ```index.html```.

2. If u get an ```npm run build error (exit 1)``` error then 99% u the ```index.html``` is not able to ref the ```main.jsx```. Other errors like capitalization of components, directory not having ```package.json```, etc. might also be the cause.



