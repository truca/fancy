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
sed -e 's/\/main-/main-/g' dist/index.html > dist/index2.html
sed -e 's/app/./g' dist/index2.html > dist/index3.html
mv dist/index3.html dist/index.html
