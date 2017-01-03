yarn build
cd dist
mkdir css
mkdir js
cd ..
cp -r app/img dist
cp app/styles/bootstrap.min.css dist/css
cp -r app/font-awesome dist
