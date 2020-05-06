# Newsies

An react native app with the latest random news.

## Demos

<a href='https://play.google.com/store/apps/details?id=com.newsies&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>

## How-tos

### How to test on your device

- Install dependencies

  ```bash
  yarn install
  ```

- Set up your device for react native testing. Google that or something
- Run the command

  ```bash
  yarn start
  ```

- Open another terminal and run the command

  ```bash
  yarn android
  ```

### How to build the package

- Make sure you have a sugned keystore file. Google how to generate one.
- Put the keystore file in android/app folder
- Update the details at the end of the android/gradle.properties file for the given keystore
- Enter the android folder and run the build command

  ```bash
  cd android && ./gradlew bundleRelease
  ```

- Find the .aab file in the android/app/build/outputs/bundle/release folder

### How to transform the .aab file to .apk

- Download [bundletool](https://github.com/google/bundletool/releases/latest)
- Dump the .aab file in the same folder as the bundletool
- Run the command

  ```bash
  java -jar bundletool.jar build-apks --bundle=app-release.aab --output=cobble_alerts.apks --overwrite --mode=universal --ks=your_upload_key.keystore --ks-pass=pass:your_keystore_password --ks-key-alias=your_key_alias --key-pass=pass:your_key_password
  ```

## To-dos

- [x] Add README
- [ ] Correct the metro.config.js to watch all relevant files
- [ ] Add app icons
