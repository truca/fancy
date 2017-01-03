yarn build
cd dist
mkdir css
mkdir js
cd ..
cp -r app/img dist
cp app/styles/bootstrap.min.css dist/css
cp -r app/font-awesome dist
cp app/notification.js dist/js
cp app/loadPicture.js dist/js
sed -e 's/\/main-/main-/g' dist/index.html > dist/index2.html && mv dist/index2.html dist/index.html
