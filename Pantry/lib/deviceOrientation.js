import { Constants } from 'expo'

const platform = Constants.platform

export default function deviceOrientation() {
  if (!platform) {
    return
  }

  if (platform.ios && platform.ios.userInterfaceIdiom === 'tablet') {
    Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.ALL)
  }

  if (platform.ios && platform.ios.userInterfaceIdiom === 'handset') {
    Expo.ScreenOrientation.allowAsync(
      Expo.ScreenOrientation.Orientation.PORTRAIT_UP
    )
  }
}
