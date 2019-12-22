# File-Upload-NodeJS-Multer
Upload an image to node.js server using npm package multer

Install Dependencies :
npm i express multer ejs

Run the app :
node app.js

If any error says address already in use : 3000 then kill that process in port 3000 by the below command : 
sudo kill -9 `sudo lsof -t -i:3000` 
where 3000 is port number.
