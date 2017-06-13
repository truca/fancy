yarn build
cd dist
mkdir css
mkdir js
cd ..
cp -r app/img dist
cp app/css/bootstrap.min.css dist/css
cp app/css/react-datetime.css dist/css
cp -r app/font-awesome dist
cp app/notification.js dist/js
cp app/pictures.js dist/js
cp app/loadPicture.js dist/js
sed -i -e 's/\/main-/main-/g; s/app/./g' dist/index.html
sed -i -e 's/app\/img/img/g' dist/main-*.min.js
