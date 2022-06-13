# Neos CMS SSH terminal (conceptual)

A SSH client terminal for the Neos CMS backend.

## WARNING: Don't use it in production yet !!!

## Usage

![SSHTerminal](https://raw.githubusercontent.com/patriceckhart/NeosRulez.Neos.SSHTerminal/master/Preview.png)

## Installation

The NeosRulez.Neos.SSHTerminal package is listed on packagist (https://packagist.org/packages/neosrulez/neos-sshterminal) - therefore you don't have to include the package in your "repositories" entry any more.

Just run:

```
composer require neosrulez/neos-sshterminal
```

## Settings
```yaml
NeosRulez:
  Neos:
    SSHTerminal:
      safeMode: true # You can't run "rm"
      fakeUser: 'neos' # The fake-username displayed in the CLI
      splashScreen: true # Show/hide the terminal splash screen (welcome message)
```

## Author

* E-Mail: mail@patriceckhart.com
* URL: http://www.patriceckhart.com
