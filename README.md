# Vue Walls Forms

## See this component in action

To see an example of this component in action, run `yarn serve`. This will launch the view in `dev/serve.ts`. Use this for development, too.

## Use this plugin in other projects

1. To use the Wallscope npm registry in your project, add `@wallscope:registry=https://npm.pkg.github.com/` to your `.npmrc` file.
2. Authenticate to use the registry with `yarn login --registry=https://npm.pkg.github.com/`. If you have 2FA, `username` is your github username and `password` must be a personal access token. To create one, follow [Github's article "Creating a personal access token"](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). You need to give consent to read/write Github Packages (tick these boxes when asked).
3. Install with `yarn add @wallscope/vue-walls-forms`.
4. Import with `import VueWallsForms from '@wallscope/vue-walls-forms'`.

## Deploy

To deploy a new version of this package:

1. `yarn login --registry=https://npm.pkg.github.com/` (if never done it before)
2. `yarn publish`
