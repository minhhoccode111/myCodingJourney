# Introdution

- Separate from the module pattern that we discussed in an earlier lesson, "modules" is a feature that arrived with ES6. ES6 modules are starting to appear in many code bases around the net and getting them up and running will give us a chance to explore some new parts of the JavaScript ecosystem, so it's going to be a worthy excursion!
- Don't be fooled! We're going to cover much more than just new module syntax in this lesson! Before we can really use these modules, we're going to have to learn about npm and webpack, which are both topics that will be very useful to you even beyond this lesson. In the end, the modules themselves are simple to implement, so we're going to take this chance to learn about a few other things.

# Lesson overview

- This section contains a general overview of topics that you will learn in this lesson.

* Explain what npm is and where it was commonly used before being adopted on the frontend
* Describe what npm init does and what package.json is
* Know how to install packages using npm
* Describe what a JavaScript module bundler like webpack is

- Explain what the concepts "entry" and "output" mean as relates to webpack.
- Briefly explain what a development dependency is
- Explain what "transpiling code" means and how it relates to front-end development
- Briefly describe what a task runner is and how it's used in front-end development
- Describe how to write an npm automation script
- Explain one of main benefits of writing code in modules
- Explain "named" exports and "default" exports

# npm

- The node package manager is a command-line tool that gives you access to a gigantic repository of plugins, libraries and tools.

# Downloading and installing packages locally

- You can install a package locally if you want to depend on the package from your own module, using something like Node.js require. This is install's default behavior

## Installing an unscoped package

- Unscoped packages are always public, which means they can be searched for, downloaded, and installed by anyone. To install a public package, on the command line, run

```
npm install <package_name>
```

- This will create the node_modules directory in your current directory (if one doesn't exist yet) and will download the package to that directory
- Note: if there is no package.json file in the directory, the latest version of the package is installed
- If there is a package.json file, npm installs the latest version that satisfies the semver rule declared in package.json

## Install a scoped public package

- Scoped public package can be downloaded and installed by anyone, as long as the scope name is referenced during installation
  `npm install @scope/package-name`

## install a private package

- Private package can only be downloaded and installed by those who have been granted read access to the package. Since private packages are always scoped, you must reference the scope name during installation:
  `npm install @scope/private-package-name`

## Testing package installation

- To confirm that npm install worked correctly, in your module directory, check that a node_modules directory exists and that it contains directory for that package(s) you installed
  `ls node_modules`

## Installed package version

- If there is a package.json file in the directory in which npm install is run, npm installs the latest version of the package that satisfies the semantic versioning rule declared in package.json
- If there is no package.json file, the latest version of the package is installed

## Installing a package with dist-tags

- Like npm publish, npm install <package_name> will use the latest by default.
- To override this behavior, use npm install <package_name>@<tag>. For example, to install the example-package at the version tagged with beta, you would run the following command:

```npm install example-package@beta

```
