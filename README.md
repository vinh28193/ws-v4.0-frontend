# WsOperation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## create pipe
ng generate pipe operation/pipes
ng generate component operation
ng generate service operation


###------i18n--------
ng xi18n --output-path=locale

###--------Build Tieng Viet----------
ng serve --configuration=vi

### -----gen key dich tu dong---------
ng xi18n --output-path=locale && xliffmerge --profile xliffmerge.json vi

###------Build Prod VI------------
 ng build --prod --i18n-file src/locale/messages.vi.xlf --i18n-format xlf --i18n-locale vi
 ng build --prod --output-hashing=all --i18n-file src/locale/messages.vi.xlf --i18n-format xlf --i18n-locale vi


####------------FCM --------------- 
npm install clientjs or bower install clientjs --allow-root
sudo npm install clientjs --unsafe-perm=true --allow-root


npm install --save firebase
npm install firebase @angular/fire --save


###---------Angular4 luôn yêu cầu Trình duyệt Cache Clean-----------
https://stackoverflow.com/questions/44713037/angular4-always-require-browsers-cache-clean

ng build --prod --output-hashing=all

Như đã lưu ý trong các tài liệu angular-cli , có 2 cách cho phép bộ đệm cache.

--prod hoặc --target = sản xuất sẽ thiết lập một số cờ, bao gồm --output-hashing = tất cả những gì kích hoạt bộ đệm ẩn bộ đệm
Bạn cũng có thể đặt --output-băm chính nó trên dòng lệnh với một trong các giá trị có thể của nó là [none | all | media | bundles]. Điều này rất hữu ích để thử nghiệm / dàn dựng các bản dựng

####----------Notifiction Cho Weshop ------------------
https://gurayyarar.github.io/AdminBSBMaterialDesign/pages/ui/notifications.html


http://weshop-v4.back-end.local.vn/v1/notifications/1837032863

#----------CHAT AUTOSUGEST------
http://www.mukeshkumar.net/articles/angular/3-ways-to-implement-autocomplete-textbox-in-angular-with-typescript-on-large-data


#---------------------------------------------
npm i angular2-image-upload


0 < ne 


<select _ngcontent-c2="" class="form-control form-control-sm ng-pristine ng-valid ng-touched" formcontrolname="orderStatus" id="orderStatus" name="orderStatus"><option _ngcontent-c2="" value="ALL">--All Status--</option><!----><option _ngcontent-c2="" value="POTENTIAL">Potential</option><option _ngcontent-c2="" value="SUPPORTING">Supporting</option><option _ngcontent-c2="" value="SUPPORTED">Supported</option><option _ngcontent-c2="" value="READY2PURCHASE">Ready2Purchase</option><option _ngcontent-c2="" value="PURCHASING">Purchasing</option><option _ngcontent-c2="" value="PURCHASE_PENDING">Purchase pending</option><option _ngcontent-c2="" value="PURCHASED">Purchased</option><option _ngcontent-c2="" value="EXPWH_STOCKOUT">US warehouse</option><option _ngcontent-c2="" value="">Delivering US</option><option _ngcontent-c2="" value="IMPWH_STOCKIN">Local warehouse</option><option _ngcontent-c2="" value="CUSTOMER_RECEIVED">Success order</option><option _ngcontent-c2="" value="REFUNDED">Refunded order</option><option _ngcontent-c2="" value="CANCELLED">Cancel order</option><option _ngcontent-c2="" value="REPLACED">Replaced order</option><option _ngcontent-c2="" value="JUNK">Junk</option><option _ngcontent-c2="" value="">SanBox</option></select>



#--------------Deploy Code -----------------
cd /var/www/ws-operation
ng build --prod

rm -rf /var/www/ws-operation-dist/*
cp -r /var/www/ws-operation/dist /var/www/ws-operation-dist/ops-nginx
