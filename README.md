# Add9u for WhatsApp: React Native version for iOS/Android

> It is so stupid that I have to add a new person every time to phone book because I want to send a WhatsApp message to him/her.
> 
> That's why I make this simple react native mobile application. It allows you to send a WhatsApp message to a person without adding him/her to the phone book.

![Screen Capture](src/assets/images/screenshot.png)

## Download & Preview
![App Store](src/assets/images/download-app-store.png)

Coming Soon

## Clone & Install
It is an application built with [create-react-native-app](https://github.com/react-community/create-react-native-app) with [Expo](https://expo.io).

The instructions below will get you a copy of the project up and run on your machine.

Clone the repo, and run:
``` bash
# install dependencies
npm install

# runs the app in development mode
npm start -- --reset-cache

# open the app in the iOS Simulator
npm run ios

# open the app in connected Android device or emulator (Requires an installation of Android build tools)
npm run android
```

## Troubleshooting
### Networking

If you're unable to load the app on your phone due to a network timeout or a refused connection, a good first step is to verify that your phone and computer are on the same network and that they can reach each other. Create React Native App needs access to ports 19000 and 19001 so ensure that your network and firewall settings allow access from your device to your computer on both of these ports.

Try opening a web browser on your phone and opening the URL that the packager script prints, replacing `exp://` with `http://`. So, for example, if underneath the QR code in your terminal you see:

```
exp://192.168.0.1:19000
```

Try opening Safari or Chrome on your phone and loading

```
http://192.168.0.1:19000
```

and

```
http://192.168.0.1:19001
```

If this works, but you're still unable to load the app by scanning the QR code, please open an issue on the [Create React Native App repository](https://github.com/react-community/create-react-native-app) with details about these steps and any other error messages you may have received.

If you're not able to load the `http` URL in your phone's web browser, try using the tethering/mobile hotspot feature on your phone (beware of data usage, though), connecting your computer to that WiFi network, and restarting the packager.

### iOS Simulator won't open

If you're on a Mac, there are a few errors that users sometimes see when attempting to `npm run ios`:

* "non-zero exit code: 107"
* "You may need to install Xcode" but it is already installed
* and others

There are a few steps you may want to take to troubleshoot these kinds of errors:

1. Make sure Xcode is installed and open it to accept the license agreement if it prompts you. You can install it from the Mac App Store.
2. Open Xcode's Preferences, the Locations tab, and make sure that the `Command Line Tools` menu option is set to something. Sometimes when the CLI tools are first installed by Homebrew this option is left blank, which can prevent Apple utilities from finding the simulator. Make sure to re-run `npm run ios` after doing so.
3. If that doesn't work, open the Simulator, and under the app menu select `Reset Contents and Settings...`. After that has finished, quit the Simulator, and re-run `npm run ios`.

## Authors

- [Andrew Mok](https://andrewmmc.com) (@andrewmmc)

## Declaration
This is NOT an official product by WhatsApp Inc. Any communication between users and WhatsApp servers is handled by official WhatsApp application. It only provides a shortcut for users to open official WhatsApp application by using API links.

## Questions?
- If you have any questions, please feel free to [contact me via email](mailto:hello@andrewmmc.com).