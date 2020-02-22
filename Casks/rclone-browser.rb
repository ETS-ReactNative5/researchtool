cask 'rclone-browser' do
  version '1.2,a1156a0'
  sha256 '542cd23eea128736999a7e512a9f2ff89be081c688d1581e6c78ab3d3ca118dd'

  # github.com/mmozeiko/RcloneBrowser was verified as official when first introduced to the cask
  url "https://github.com/mmozeiko/RcloneBrowser/releases/download/#{version.before_comma}/rclone-browser-#{version.before_comma}-#{version.after_comma}-macOS.zip"
  appcast 'https://github.com/mmozeiko/RcloneBrowser/releases.atom'
  name 'Rclone Browser'
  homepage 'https://mmozeiko.github.io/RcloneBrowser/'

  depends_on formula: 'rclone'

  app "rclone-browser-#{version.before_comma}-#{version.after_comma}-macOS/Rclone Browser.app"

  zap trash: [
               '~/Library/Preferences/Rclone Browser.plist',
               '~/Library/Preferences/com.rclone-browser.rclone-browser.plist',
             ]

  caveats do
    discontinued
  end
end
